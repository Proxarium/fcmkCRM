import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import DeductAmbulanceEquipment from './DeductAmbulanceEquipment';

export default async function ServerDeductAmbulanceEquipment({ ambulanceId }: { ambulanceId: string }) {
  const { userId } = auth();

  if (!userId) {
    return <p>Пожалуйста, войдите в систему.</p>;
  }

  const equipment = await prisma.equipmentAmbulance.findMany({
    where: { ambulanceId },
  });

  return (
    <DeductAmbulanceEquipment
      ambulanceId={ambulanceId}
      equipment={equipment}
      userId={userId}
    />
  );
}



