import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";




interface Equipment {
    id: string;
    name: string;
    fquantity?: number | null;
    quantity: number;
    desc?: string | null;
    available: boolean;
    medicalKitId?: string;
    ambulanceId?: string;
  }
  
  interface Brigade {
    medicalKit: {
      equipmentMedicalKit: Equipment[];
    };
    ambulance: {
      equipmentAmbulance: Equipment[];
    };
  }

export const getBrigadeData = async (): Promise<Brigade> => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  const stateBrigade = await prisma.stateBrigade.findFirst({
    where: { userTakerId: userId,
      workStatus: true,
     },
    include: {
      medicalKit: {
        include: {
          equipment: true,
        },
      },
      ambulance: {
        include: {
          equipment: true,
        },
      },
    },
  });

  return {
    medicalKit: {
      equipmentMedicalKit: stateBrigade?.medicalKit?.equipment.map(e => ({
        id: e.id,
        name: e.name,
        fquantity: e.fquantity,
        quantity: e.quantity,
        desc: e.desc,
        available: e.available,
        medicalKitId: e.medicalKitId,
      })) || [],
    },
    ambulance: {
      equipmentAmbulance: stateBrigade?.ambulance?.equipment.map(e => ({
        id: e.id,
        name: e.name,
        fquantity: e.fquantity,
        quantity: e.quantity,
        desc: e.desc,
        available: e.available,
        ambulanceId: e.ambulanceId,
      })) || [],
    },
  };
};


