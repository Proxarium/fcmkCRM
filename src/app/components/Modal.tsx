"use client";

import { useState, ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  onSave: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, children, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = async () => {
    await onSave();
    toggleModal();
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white text-xs p-2 flex items-center justify-center rounded-md w-[250px]"
      >
        {title}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-end justify-center z-50">
          <div className="bg-neutral-800/90 backdrop-blur-md w-full p-5 rounded-t-lg">
            <h2 className="text-white mb-4">{title}</h2>
            {children}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white text-xs p-2 rounded-md mr-2"
              >
                Save
              </button>
              <button
                onClick={toggleModal}
                className="bg-red-500 text-white text-xs p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
