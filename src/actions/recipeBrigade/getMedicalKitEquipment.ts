// actions/getMedicalKitEquipment.ts

"use server";

import prisma from "@/lib/client";



export async function getMedicalKitEquipment(medicalKitId: string) {
  if (!medicalKitId) {
    throw new Error("medicalKitId is required");
  }

  const equipment = await prisma.equipmentMedicalKit.findMany({
    where: { medicalKitId },
    include: { categories: true },
  });

  return equipment;
}
