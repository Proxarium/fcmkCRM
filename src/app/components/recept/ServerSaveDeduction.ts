import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

interface DeductItem {
  name: string;
  quantity: number;
}

export default async function SaveDeduction(
  userId: string,
  callCardNumber: string,
  medicalKitId: string,
  deductedItems: DeductItem[]
) {
  
  try {
    // Получение информации о пользователе
    const { userId } = auth();

  if (!userId) return null;

    // Создание записи о списании
    await prisma.deductedMedication.create({
      data: {
        callCardNumber,
        deductionDate: new Date(),
        status: false,
        userId: userId,
        medicalKitId,
        items: {
          create: deductedItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
          })),
        },
      },
    });

    // Обновление количества препаратов в медицинском наборе
    for (const item of deductedItems) {
      await prisma.equipmentMedicalKit.updateMany({
        where: {
          medicalKitId,
          name: item.name,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    return true;
  } catch (error) {
    console.error("Error saving deduction:", error);
    return false;
  }
}
