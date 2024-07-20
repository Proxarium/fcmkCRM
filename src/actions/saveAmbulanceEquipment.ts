// actions/saveAmbulanceEquipment.ts
"use server";
import prisma from "@/lib/client";
import { getBrigadeForUser } from "./getBrigadeForUser";

export async function saveAmbulanceEquipment(
  equipment: { id: string; quantity: number; available: boolean }[]
) {
  const brigade = await getBrigadeForUser(); // Ensure this is awaited
  if (!brigade || !brigade.ambulance) {
    throw new Error("Brigade or Medical Kit not found for the user");
  }

  // Fetch the StateBrigade ID
  const stateBrigade = await prisma.stateBrigade.findFirst({
    where: { ambulanceId: brigade.ambulance.id, workStatus: true },
  });

  if (!stateBrigade) {
    throw new Error("StateBrigade not found for the given MedicalKit ID");
  }
  try {
    await prisma.$transaction(
      equipment.map((item) =>
        prisma.equipmentAmbulance.update({
          where: { id: item.id },
          data: { quantity: item.quantity, available: item.available },
        })
      )
    );
    await prisma.stateBrigade.update({
      where: { id: stateBrigade.id,
        
       }, // Use the fetched stateBrigade ID
      data: { checkedAmbulance: true, checkedAmbulanceDate: new Date() },
    });
  } catch (error) {
    console.error("Error saving ambulance equipment data:", error);
    throw new Error("Failed to save equipment data");
  }
}
 