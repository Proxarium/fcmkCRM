"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function returnBrigade(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  const brigade = await prisma.stateBrigade.findFirst({
    where: {
      userTakerId: userId,
      workStatus: true,
    },
  });

  if (!brigade) throw new Error("No active brigade found for the user!");

  const commentMedicalKit = formData.get("commentMedicalKit") as string;
  const commentAmbulance = formData.get("commentAmbulance") as string;

  await prisma.$transaction([
    prisma.stateBrigade.update({
      where: { id: brigade.id },
      data: {
        workStatus: false,
        returnDate: new Date(),
        commentReturnKit: commentMedicalKit || "N/A",
        commentReturnAmbulance: commentAmbulance || "N/A",
      },
    }),
    prisma.medicalKit.update({
      where: { id: brigade.medicalKitId },
      data: { isTaken: false, userId: null },
    }),
    prisma.ambulance.update({
      where: { id: brigade.ambulanceId },
      data: { isTaken: false, userId: null },
    }),
  ]);
  revalidatePath("/mainpage/brigade");
}
