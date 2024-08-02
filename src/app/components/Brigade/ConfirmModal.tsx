import React from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-xl px-4">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg z-50">
        <p className="mb-4 text-center text-white">{message}</p>
        <div className="flex justify-around">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={onConfirm}
          >
            Да
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onCancel}
          >
            Нет
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;

