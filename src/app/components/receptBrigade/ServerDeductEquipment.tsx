import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import DeductEquipment from './DeductEquipment';

export default async function ServerDeductEquipment({ medicalKitId }: { medicalKitId: string }) {
  const { userId } = auth();

  if (!userId) {
    return <p>Пожалуйста, войдите в систему.</p>;
  }

  const equipment = await prisma.equipmentMedicalKit.findMany({
    where: { medicalKitId },
  });

  return (
    <DeductEquipment
      medicalKitId={medicalKitId}
      equipment={equipment}
      userId={userId}
    />
  );
}



