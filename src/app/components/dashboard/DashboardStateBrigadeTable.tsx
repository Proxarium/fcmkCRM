"use client";

import React, { useEffect, useState } from "react";
import { getStateBrigades, StateBrigade } from "@/actions/dashboard/stateBrigade";
import Badge from "../Badge";
import Modal from "./Modal";

const BrigadeTable: React.FC = () => {
  const [brigades, setBrigades] = useState<StateBrigade[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrigade, setSelectedBrigade] = useState<StateBrigade | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchBrigades() {
      try {
        const data = await getStateBrigades((currentPage - 1) * itemsPerPage, itemsPerPage, searchTerm);
        setBrigades(data);
      } catch (error) {
        console.error("Error fetching brigades:", error);
      }
    }

    fetchBrigades();
  }, [currentPage, searchTerm]);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleRowClick = (brigade: StateBrigade) => {
    setSelectedBrigade(brigade);
  };

  const handleCloseModal = () => {
    setSelectedBrigade(null);
  };

  return (
    <div className="px-5 pt-5">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded bg-neutral-900 text-white w-full"
      />
      <table className="min-w-full border border-gray-700 bg-neutral-900 text-neutral-200">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-2 px-4 border-b border-gray-700">Дата приёма</th>
            <th className="py-2 px-4 border-b border-gray-700">Дата возврата</th>
            <th className="py-2 px-4 border-b border-gray-700">Статус</th>
            <th className="py-2 px-4 border-b border-gray-700">Бригада</th>
            <th className="py-2 px-4 border-b border-gray-700">Машина</th>
            <th className="py-2 px-4 border-b border-gray-700">Сотрудник</th>
          </tr>
        </thead>
        <tbody>
          {brigades.map(brigade => (
            <tr key={brigade.id} className="hover:bg-neutral-800 cursor-pointer" onClick={() => handleRowClick(brigade)}>
              <td className="py-2 px-4 border-b border-gray-700">
                {brigade.takeDate?.toLocaleString() || "N/A"}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {brigade.returnDate?.toLocaleString() || "N/A"}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                <Badge
                  text={brigade.workStatus ? "В работе" : "Сдана"}
                  type={brigade.workStatus ? "info" : "success"}
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {brigade.medicalKit?.name || "N/A"}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {brigade.ambulance?.number || "N/A"}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {brigade.userTaker?.username || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Назад
        </button>
        <span className="text-white">Страница {currentPage}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Следующая
        </button>
      </div>
      {selectedBrigade && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col gap-2 relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-white">✖</button>
            <h2 className="text-white text-lg">{selectedBrigade.medicalKit?.name}</h2>
            <p className="text-white text-md">АСМП № {selectedBrigade.ambulance?.number}</p>
            <p className="text-white text-md">Дата приёма: {selectedBrigade.takeDate?.toLocaleString() || "N/A"}</p>
            <p className="text-white text-md">Дата возврата: {selectedBrigade.returnDate?.toLocaleString() || "N/A"}</p>
            <p className="text-white text-md">
              Статус укладки: <Badge text={selectedBrigade.checkedKit ? "Проверена" : "Ожидает проверки"} type={selectedBrigade.checkedKit ? "success" : "warning"} />
              {selectedBrigade.checkedKitDate ? ` (${selectedBrigade.checkedKitDate.toLocaleString()})` : ""}
            </p>
            <p className="text-white text-md">
              Статус машины: <Badge text={selectedBrigade.checkedAmbulance ? "Проверена" : "Ожидает проверки"} type={selectedBrigade.checkedAmbulance ? "success" : "warning"} />
              {selectedBrigade.checkedAmbulanceDate ? ` (${selectedBrigade.checkedAmbulanceDate.toLocaleString()})` : ""}
            </p>
            <p className="text-white text-md">Комментарий при приеме: {selectedBrigade.commentTake || "N/A"}</p>
            <p className="text-white text-md">Комментарий при сдаче укладки: {selectedBrigade.commentReturnKit || "N/A"}</p>
            <p className="text-white text-md">Комментарий при сдаче машины: {selectedBrigade.commentReturnAmbulance || "N/A"}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BrigadeTable;


