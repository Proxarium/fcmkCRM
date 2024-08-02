"use client";

import { useState } from "react";
import AccordionCardBrigade from "./AccordionCardBrigade";

type EquipmentItem = {
  id: string;
  name: string;
  quantity: number;
  fquantity: number | null;
  desc: string | null;
  available: boolean;
  category: string;
};

type AccordionWrapperProps = {
  brigade: {
    
    
    
    
    medicalKit: {
      name: string;
      equipment: EquipmentItem[];
      checkedKit: boolean;
    } | null;
    
    ambulance: {
      number: string;
      equipment: EquipmentItem[];
    } | null;
    
  };
  saveMedicalKitEquipment: (equipment: EquipmentItem[]) => Promise<void>;
};

const AccordionWrapperBrigade: React.FC<AccordionWrapperProps> = ({
  brigade,
  saveMedicalKitEquipment,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  


  const handleToggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div>
      <AccordionCardBrigade
        title={brigade.medicalKit?.name ?? "Медицинский комплект"}
        imageSrc="/medicalKit.png"
        equipment={brigade.medicalKit?.equipment ?? []}
        saveAction={saveMedicalKitEquipment}
        isOpen={openAccordion === "medicalKit"}
        onToggle={() => handleToggleAccordion("medicalKit")}
        checkedKit={brigade.medicalKit?.checkedKit ?? false}
        
        
      />
    </div>
  );
};

export default AccordionWrapperBrigade;



