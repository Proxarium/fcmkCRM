// actions/ambulance/getAmbulanceEquipment.ts
"use server";

import prisma from "@/lib/client";

export async function getAmbulanceEquipment(ambulanceId: string) {
  if (!ambulanceId) {
    throw new Error("ambulanceId is required");
  }

  const equipment = await prisma.equipmentAmbulance.findMany({
    where: { ambulanceId },
    include: { categories: true },
  });

  return equipment;
}


