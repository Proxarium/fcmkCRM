// actions/acceptBrigade.ts
"use server";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export interface Brigade {
  id: string;
  medicalKit: {
    name: string;
  } | null;
  ambulance: {
    number: string;
  } | null;
}

export async function acceptBrigade(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  const medicalKitId = formData.get("medicalKit") as string;
  const ambulanceId = formData.get("car") as string;
  const commentTake = formData.get("commentTake") as string;

  await prisma.$transaction([
    prisma.stateBrigade.create({
      data: {
        userTakerId: userId,
        commentTake: commentTake,
        medicalKitId: medicalKitId,
        ambulanceId: ambulanceId,
        takeDate: new Date(Date.now()),
        workStatus: true,
      },
    }),
    prisma.medicalKit.update({
      where: { id: medicalKitId },
      data: { isTaken: true, userId: userId },
    }),
    prisma.ambulance.update({
      where: { id: ambulanceId },
      data: { isTaken: true, userId: userId },
    }),
  ]);
  revalidatePath("/");
}


