"use server";

import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

interface DeductItem {
  name: string;
  quantity: number;
}

interface DeductionData {
  callCardNumber: string;
  medicalKitId: string;
  deductedItems: DeductItem[];
  userId: string;
}

export async function saveDeduction(data: DeductionData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('User is not authenticated!');
  }

  try {
    const deduction = await prisma.deductedMedication.create({
      data: {
        callCardNumber: data.callCardNumber,
        deductionDate: new Date(),
        status: false,
        userId: data.userId,
        medicalKitId: data.medicalKitId,
        items: {
          create: data.deductedItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
          })),
        },
      },
    });

    for (const item of data.deductedItems) {
      await prisma.equipmentMedicalKit.updateMany({
        where: {
          medicalKitId: data.medicalKitId,
          name: item.name,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }
    
    revalidatePath("/mainpage/brigade");
    return deduction;
  } catch (error) {
    console.error('Error saving deduction:', error);
    throw new Error('Failed to save deduction');
  }
}


