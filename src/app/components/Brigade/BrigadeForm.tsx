import prisma from "@/lib/client";
import ClientBrigadeForm from "./ClientBrigadeForm";

export default async function BrigadeForm() {
  const medicalKits = await prisma.medicalKit.findMany({
    where: {
      isTaken: false,
    },
  });
  const ambulances = await prisma.ambulance.findMany({
    where: {
      isTaken: false,
    },
  });

  return (
    <ClientBrigadeForm medicalKits={medicalKits} ambulances={ambulances} />
  );
}
