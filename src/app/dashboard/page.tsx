import React from 'react';
import DashboardBrigadeCard from '../components/dashboard/DashboardCardBrigade';
import DeductedMedicationsCard from '../components/dashboard/recipe/DeductedMedicationsCard';
import DeductedAmbulancesCard from '../components/dashboard/recipe/DeductedAmbulancesCard';

const DashboardPage = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-between'>
    <div className='px-2 pt-3 '>
      <DashboardBrigadeCard />
    </div>
    <div className='flex flex-col px-2 pt-3 space-y-3 lg:items-end '>
      <div className='lg:w-full'>
        <DeductedMedicationsCard />
      </div>
      <div className='lg:w-full'>
        <DeductedAmbulancesCard />
      </div>
    </div>
  </div>
  );
};

export default DashboardPage;
