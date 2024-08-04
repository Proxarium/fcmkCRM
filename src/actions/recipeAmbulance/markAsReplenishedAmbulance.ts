// actions/ambulance/markAsReplenishedAmbulance.ts

"use server";

import prisma from "@/lib/client";

export async function markAsReplenishedAmbulance(deductionId: string) {
  try {
    // Start a transaction to ensure atomicity
    await prisma.$transaction(async (prisma) => {
      // Update the status of the DeductedAmbulanceMedication to true
      await prisma.deductedAmbulance.update({
        where: { id: deductionId },
        data: { status: true },
      });

      // Get the deducted items
      const deductedItems = await prisma.deductedAmbulanceItem.findMany({
        where: { deductedAmbulanceId: deductionId },
      });

      // Restore the quantities to the EquipmentAmbulance
      for (const item of deductedItems) {
        await prisma.equipmentAmbulance.updateMany({
          where: { name: item.name },
          data: { quantity: { increment: item.quantity } },
        });
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error replenishing medications:", error);
    return { success: false,  error: onmessage };
  }
}
