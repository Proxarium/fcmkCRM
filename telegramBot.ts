import { Telegraf, Context, Markup } from 'telegraf';
import prisma from './src/lib/client';



const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);



bot.on('callback_query', async (ctx: Context) => {
  const callbackData = (ctx.callbackQuery as any).data;
  if (callbackData && callbackData.startsWith('replenish_')) {
    const deductionId = callbackData.split('_')[1];

    try {
      await prisma.$transaction(async (prisma) => {
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
      });

      // Notify the user in the Telegram chat and update the button
      await ctx.answerCbQuery('Препараты успешно пополнены');
      await ctx.editMessageText('Препараты успешно пополнены', Markup.inlineKeyboard([
        Markup.button.callback('✅', 'done')
      ]));
    } catch (error) {
      console.error('Error replenishing medications:', error);
      await ctx.answerCbQuery('Ошибка при пополнении препаратов');
    }
  }
});

bot.launch();

