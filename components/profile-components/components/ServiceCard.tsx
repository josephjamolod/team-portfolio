import { Service } from "@/components/create-profile-components/(service)/serviceForm";
import React from "react";

export const ServiceCard: React.FC<Service> = ({
  description,
  name,
  isActive,
  perHour,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold text-[#624ced] uppercase mb-3 ">
          {name}
        </h3>

        <span
          className={`px-2 py-1 rounded-full text-xs capitalize border ${
            isActive
              ? "bg-green-100 text-green-800 border-green-400"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {isActive ? " active" : "inactive"}
        </span>
      </div>
      <p className="text-sm mb-3">{description}</p>
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500">Per Hour:</span>
        <span className="font-medium">${perHour}</span>
      </div>
    </div>
  );
};
