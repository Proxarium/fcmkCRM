// actions/fetchMedicalKitEquipment.ts
import prisma from "@/lib/client";

export async function fetchMedicalKitEquipment(medicalKitId: string) {
  return prisma.equipmentMedicalKit
    .findMany({
      where: { medicalKitId },
      include: { categories: true },
    })
    .then((items) =>
      items.map((item) => ({
        ...item,
        category: item.categories[0]?.name, // Обработка пустых категорий
      }))
    );
}
