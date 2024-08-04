"use client"


import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getActiveBrigades } from "@/actions/dashboard/getActiveBrigades";
import EquipmentModal from "./EquipmentModal";

type Brigade = {
  id: string;
  userTaker: { username: string };
  medicalKit: { id: string, name: string };
  ambulance: { id: string, number: string };
  workStatus: boolean;
};

const DashboardBrigadeCard: React.FC = () => {
  const [activeBrigades, setActiveBrigades] = useState<Brigade[]>([]);
  const [selectedBrigadeId, setSelectedBrigadeId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getActiveBrigades();
        setActiveBrigades(data);
      } catch (error) {
        console.error("Error fetching brigades", error);
      }
    }
    fetchData();
  }, []);

  const handleCardClick = (brigadeId: string) => {
    setSelectedBrigadeId(brigadeId);
  };

  const closeModal = () => {
    setSelectedBrigadeId(null);
  };

  return (
    <div className="px-2 pt-5 pb-2.5 bg-neutral-900 rounded-lg ring-1">
      <h1 className="flex text-xl font-bold mb-4 text-white justify-center">Активные бригады</h1>
      <div className="flex flex-col space-y-2">
        {activeBrigades.map(brigade => (
          <Card
            key={brigade.id}
            imageSrc="/kung.png"
            title={brigade.userTaker.username}
            subtitle={brigade.medicalKit.name} 
            description={`${brigade.ambulance.number}`}
            onClick={() => handleCardClick(brigade.id)}
          />
        ))}
      </div>
      {selectedBrigadeId && (
        <EquipmentModal
          isOpen={!!selectedBrigadeId}
          onClose={closeModal}
          brigadeId={selectedBrigadeId}
        />
      )}
    </div>
  );
};

export default DashboardBrigadeCard;



