// actions/fetchAmbulanceEquipment.ts
import prisma from "@/lib/client";

export async function fetchAmbulanceEquipment(ambulanceId: string) {
  return prisma.equipmentAmbulance
    .findMany({
      where: { ambulanceId },
      include: { categories: true },
    })
    .then((items) =>
      items.map((item) => ({
        ...item,
        category: item.categories[0]?.name, // Обработка пустых категорий
      }))
    );
}
