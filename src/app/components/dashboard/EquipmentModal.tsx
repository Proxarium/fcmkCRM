import React, { useState, useEffect } from "react";
import { getEquipmentByBrigadeId } from "@/actions/dashboard/getEquipment";

type Equipment = {
  id: string;
  name: string;
  quantity: number;
  available: boolean;
  categories: { name: string }[];
};

type EquipmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  brigadeId: string;
};

const Badge: React.FC<{ status: string }> = ({ status }) => {
  const statusColor = status === "Проверена" || status === "Проверен" ? "bg-green-500" : "bg-yellow-500";
  return <span className={`text-white text-xs px-2 py-1 rounded ${statusColor}`}>{status}</span>;
};

const EquipmentModal: React.FC<EquipmentModalProps> = ({ isOpen, onClose, brigadeId }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [medicalKitEquipment, setMedicalKitEquipment] = useState<Equipment[]>([]);
  const [ambulanceEquipment, setAmbulanceEquipment] = useState<Equipment[]>([]);
  const [medicalKitName, setMedicalKitName] = useState<string>("");
  const [ambulanceNumber, setAmbulanceNumber] = useState<string>("");
  const [takeDate, setTakeDate] = useState<string>("");
  const [checkedKit, setCheckedKit] = useState<boolean>(false);
  const [checkedAmbulance, setCheckedAmbulance] = useState<boolean>(false);
  const [checkedKitDate, setCheckedKitDate] = useState<string>("");
  const [checkedAmbulanceDate, setCheckedAmbulanceDate] = useState<string>("");
  const [expandedMedicalKit, setExpandedMedicalKit] = useState(false);
  const [expandedAmbulance, setExpandedAmbulance] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await getEquipmentByBrigadeId(brigadeId);
        setMedicalKitEquipment(data.medicalKitEquipment);
        setAmbulanceEquipment(data.ambulanceEquipment);
        setMedicalKitName(data.medicalKitName);
        setAmbulanceNumber(data.ambulanceNumber);
        setTakeDate(data.takeDate || "");
        setCheckedKit(data.checkedKit);
        setCheckedAmbulance(data.checkedAmbulance);
        setCheckedKitDate(data.checkedKitDate || "");
        setCheckedAmbulanceDate(data.checkedAmbulanceDate || "");
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };
    if (isOpen) {
      fetchEquipment();
      document.body.style.overflow = "hidden"; // Hide page scroll
    } else {
      document.body.style.overflow = "auto"; // Show page scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Restore scroll on unmount
    };
  }, [isOpen, brigadeId]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
    );
  };

  const toggleMedicalKit = () => {
    setExpandedMedicalKit(prev => !prev);
  };

  const toggleAmbulance = () => {
    setExpandedAmbulance(prev => !prev);
  };

  const groupEquipmentByCategory = (equipment: Equipment[]) => {
    return equipment.reduce((acc, item) => {
      item.categories.forEach(category => {
        if (!acc[category.name]) {
          acc[category.name] = [];
        }
        acc[category.name].push(item);
      });
      return acc;
    }, {} as { [key: string]: Equipment[] });
  };

  const medicalKitGrouped = groupEquipmentByCategory(medicalKitEquipment);
  const ambulanceGrouped = groupEquipmentByCategory(ambulanceEquipment);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center ${isOpen ? "block" : "hidden"}`}>
      <div className="bg-neutral-900 rounded-lg shadow-lg w-full max-w-4xl md:h-4/5 h-full md:w-11/12 md:max-w-5xl overflow-y-auto no-scrollbar">
        <div className="p-6 bg-neutral-800 flex justify-between items-center relative">
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-lg">{medicalKitName}</h2>
            <p className="text-white text-md">АСМП № {ambulanceNumber}</p>
            <p className="text-white text-sm">Дата приема: {new Date(takeDate).toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <p className="text-white text-sm">Статус аптечки:</p>
              <Badge status={checkedKit ? "Проверена" : "Ожидает проверки"} />
            </div>
            {checkedKit && <p className="text-white text-sm">Дата проверки аптечки: {new Date(checkedKitDate).toLocaleString()}</p>}
            <div className="flex items-center gap-2">
              <p className="text-white text-sm">Статус автомобиля:</p>
              <Badge status={checkedAmbulance ? "Проверен" : "Ожидает проверки"} />
            </div>
            {checkedAmbulance && <p className="text-white text-sm">Дата проверки автомобиля: {new Date(checkedAmbulanceDate).toLocaleString()}</p>}
          </div>
          <button onClick={onClose} className="text-white absolute top-4 right-4">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
          <h3 className="text-white font-bold text-md mt-4 flex items-center cursor-pointer" onClick={toggleMedicalKit}>
            <img src="/medicalKit.png" alt="Medical Kit" className="w-6 h-6 mr-2" />
            {medicalKitName}
            <span className="ml-auto">{expandedMedicalKit ? "▲" : "▼"}</span>
          </h3>
          {expandedMedicalKit && (
            <ul className="space-y-2 mt-2">
              {Object.entries(medicalKitGrouped).map(([category, items]) => (
                <li key={category}>
                  <div
                    className="flex items-center font-semibold text-slate-400 justify-between text-sm py-2 cursor-pointer bg-neutral-900 sticky top-0"
                    onClick={() => toggleCategory(category)}
                  >
                    <span>{category}</span>
                    <span>{expandedCategories.includes(category) ? "▲" : "▼"}</span>
                  </div>
                  {expandedCategories.includes(category) && (
                    <ul className="pl-4 space-y-2 max-h-80 overflow-y-auto no-scrollbar text-white">
                      {items.map(item => (
                        <li
                          key={item.id}
                          className={`flex items-center justify-between text-xs border-b border-slate-600 py-2 ${item.quantity === 0 || !item.available || (category === "Кислородные баллоны" && item.quantity < 50) ? "text-red-500" : ""}`}
                        >
                          <span className="flex-1">{item.name}</span>
                          <span className="ml-2">{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}

          <h3 className="text-white font-bold text-md mt-6 flex items-center cursor-pointer" onClick={toggleAmbulance}>
            <img src="/kung1.png" alt="Ambulance" className="w-6 h-6 mr-2" />
            АСМП № {ambulanceNumber}
            <span className="ml-auto">{expandedAmbulance ? "▲" : "▼"}</span>
          </h3>
          {expandedAmbulance && (
            <ul className="space-y-2 mt-2">
              {Object.entries(ambulanceGrouped).map(([category, items]) => (
                <li key={category}>
                  <div
                    className="flex items-center font-semibold text-slate-400 justify-between text-sm py-2 cursor-pointer bg-neutral-900 sticky top-0"
                    onClick={() => toggleCategory(category)}
                  >
                    <span>{category}</span>
                    <span>{expandedCategories.includes(category) ? "▲" : "▼"}</span>
                  </div>
                  {expandedCategories.includes(category) && (
                    <ul className="pl-4 space-y-2 max-h-80 overflow-y-auto no-scrollbar text-white">
                      {items.map(item => (
                        <li
                          key={item.id}
                          className={`flex items-center justify-between text-xs border-b border-slate-600 py-2 ${item.quantity === 0 || !item.available ? "text-red-500" : ""}`}
                        >
                          <span className="flex-1">{item.name}</span>
                          <span className="ml-2">{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;






