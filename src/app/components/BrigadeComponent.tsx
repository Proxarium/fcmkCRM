"use server"
import BrigadeForm from "@/app/components/BrigadeForm";
import { getBrigadeData } from "@/actions/getBrigadeData";
import { getLastBrigadeUser } from "@/actions/getLastBrigadeUser";
import { saveMedicalKitEquipment } from "@/actions/saveMedicalKitEquipment";
import { saveAmbulanceEquipment } from "@/actions/saveAmbulanceEquipment";
import AccordionWrapperAmbulance from "./AccordionWrapperAmbulance";
import AccordionWrapperBrigade from "./AccordionWrapperBrigade";
import ReturnBrigade from "./ReturnBrigade";

export default async function BrigadeComponent() {
  const brigadeData = await getBrigadeData();
  const medicalKitId = brigadeData.medicalKit?.id || "";
  const ambulanceId = brigadeData.ambulance?.id || "";

  const lastBrigadeUser =
    medicalKitId && ambulanceId
      ? await getLastBrigadeUser(medicalKitId, ambulanceId)
      : {
          medicalKitUser: "Нет данных",
          ambulanceUser: "Нет данных",
          commentReturnKit: "Нет данных",
          commentReturnAmbulance: "Нет данных",
        };

  if (brigadeData.medicalKit || brigadeData.ambulance) {
    return (
      <div className="p-5 text-white space-y-5">
        <h1 className="text-2xl font-bold mb-5">Ваша бригада</h1>

        <div className="space-y-4">
          <AccordionWrapperBrigade
            brigade={brigadeData}
            saveMedicalKitEquipment={saveMedicalKitEquipment}
            
            
          />
          <div className="bg-neutral-800/20 p-4 rounded-lg">
            <p className="text-sm">{`Укладку сдал: ${lastBrigadeUser.medicalKitUser}`}</p>
            <p className="text-sm">{`Комментарий при сдаче укладки: ${lastBrigadeUser.commentReturnKit}`}</p>
          </div>

          <AccordionWrapperAmbulance
            brigade={brigadeData}
            saveAmbulanceEquipment={saveAmbulanceEquipment}
            
          />
          <div className="bg-neutral-800/20 p-4 rounded-lg">
            <p className="text-sm">{`Машину сдал: ${lastBrigadeUser.ambulanceUser}`}</p>
            <p className="text-sm">{`Комментарий при сдаче машины: ${lastBrigadeUser.commentReturnAmbulance}`}</p>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <ReturnBrigade />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <BrigadeForm />
    </div>
  );
}
