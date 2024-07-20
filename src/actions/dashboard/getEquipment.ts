"use server"
import prisma from "@/lib/client";

export async function getEquipmentByBrigadeId(brigadeId: string) {
  try {
    const brigade = await prisma.stateBrigade.findUnique({
      where: { id: brigadeId },
      include: {
        medicalKit: {
          include: {
            equipment: {
              include: {
                categories: true,
              },
            },
          },
        },
        ambulance: {
          include: {
            equipment: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
    });

    if (!brigade || !brigade.workStatus) {
      throw new Error("Brigade not found or not active");
    }

    return {
      medicalKitEquipment: brigade.medicalKit.equipment,
      ambulanceEquipment: brigade.ambulance.equipment,
      medicalKitName: brigade.medicalKit.name,
      ambulanceNumber: brigade.ambulance.number,
      takeDate: brigade.takeDate ? brigade.takeDate.toISOString() : null,
      checkedKit: brigade.checkedKit,
      checkedAmbulance: brigade.checkedAmbulance,
      checkedKitDate: brigade.checkedKitDate ? brigade.checkedKitDate.toISOString() : null,
      checkedAmbulanceDate: brigade.checkedAmbulanceDate ? brigade.checkedAmbulanceDate.toISOString() : null,
    };
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw error;
  }
}