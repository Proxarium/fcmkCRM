// components/Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-auto relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
