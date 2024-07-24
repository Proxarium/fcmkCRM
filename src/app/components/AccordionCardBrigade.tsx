// AccordionCardBrigade.tsx
"use client";

import { useState, useEffect } from "react";
import LoadingButton from "./LoadingButton";
import Tooltip from "./Tooltip";

type EquipmentItem = {
  id: string;
  name: string;
  quantity: number;
  fquantity: number | null;
  desc: string | null;
  available: boolean;
  category: string;
};

type AccordionCardProps = {
  title: string;
  imageSrc: string;
  equipment: EquipmentItem[];
  saveAction: (equipment: EquipmentItem[]) => Promise<void>;
  isOpen: boolean;
  onToggle: () => void;
  checkedKit: boolean;
};

const AccordionCardBrigade: React.FC<AccordionCardProps> = ({
  title,
  imageSrc,
  equipment,
  saveAction,
  isOpen,
  onToggle,
  checkedKit,
}) => {
  const [editableEquipment, setEditableEquipment] = useState(equipment);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(
    null
  );
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setVerificationMessage(checkedKit ? "Проверена" : "Ожидает проверки");
  }, [checkedKit]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  const handleInputChange = (id: string, field: string, value: any) => {
    setEditableEquipment((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setEditableEquipment((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveAction(editableEquipment);
      setVerificationMessage("Проверена");
      onToggle(); // Закрытие окна после подтверждения
    } catch (error) {
      setVerificationMessage("Проверьте данные");
      console.error("Error saving equipment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEquipment = editableEquipment.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedEquipment = filteredEquipment.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, EquipmentItem[]>);

  return (
    <div
      className={`relative bg-neutral-800/20 rounded-lg mb-4 ${
        isOpen ? "z-30" : "z-10"
      }`}
    >
      <div
        className="p-4 cursor-pointer flex justify-between items-center z-20 relative"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <img src={imageSrc} alt="icon" className="w-10 h-10 mr-2" />
          <h2>{title}</h2>
          {verificationMessage && (
            <span
              className={`ml-2 text-xs ${
                verificationMessage === "Проверена"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {verificationMessage}
            </span>
          )}
        </div>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={onToggle}
          ></div>
          <div
            className={`fixed bottom-0 left-0 w-full h-full bg-neutral-900 z-20 shadow-lg rounded-t-lg flex flex-col transition-transform duration-300 ease-in-out ${
              isAnimating ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="p-6 bg-neutral-900 z-20 sticky top-0">
              <div className="w-full flex justify-center items-center text-center mb-4 font-bold">
                <span>{`Перечень содержимого линейной укладки ${title}`}</span>
              <button onClick={onToggle} className="text-white absolute top-4 right-4">
                ✖
              </button>
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="поиск..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full p-2 rounded-md bg-neutral-800 text-white"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="space-y-2">
                {Object.entries(groupedEquipment).map(([category, items]) => (
                  <li key={category}>
                    <div
                      className="flex items-center justify-between text-sm py-2 cursor-pointer bg-neutral-900 sticky top-0 z-30"
                      onClick={() => toggleCategory(category)}
                    >
                      <span>{category}</span>
                      <span>
                        {expandedCategories.includes(category) ? "▲" : "▼"}
                      </span>
                    </div>
                    {expandedCategories.includes(category) && (
                      <ul className="pl-4 space-y-2">
                        {items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between text-xs border-b border-slate-600 py-2"
                          >
                            <Tooltip content={item.desc || "Описание отсутствует"}>
                              <span
                                className={`flex-1 ${
                                  item.quantity === 0 || !item.available
                                    ? "text-red-500"
                                    : ""
                                }`}
                              >
                                {item.name} {item.fquantity}шт
                              </span>
                            </Tooltip>
                            <div className="flex flex-grow items-center justify-end mr-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                className="text-white border border-gray-500 p-1 rounded-md text-xl w-5 h-5 flex items-center justify-center bg-neutral-700"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-neutral-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="text-white border border-gray-500 pb-0.5 rounded-md text-xl w-5 h-5 flex items-center justify-center bg-neutral-700"
                              >
                                +
                              </button>
                            </div>
                            <input
                              type="checkbox"
                              checked={item.available}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  "available",
                                  e.target.checked
                                )
                              }
                              className={`ml-2 ${
                                item.available ? "bg-green-500" : "bg-red-500"
                              }`}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-neutral-800 rounded-b-lg sticky bottom-0">
              <LoadingButton onClick={handleSubmit} isLoading={loading}>
                Подтвердить
              </LoadingButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccordionCardBrigade;







