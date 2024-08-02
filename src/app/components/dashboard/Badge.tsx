// components/Badge.tsx
import React from "react";

interface BadgeProps {
  text: string;
  type: "info" | "success" | "warning";
}

const Badge: React.FC<BadgeProps> = ({ text, type }) => {
  const getTypeClass = () => {
    switch (type) {
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <span className={`px-2  rounded text-white ${getTypeClass()}`}>
      {text}
    </span>
  );
};

export default Badge;
