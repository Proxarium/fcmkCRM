"use server";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export interface StateBrigade {
  id: string;
  workStatus: boolean;
  takeDate: Date | null;
  returnDate: Date | null;
  commentTake: string | null;
  commentReturnKit: string | null;
  commentReturnAmbulance: string | null;
  checkedKit: boolean;
  checkedAmbulance: boolean;
  checkedKitDate: Date | null;
  checkedAmbulanceDate: Date | null;
  medicalKit: {
    name: string;
  } | null;
  ambulance: {
    number: string;
  } | null;
  userTaker: {
    username: string;
  } | null;
}

export async function getStateBrigades(
  skip: number = 0,
  take: number = 10,
  searchQuery: string = ""
): Promise<StateBrigade[]> {
  const brigades = await prisma.stateBrigade.findMany({
    skip,
    take,
    orderBy: {
      takeDate: "desc", // Сортировка по убыванию даты приема
    },
    where: {
      OR: [
        {
          medicalKit: {
            name: {
              contains: searchQuery,
            },
          },
        },
        {
          ambulance: {
            number: {
              contains: searchQuery,
            },
          },
        },
        {
          userTaker: {
            username: {
              contains: searchQuery,
            },
          },
        },
      ],
    },
    include: {
      medicalKit: {
        select: {
          name: true,
        },
      },
      ambulance: {
        select: {
          number: true,
        },
      },
      userTaker: {
        select: {
          username: true,
        },
      },
    },
  });

  return brigades;
}