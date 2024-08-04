"use server";

import prisma from "@/lib/client";

export async function getDeductedAmbulances() {
  try {
    const deductions = await prisma.deductedAmbulance.findMany({
      where: {
        status: false,
      },
      include: {
        user: true,
        ambulance: true,
        items: true,
      },
    });

    return deductions.map(deduction => ({
      ...deduction,
      deductionDate: deduction.deductionDate.toISOString(), // Convert Date to string
    }));
  } catch (error) {
    console.error("Error fetching deducted ambulances:", error);
    throw new Error("Failed to fetch deducted ambulances");
  }
}
