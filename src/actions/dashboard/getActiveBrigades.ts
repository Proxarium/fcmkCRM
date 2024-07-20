// actions/dashboard/getActiveBrigades.ts

"use server";

import prisma from "@/lib/client";

export async function getActiveBrigades() {
  try {
    const brigades = await prisma.stateBrigade.findMany({
      where: { workStatus: true },
      include: {
        userTaker: true,
        ambulance: true,
        medicalKit: {
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
    
    return brigades;
  } catch (error) {
    console.error('Error fetching active brigades:', error);
    throw error;
  }
}


