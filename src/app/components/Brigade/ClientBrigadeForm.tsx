"use client";

import React, { useState } from "react";
import { acceptBrigade } from "@/actions/acceptBrigade";
import LoadingButton from "../LoadingButton";

interface ClientBrigadeFormProps {
  medicalKits: { id: string; name: string }[];
  ambulances: { id: string; number: string }[];
}

const ClientBrigadeForm: React.FC<ClientBrigadeFormProps> = ({ medicalKits, ambulances }) => {
  const [selectedMedicalKit, setSelectedMedicalKit] = useState("");
  const [selectedAmbulance, setSelectedAmbulance] = useState("");
  const [commentTake, setCommentTake] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptBrigade = async () => {
    setIsLoading(true);
    try {
    const formData = new FormData();
    formData.append("medicalKit", selectedMedicalKit);
    formData.append("car", selectedAmbulance);
    formData.append("commentTake", commentTake);

    await acceptBrigade(formData);
} catch (error) {
    console.error("Error accepting brigade:", error);
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="bg-neutral-800/20 rounded-lg p-6">
      <form className="max-w-sm mx-auto">
        <div className="mb-4">
          <label
            htmlFor="medicalKit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Выберите бригаду
          </label>
          <select
          
            name="medicalKit"
            id="medicalKit"
            value={selectedMedicalKit}
            onChange={(e) => setSelectedMedicalKit(e.target.value)}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>
          Бригада №
        </option>
            {medicalKits.map((kit) => (
              <option key={kit.id} value={kit.id}>
                {kit.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="car"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Выберите АСМП
          </label>
          <select
            name="car"
            id="car"
            value={selectedAmbulance}
            onChange={(e) => setSelectedAmbulance(e.target.value)}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled className="text-xs">
          АСМП №
        </option>
            {ambulances.map((car) => (
              <option key={car.id} value={car.id}>
                {car.number}
              </option>
            ))}
          </select>
        </div>

        <div className="relative mb-6" data-twe-input-wrapper-init>
          <textarea
            className="peer block min-h-[auto] w-full rounded border-0 dark:bg-gray-700 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            name="commentTake"
            id="commentTake"
            placeholder=""
            value={commentTake}
            onChange={(e) => setCommentTake(e.target.value)}
          ></textarea>
          <label
            htmlFor="commentTake"
            className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 ${
                commentTake ? "-translate-y-[0.9rem] scale-[0.8]" : ""
              }`}
          >
            Комментарий
          </label>
        </div>
        <div className="">
          <LoadingButton onClick={handleAcceptBrigade} isLoading={isLoading}>
            Принять
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default ClientBrigadeForm;
