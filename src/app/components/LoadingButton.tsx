import React from "react";

interface LoadingButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  type = "button",
  onClick,
  isLoading,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className="relative px-4 py-2 bg-blue-500 text-white text-xs rounded-md flex items-center justify-center w-full"
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-4 w-4 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.966 7.966 0 014 12H2c0 2.042.832 3.899 2.207 5.291l1.586-1.585z"
            ></path>
          </svg>
          <span>Загружаем...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;


