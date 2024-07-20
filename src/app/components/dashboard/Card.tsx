import React from 'react';

type CardProps = {
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
  onClick: () => void;
  
};

const Card: React.FC<CardProps> = ({ imageSrc, title, subtitle, description, onClick }) => {
  return (
    <div 
      className="bg-neutral-900 p-2 border-b text-sm flex items-center justify-between cursor-pointer transform transition-transform hover:translate-x-1"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img src={imageSrc} alt="icon" className="w-14 h-12 mr-4" />
        <div>
          <h3 className="text-sm text-neutral-500">{title}</h3>
          <h4 className="text-white font-bold">{subtitle}</h4>
          <p className="text-white">{description}</p>
        </div>
      </div>
      <div className='flex pl-5'>
        <span className='text-white text-lg'>▷</span>
      </div>
    </div>
  );
};

export default Card;


