// actions/ambulance/deductAmbulanceEquipment.ts
"use server";

import prisma from "@/lib/client";

export async function deductAmbulanceEquipment(ambulanceId: string, equipmentId: string, quantity: number) {
  if (!ambulanceId || !equipmentId || quantity <= 0) {
    throw new Error("Invalid input");
  }

  const equipment = await prisma.equipmentAmbulance.findUnique({
    where: { id: equipmentId },
  });

  if (!equipment) {
    throw new Error("Equipment not found");
  }

  if (equipment.quantity < quantity) {
    throw new Error("Not enough equipment quantity");
  }

  const updatedEquipment = await prisma.equipmentAmbulance.update({
    where: { id: equipmentId },
    data: { quantity: equipment.quantity - quantity },
  });

  return updatedEquipment;
}