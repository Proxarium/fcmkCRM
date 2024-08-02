// src/actions/getDeductedMedications.ts

"use server";

import prisma from "@/lib/client";

export async function getDeductedMedications() {
  try {
    const deductions = await prisma.deductedMedication.findMany({
      where: {
        status: false,
      },
      include: {
        user: true,
        medicalKit: true,
        items: true,
      },
    });

    return deductions.map(deduction => ({
      ...deduction,
      deductionDate: deduction.deductionDate.toISOString(), // Convert Date to string
    }));
  } catch (error) {
    console.error("Error fetching deducted medications:", error);
    throw new Error("Failed to fetch deducted medications");
  }
}

