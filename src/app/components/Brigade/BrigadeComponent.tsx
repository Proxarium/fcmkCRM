"use server"
import BrigadeForm from "@/app/components/Brigade/BrigadeForm";
import { getBrigadeData } from "@/actions/getBrigadeData";
import { getLastBrigadeUser } from "@/actions/getLastBrigadeUser";
import { saveMedicalKitEquipment } from "@/actions/saveMedicalKitEquipment";
import { saveAmbulanceEquipment } from "@/actions/saveAmbulanceEquipment";
import AccordionWrapperAmbulance from "./AccordionWrapperAmbulance";
import AccordionWrapperBrigade from "./AccordionWrapperBrigade";
import ReturnBrigade from "./ReturnBrigade";
import AccordionCardInfo from "./AccordionCardInfo";
import ServerDeductEquipment from "../recept/ServerDeductEquipment";

export default async function BrigadeComponent() {
  const brigadeData = await getBrigadeData();
  const medicalKitId = brigadeData.medicalKit?.id || "";
  const ambulanceId = brigadeData.ambulance?.id || "";

  const lastBrigadeUser =
    medicalKitId && ambulanceId
      ? await getLastBrigadeUser(medicalKitId, ambulanceId)
      : {
          medicalKitUser: "Нет данных",
          returnDate: "Нет данных",
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
          <AccordionWrapperAmbulance
            brigade={brigadeData}
            saveAmbulanceEquipment={saveAmbulanceEquipment}
          />
         
          <AccordionCardInfo
          medicalKitUser={lastBrigadeUser.medicalKitUser}
          returnDate={lastBrigadeUser.returnDate.toLocaleString()}
          returnDateAmbulance={lastBrigadeUser.returnDate.toLocaleString()}
          commentReturnKit={lastBrigadeUser.commentReturnKit}
          ambulanceUser={lastBrigadeUser.ambulanceUser}
          commentReturnAmbulance={lastBrigadeUser.commentReturnAmbulance}
          />
        </div>
     
        <div className="p-6 bg-neutral-800/20 rounded-lg bottom-0 space-y-4"> 
        <ServerDeductEquipment 
         medicalKitId={medicalKitId}
        /> 
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
