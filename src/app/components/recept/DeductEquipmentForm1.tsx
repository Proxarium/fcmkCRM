// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface DeductItem {
//   name: string;
//   quantity: number;
// }

// interface DeductEquipmentFormProps {
//   medicalKitId: string;
//   equipment: {
//     id: string;
//     name: string;
//     quantity: number;
//     desc: string | null;
//   }[];
//   userId: string;
//   saveDeduction: (data: { callCardNumber: string; medicalKitId: string; deductedItems: DeductItem[]; userId: string }) => Promise<any>;
// }

// export default function DeductEquipmentForm({ medicalKitId, equipment, userId, saveDeduction }: DeductEquipmentFormProps) {
//   const [deductedItems, setDeductedItems] = useState<DeductItem[]>([]);
//   const [callCardNumber, setCallCardNumber] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const router = useRouter();

//   const handleAddItem = (name: string) => {
//     setDeductedItems([...deductedItems, { name, quantity: 1 }]);
//     setSearchTerm('');
//   };

//   const handleQuantityChange = (index: number, quantity: number) => {
//     const newItems = [...deductedItems];
//     newItems[index].quantity = quantity;
//     setDeductedItems(newItems);
//   };

//   const handleSave = async () => {
//     try {
//       await saveDeduction({
//         callCardNumber,
//         medicalKitId,
//         deductedItems,
//         userId
//       });

//       router.refresh();
//     } catch (error) {
//       console.error('Error saving deduction:', error);
//     }
//   };

//   const filteredEquipment = equipment.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 bg-gray-800 rounded-lg shadow-md">
//       <div className="mb-4">
//         <input
//           type="text"
//           value={callCardNumber}
//           onChange={(e) => setCallCardNumber(e.target.value)}
//           placeholder="Номер карты вызова"
//           className="w-full p-2 bg-gray-700 text-white rounded-lg"
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Введите название препарата"
//           className="w-full p-2 bg-gray-700 text-white rounded-lg"
//         />
//         {searchTerm && (
//           <ul className="mt-2 bg-gray-700 rounded-lg p-2 max-h-40 overflow-y-auto">
//             {filteredEquipment.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex justify-between items-center p-2 hover:bg-gray-600 rounded-lg cursor-pointer"
//                 onClick={() => handleAddItem(item.name)}
//               >
//                 {item.name}
//                 <button className="text-blue-400">+</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="mb-4">
//         <h2 className="text-white mb-2">Списанные препараты</h2>
//         {deductedItems.map((item, index) => (
//           <div key={index} className="flex justify-between items-center mb-2">
//             <span className="text-white">{item.name}</span>
//             <input
//               type="number"
//               value={item.quantity}
//               onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
//               className="w-20 p-2 bg-gray-700 text-white rounded-lg text-right"
//             />
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handleSave}
//         className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//       >
//         Подтвердить списание
//       </button>
//     </div>
//   );
// }








  