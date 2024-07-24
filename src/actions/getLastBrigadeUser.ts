import prisma from "@/lib/client";

export async function getLastBrigadeUser(
  medicalKitId: string,
  ambulanceId: string
) {
  const latestMedicalKitBrigade = await prisma.stateBrigade.findFirst({
    where: {
      medicalKitId: medicalKitId,
      workStatus: false,
    },
    orderBy: { returnDate: "desc" },
    select: {
      returnDate: true,
      commentReturnKit: true,
      userTaker: {
        select: {
          username: true,
        },
      },
    },
  });

  const latestAmbulanceBrigade = await prisma.stateBrigade.findFirst({
    where: {
      ambulanceId: ambulanceId,
      workStatus: false,
    },
    orderBy: { returnDate: "desc" },
    select: {
      commentReturnAmbulance: true,
      userTaker: {
        select: {
          username: true,
        },
      },
    },
  });

  return {
    medicalKitUser:
      latestMedicalKitBrigade?.userTaker?.username || "Нет данных",
    returnDate: latestMedicalKitBrigade?.returnDate || "Нет данных",
    ambulanceUser: latestAmbulanceBrigade?.userTaker?.username || "Нет данных",
    commentReturnKit: latestMedicalKitBrigade?.commentReturnKit || "Нет данных",
    commentReturnAmbulance:
      latestAmbulanceBrigade?.commentReturnAmbulance || "Нет данных",
  };
}
