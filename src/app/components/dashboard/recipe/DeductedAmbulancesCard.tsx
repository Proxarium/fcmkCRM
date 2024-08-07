"use client";
import { useEffect, useState } from "react";
import { getDeductedAmbulances } from "@/actions/dashboard/getDeductedAmbulances";
import { markAsReplenishedAmbulance } from "@/actions/recipeAmbulance/markAsReplenishedAmbulance";
import Card from "../Card";
import Modal from "../Modal";

interface DeductedItem {
  name: string;
  quantity: number;
}

interface DeductedAmbulance {
  id: string;
  callCardNumber: string;
  deductionDate: string;
  user: {
    username: string;
  };
  ambulance: {
    number: string;
  };
  items: DeductedItem[];
}

const DeductedAmbulancesCard = () => {
  const [deductions, setDeductions] = useState<DeductedAmbulance[]>([]);
  const [selectedDeduction, setSelectedDeduction] = useState<DeductedAmbulance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getDeductedAmbulances();
      setDeductions(data);
    }
    fetchData();
  }, []);

  const openModal = (deduction: DeductedAmbulance) => {
    setSelectedDeduction(deduction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDeduction(null);
    setIsModalOpen(false);
  };

  const handleReplenish = async () => {
    if (selectedDeduction) {
      const result = await markAsReplenishedAmbulance(selectedDeduction.id);
      if (result.success) {
        closeModal();
        // Refresh the list
        const data = await getDeductedAmbulances();
        setDeductions(data);
      } else {
        console.error(result.error);
      }
    }
  };

  return (
    <div className="px-2 pt-5 bg-neutral-900 rounded-lg ring-1">
      <div className="flex items-center justify-between px-3 ">
        <div className="flex flex-col">
      <h1 className=" text-xl font-bold text-white">Рецепты - {deductions.length}</h1>
      <span className="text-xs text-neutral-500">АСМП</span>
      </div>
      <img src="/kung.png" alt='recipe' className="w-14 h-12"/>
      </div>
      <div className="flex flex-col space-y-2 max-h-[180px] overflow-y-auto no-scrollbar pt-2 px-0.5">
        {deductions.map((deduction) => (
          <Card
            key={deduction.id}
            // imageSrc="/recept.png" // Replace with your image path
            subtitle={`АСМП № ${deduction.ambulance.number}`}
            description={`Рецепт от ${new Date(deduction.deductionDate).toLocaleString()}`}
            title={`${deduction.user.username}`}
            onClick={() => openModal(deduction)}
          />
        ))}
      </div>

      {isModalOpen && selectedDeduction && (
        <Modal onClose={closeModal}>
          <div className="text-white">
            <p>Рецепт от: {new Date(selectedDeduction.deductionDate).toLocaleString()}</p>
            <p>Автомобиль: {selectedDeduction.ambulance.number}</p>
            <h2>Номер карты вызова: {selectedDeduction.callCardNumber}</h2>
            <p>Сотрудник: {selectedDeduction.user.username}</p>
          </div>
          <table className="table-auto w-full text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Название</th>
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
          <div className="space-y-2 pt-5">
            <button
              className="relative px-4 py-2 bg-blue-500 text-white text-xs rounded-md flex items-center justify-center w-full"
              onClick={handleReplenish}
            >
              Пополнить
            </button>
            <button
              className="relative px-4 py-2 bg-red-500 text-white text-xs rounded-md flex items-center justify-center w-full"
              onClick={closeModal}
            >
              Закрыть
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeductedAmbulancesCard;
