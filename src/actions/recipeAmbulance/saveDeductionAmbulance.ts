// actions/ambulance/saveAmbulanceDeduction.ts
"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

interface DeductItem {
  name: string;
  quantity: number;
}

interface SaveDeductionData {
  callCardNumber: string;
  ambulanceId: string;
  deductedItems: DeductItem[];
  userId: string;
}

export async function saveAmbulanceDeduction(data: SaveDeductionData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  const ambulance = await prisma.ambulance.findFirst({
    where: {
      id: data.ambulanceId,
    },
  });

  if (!ambulance) {
    throw new Error("Ambulance not found!");
  }

  try {
    const deduction = await prisma.deductedAmbulance.create({
      data: {
        callCardNumber: data.callCardNumber,
        deductionDate: new Date(),
        status: false,
        userId: data.userId,
        ambulanceId: data.ambulanceId,
        items: {
          create: data.deductedItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
          })),
        },
      },
    });

    for (const item of data.deductedItems) {
      await prisma.equipmentAmbulance.updateMany({
        where: {
          ambulanceId: data.ambulanceId,
          name: item.name,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Формирование сообщения для отправки в Telegram
    const message = `
      *Рецепт:* ${ambulance.number}
      *Дата списания:* ${new Date().toLocaleString()}
      *Номер карты вызова:* ${data.callCardNumber}
      *Списанные препараты:*
${data.deductedItems.map(item => `*${item.name}:* ${item.quantity} шт`).join('\n')}
      *Сотрудник:* ${user.username}
    `;

    // Отправка сообщения в Telegram с кнопкой "Пополнить"
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(TELEGRAM_API_URL, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{
          text: `Пополнить АСМП №${ambulance.number} `,
          callback_data: `replenish_ambulance_${deduction.id}`
        }]]
      }
    });

    revalidatePath("/mainpage/brigade");
    return deduction;
  } catch (error) {
    console.error("Error saving deduction:", error);
    throw new Error("Failed to save deduction");
  }
}

