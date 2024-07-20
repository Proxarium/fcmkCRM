// actions/getBrigadeData.ts
"use server"
import { getBrigadeForUser } from "@/actions/getBrigadeForUser";
import { fetchMedicalKitEquipment } from "@/actions/fetchMedicalKitEquipment";
import { fetchAmbulanceEquipment } from "@/actions/fetchAmbulanceEquipment";

export async function getBrigadeData() {
  const brigade = await getBrigadeForUser();

  const medicalKitEquipment = brigade?.medicalKit?.id
    ? await fetchMedicalKitEquipment(brigade.medicalKit.id)
    : [];

  const ambulanceEquipment = brigade?.ambulance?.id
    ? await fetchAmbulanceEquipment(brigade.ambulance.id)
    : [];

  return {
    medicalKit: brigade?.medicalKit
      ? {
          id: brigade.medicalKit.id,
          name: brigade.medicalKit.name,
          equipment: medicalKitEquipment,
          checkedKit: brigade.checkedKit
          
        }
      : null,
    ambulance: brigade?.ambulance
      ? {
          id: brigade.ambulance.id,
          number: brigade.ambulance.number,
          equipment: ambulanceEquipment,
          checkedAmbulance: brigade.checkedAmbulance
        }
      : null,
  };
}
