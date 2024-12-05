import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={
        "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-[#624ced] text-secondary hover:bg-[#5a46d8] shadow-sm"
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};
