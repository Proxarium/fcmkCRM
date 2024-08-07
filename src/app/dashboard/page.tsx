import React from 'react';
import DashboardBrigadeCard from '../components/dashboard/DashboardCardBrigade';
import DeductedMedicationsCard from '../components/dashboard/recipe/DeductedMedicationsCard';
import DeductedAmbulancesCard from '../components/dashboard/recipe/DeductedAmbulancesCard';

const DashboardPage = () => {
  return (
    <div className='flex flex-col lg:flex-row h-full w-full'>
      <div className='px-2 pt-3 lg:w-1/3'>
        <DashboardBrigadeCard />
      </div>
      <div className='hidden lg:flex lg:w-2/3'></div>
      <div className='px-2 pt-3 space-y-3 lg:w-1/3 lg:flex lg:flex-col lg:items-end'>
        <div className='w-full'>
          <DeductedMedicationsCard />
        </div>
        <div className='w-full'>
          <DeductedAmbulancesCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;