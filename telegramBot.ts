import { Telegraf, Context, Markup } from 'telegraf';
import prisma from './src/lib/client';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

bot.on('callback_query', async (ctx: Context) => {
  const callbackData = (ctx.callbackQuery as any).data;
  
  if (callbackData && callbackData.startsWith('replenish_')) {
    const [_, type, deductionId] = callbackData.split('_');

    try {
      await prisma.$transaction(async (prisma) => {
        if (type === 'ambulance') {
          // Update the status of the DeductedAmbulance to true
          const deduction = await prisma.deductedAmbulance.update({
            where: { id: deductionId },
            data: { status: true },
            include: { ambulance: true }
          });

          // Get the deducted items
          const deductedItems = await prisma.deductedAmbulanceItem.findMany({
            where: { deductedAmbulanceId: deductionId },
          });

          // Restore the quantities to the EquipmentAmbulance
          for (const item of deductedItems) {
            await prisma.equipmentAmbulance.updateMany({
              where: { name: item.name},
              data: { quantity: { increment: item.quantity } },
            });
          }

          // Notify the user in the Telegram chat and update the button
          const ambulanceNumber = deduction.ambulance.number;
          await ctx.answerCbQuery(`АСМП №${ambulanceNumber} успешно пополнен`);
          await ctx.editMessageText(`АСМП №${ambulanceNumber} успешно пополнен`, Markup.inlineKeyboard([
            Markup.button.callback('✅', 'done')
          ]));
        } else if (type === 'medicalKit') {
          // Update the status of the DeductedMedication to true
          await prisma.deductedMedication.update({
            where: { id: deductionId },
            data: { status: true },
          });

          // Get the deducted items
          const deductedItems = await prisma.deductedItem.findMany({
            where: { deductedMedicationId: deductionId },
          });

          // Restore the quantities to the MedicalKit
          for (const item of deductedItems) {
            await prisma.equipmentMedicalKit.updateMany({
              where: { name: item.name },
              data: { quantity: { increment: item.quantity } },
            });
          }

          // Notify the user in the Telegram chat and update the button
          await ctx.answerCbQuery('Укладка успешно пополнена');
          await ctx.editMessageText('Укладка успешно пополнена', Markup.inlineKeyboard([
            Markup.button.callback('✅', 'done')
          ]));
        }
      });
    } catch (error) {
      console.error('Error replenishing medications:', error);
      await ctx.answerCbQuery('Ошибка при пополнении рецепта');
    }
  }
});

bot.launch();






