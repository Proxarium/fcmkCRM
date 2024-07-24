// src/actions/recipe/deductEquipment.ts
"use server";

import prisma from "@/lib/client";



export async function deductEquipment(medicalKitId: string, equipmentId: string, quantity: number) {
  if (!medicalKitId || !equipmentId || quantity <= 0) {
    throw new Error("Invalid input");
  }

  // Получаем текущее количество оборудования
  const equipment = await prisma.equipmentMedicalKit.findUnique({
    where: { id: equipmentId },
  });

  if (!equipment) {
    throw new Error("Equipment not found");
  }

  // Проверяем, достаточно ли оборудования для списания
  if (equipment.quantity < quantity) {
    throw new Error("Not enough equipment to deduct");
  }

  // Обновляем количество оборудования
  const updatedEquipment = await prisma.equipmentMedicalKit.update({
    where: { id: equipmentId },
    data: { quantity: equipment.quantity - quantity },
  });

  return updatedEquipment;
}


