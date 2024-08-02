// src/components/DeductedMedicationsCard.tsx
"use client"
import { useEffect, useState } from "react";
import { getDeductedMedications } from "@/actions/dashboard/getDeductedMedications";
import { markAsReplenished } from "@/actions/recipe/markAsReplenished";
import Card from "../Card";
import Modal from "../Modal";


interface DeductedItem {
  name: string;
  quantity: number;
}

interface DeductedMedication {
  id: string;
  callCardNumber: string;
  deductionDate: string;
  user: {
    username: string;
  };
  medicalKit: {
    name: string;
  };
  items: DeductedItem[];
}

const DeductedMedicationsCard = () => {
  const [deductions, setDeductions] = useState<DeductedMedication[]>([]);
  const [selectedDeduction, setSelectedDeduction] = useState<DeductedMedication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getDeductedMedications();
      setDeductions(data);
    }
    fetchData();
  }, []);

  const openModal = (deduction: DeductedMedication) => {
    setSelectedDeduction(deduction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDeduction(null);
    setIsModalOpen(false);
  };

  const handleReplenish = async () => {
    if (selectedDeduction) {
      const result = await markAsReplenished(selectedDeduction.id);
      if (result.success) {
        closeModal();
        // Refresh the list
        const data = await getDeductedMedications();
        setDeductions(data);
      } else {
        console.error(result.error);
      }
    }
  };

  return (
    <div className="px-5 pt-5 bg-neutral-900 rounded-lg">
      <h1 className="flex text-xl font-bold mb-6 text-white justify-center">Рецепты</h1>
      <div className="flex flex-col space-y-4 h-[550px] overflow-y-auto no-scrollbar">
      {deductions.map((deduction) => (
        <Card
          key={deduction.id}
          imageSrc="/recept.png" // Replace with your image path
          title={`Call Card Number: ${deduction.callCardNumber}`}
          subtitle={`Deduction Date: ${new Date(deduction.deductionDate).toLocaleString()}`}
          description={`User: ${deduction.user.username}\nMedical Kit: ${deduction.medicalKit.name}`}
          onClick={() => openModal(deduction)}
        />
      ))}
      </div>

      {isModalOpen && selectedDeduction && (
        <Modal onClose={closeModal}>
          <h2>Call Card Number: {selectedDeduction.callCardNumber}</h2>
          <p>User: {selectedDeduction.user.username}</p>
          <p>Deduction Date: {new Date(selectedDeduction.deductionDate).toLocaleString()}</p>
          <p>Medical Kit: {selectedDeduction.medicalKit.name}</p>
          <h3>Deducted Items:</h3>
          <table className="table-auto w-full text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Препарат</th>
                <th className="px-4 py-2">Количество</th>
              </tr>
            </thead>
            <tbody>
              {selectedDeduction.items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.quantity}шт</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleReplenish}
          >
            Пополнен
          </button>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default DeductedMedicationsCard;

