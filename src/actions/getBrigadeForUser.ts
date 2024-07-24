// actions/getBrigadeForUser.ts
"use server";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export interface Brigade {
  
    checkedKit: boolean; // Add checkedKit
    checkedAmbulance: boolean
    

  
  medicalKit: {
    id: string;
    name: string;
  } | null;
    
  ambulance: {
    id: string;
    number: string;
  } | null;
}

export async function getBrigadeForUser(): Promise<Brigade | null> {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  const brigade = await prisma.stateBrigade.findFirst({
    where: {
      userTakerId: userId,
      workStatus: true,
      
      
    },
    
    include: {
      medicalKit: {
        select: {
          id: true,
          name: true,
          
        },
      },
      
      
      ambulance: {
        select: {
          id: true,
          number: true,
          
          
        },
      },
      
    },
  });
  if (brigade) {
    console.log("Brigade data fetched:", brigade);
  } else {
    console.log(`Пользователь, без бригады ${userId}`);
  }
  revalidatePath("/");

  return brigade;
}
