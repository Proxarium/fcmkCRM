// src/actions/markAsReplenished.ts

"use server";

import prisma from "@/lib/client";

export async function markAsReplenished(deductionId: string) {
  try {
    // Start a transaction to ensure atomicity
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

    return { success: true };
  } catch (error) {
    console.error("Error replenishing medications:", error);
    return { success: false, error: onmessage };
  }
}
