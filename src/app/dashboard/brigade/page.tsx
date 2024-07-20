import BrigadeTable from "@/app/components/dashboard/DashboardStateBrigadeTable";
import React from "react";

const BrigadDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="flex text-2xl font-bold mb-4 text-white items-center justify-center">
        Архив приёма бригад
      </h1>
      <BrigadeTable />
    </div>
  );
};
export default BrigadDashboardPage;
