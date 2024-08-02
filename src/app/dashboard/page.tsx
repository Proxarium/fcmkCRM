import React from 'react'
import DashboardBrigadeCard from '../components/dashboard/DashboardCardBrigade'
import DeductedMedicationsCard from '../components/dashboard/recipe/DeductedMedicationsCard'


const DashboardPage = () => {
  return (
    <div className='flex'>
    <div className='px-2 pt-5 w-[370px]'>
      <DashboardBrigadeCard/>
    </div>
    <div className='px-2 pt-5'>
      <DeductedMedicationsCard/>
    </div>
   
    </div>
  )
}

export default DashboardPage