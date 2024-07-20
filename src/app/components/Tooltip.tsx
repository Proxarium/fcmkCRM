// Tooltip.tsx
import React from "react";

type TooltipProps = {
  content: string;
  position?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ content, position = "bottom", children }) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div
        className={`absolute whitespace-no-wrap bg-gray-700 text-white text-xs rounded py-1 px-2 mt-2 z-20 hidden group-hover:block ${
          position === "top" ? "bottom-full mb-2" :
          position === "right" ? "left-full ml-2" :
          position === "bottom" ? "top-full mt-2" :
          "right-full mr-2"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
