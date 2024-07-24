// pages/api/equipment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { userId } = auth();
      if (!userId) {
        return res.status(401).json({ error: 'User is not authenticated!' });
      }

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

      if (!brigade) {
        return res.status(404).json({ error: 'Brigade not found' });
      }

      const medicalKitEquipment = brigade.medicalKit?.id
        ? await prisma.equipmentMedicalKit.findMany({
            where: { medicalKitId: brigade.medicalKit.id },
          })
        : [];

      const ambulanceEquipment = brigade.ambulance?.id
        ? await prisma.equipmentAmbulance.findMany({
            where: { ambulanceId: brigade.ambulance.id },
          })
        : [];

      res.status(200).json({ medicalKitEquipment, ambulanceEquipment });
    } catch (error) {
      console.error('Error fetching equipment:', error);
      res.status(500).json({ error: 'Error fetching equipment' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

