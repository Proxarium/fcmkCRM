"use client";

import { useState } from "react";

import AccordionCardAmbulance from "@/app/components/AccordionCardAmbulance";

type EquipmentItem = {
  id: string;
  name: string;
  quantity: number;
  available: boolean;
  category: string | null;
};

type AccordionWrapperProps = {
  brigade: {
    medicalKit: {
      name: string;
      equipment: EquipmentItem[];
    } | null;
    ambulance: {
      number: string;
      equipment: EquipmentItem[];
      checkedAmbulance: boolean;
    } | null;
  };
  
  saveAmbulanceEquipment: (equipment: EquipmentItem[]) => Promise<void>;
};

const AccordionWrapper: React.FC<AccordionWrapperProps> = ({
  brigade,

  saveAmbulanceEquipment,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleToggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div>
      <AccordionCardAmbulance
        title={`АСМП №${brigade.ambulance?.number}`}
        imageSrc="/kung1.png"
        equipment={brigade.ambulance?.equipment ?? []}
        saveAction={saveAmbulanceEquipment}
        isOpen={openAccordion === "ambulance"}
        onToggle={() => handleToggleAccordion("ambulance")}
        checkedAmbulance={brigade.ambulance?.checkedAmbulance ?? false}
      />
    </div>
  );
};

export default AccordionWrapper;
