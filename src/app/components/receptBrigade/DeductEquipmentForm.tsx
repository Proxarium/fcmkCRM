"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/app/components/LoadingButton';
import Toast from '../Brigade/Toast';
 // Импортируем компонент Toast

interface DeductItem {
  name: string;
  quantity: number;
}

interface DeductEquipmentFormProps {
  medicalKitId: string;
  equipment: {
    id: string;
    name: string;
    quantity: number;
    desc: string | null;
  }[];
  userId: string;
  saveDeduction: (data: { callCardNumber: string; medicalKitId: string; deductedItems: DeductItem[]; userId: string }) => Promise<any>;
}

export default function DeductEquipmentForm({ medicalKitId, equipment, userId, saveDeduction }: DeductEquipmentFormProps) {
  const [deductedItems, setDeductedItems] = useState<DeductItem[]>([]);
  const [callCardNumber, setCallCardNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); // Стейт для сообщения Toast

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  const handleAddItem = (name: string) => {
    setDeductedItems([...deductedItems, { name, quantity: 1 }]);
    setSearchTerm('');
  };

  const handleQuantityChange = (index: number, change: number) => {
    const newItems = [...deductedItems];
    const newQuantity = newItems[index].quantity + change;
    if (newQuantity > 0) {
      newItems[index].quantity = newQuantity;
      setDeductedItems(newItems);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...deductedItems];
    newItems.splice(index, 1);
    setDeductedItems(newItems);
  };

  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await saveDeduction({
        callCardNumber,
        medicalKitId,
        deductedItems,
        userId,
      });
      setToastMessage('Рецепт отправлен'); // Устанавливаем сообщение Toast
      router.refresh();
    } catch (error) {
      console.error('Error saving deduction:', error);
    } finally {
      setIsLoading(false);
      onToggle();
    }
  };

  return (
    <div className="relative">
      <button
        className="relative px-4 py-2 bg-blue-500 text-white text-xs rounded-md flex items-center justify-center w-full"
        onClick={onToggle}
      >
        Написать рецепт для укладки
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={onToggle}
          ></div>
          <div
            className={`fixed bottom-0 left-0 w-full h-full bg-neutral-900 z-40 shadow-lg rounded-t-lg flex flex-col transition-transform duration-300 ease-in-out ${
              isAnimating ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="p-6 bg-neutral-900 z-20 sticky top-0">
              <div className="w-full flex justify-center items-center text-center mb-4 font-bold">
                <button onClick={onToggle} className="text-white absolute top-4 right-4">
                  ✖
                </button>
                <span>Рецепт</span>
              </div>
            </div>

            <div className="p-4 rounded-lg shadow-md">
              <div className="mb-4">
                <input
                  type="text"
                  value={callCardNumber}
                  onChange={(e) => setCallCardNumber(e.target.value)}
                  placeholder="Номер карты вызова"
                  className="w-full p-2 rounded-md bg-neutral-800 text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Введите название препарата"
                  className="w-full p-2 rounded-md bg-neutral-800 text-white"
                />
                {searchTerm && (
                  <ul className="mt-2 bg-gray-700 rounded-lg p-2 max-h-40 overflow-y-auto">
                    {filteredEquipment.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center p-2 hover:bg-gray-600 rounded-lg cursor-pointer"
                        onClick={() => handleAddItem(item.name)}
                      >
                        {item.name}
                        <button className="text-blue-400">+</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mb-4">
                <h2 className="text-white mb-2">Списанные препараты</h2>
                {deductedItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span className="text-white">{item.name}</span>
                    <div className="flex flex-grow items-center justify-end mr-2">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="text-white border border-gray-500 p-1 rounded-md text-xl w-5 h-5 flex items-center justify-center bg-neutral-700"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-neutral-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="text-white border border-gray-500 pb-0.5 rounded-md text-xl w-5 h-5 flex items-center justify-center bg-neutral-700"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 ml-2"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-neutral-800 rounded-b-lg sticky bottom-0">
              <LoadingButton onClick={handleSave} isLoading={isLoading}>
                Отправить рецепт
              </LoadingButton>
            </div>
          </div>
        </>
      )}
      {toastMessage && <Toast message={toastMessage} />} {/* Добавляем компонент Toast */}
    </div>
  );
}













