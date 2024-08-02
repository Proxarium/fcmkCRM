"use client";

import { useState } from "react";

type BrigadeInfoCardProps = {
  medicalKitUser: string;
  returnDate: string | Date;
  returnDateAmbulance: string | Date;
  commentReturnKit: string;
  ambulanceUser: string;
  commentReturnAmbulance: string;
};

const BrigadeInfoCard: React.FC<BrigadeInfoCardProps> = ({
  medicalKitUser,
  returnDate,
  returnDateAmbulance,
  commentReturnKit,
  ambulanceUser,
  commentReturnAmbulance,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-neutral-800/20 rounded-lg mb-4">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={toggleOpen}
      >
        <h2 className="text-md font-semibold">Кто сдал бригаду?</h2>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="p-4 overflow-y-auto h-[355px]">
          <div className="bg-neutral-800/20 p-4 rounded-lg">
            <p className="text-sm">{`${returnDate}`}</p>
            <p className="text-sm">{`Укладку сдал: ${medicalKitUser}`}</p>
            <p className="text-sm">{`Комментарий при сдаче укладки: ${commentReturnKit}`}</p>
          </div>
          <div className="bg-neutral-800/20 p-4 rounded-lg mt-4">
            <p className="text-sm">{`${returnDateAmbulance}`}</p>
            <p className="text-sm">{`Машину сдал: ${ambulanceUser}`}</p>
            <p className="text-sm">{`Комментарий при сдаче машины: ${commentReturnAmbulance}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrigadeInfoCard;

