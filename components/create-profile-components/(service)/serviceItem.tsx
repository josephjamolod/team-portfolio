import React from "react";
import { Service } from "./serviceForm";

interface ServiceItemProps {
  service: Service;
  onDelete: (serviceId: number) => void;
  id: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, onDelete, id }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <button
        type="button"
        onClick={() => onDelete(id)}
        className="self-end text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
        aria-label="Delete service"
      >
        <DeleteIcon />
      </button>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 whitespace-normal break-words pb-2 px-2 capitalize">
          {service.name}
        </h3>
        <hr className="border-[#624ced]" />
        <p className="text-gray-600 text-base mt-1 whitespace-normal break-words px-2">
          {service.description}
        </p>
        <p className="text-base p-2 flex gap-x-2 items-center">
          <span className="text-sm">Per hour:</span>{" "}
          <span>$ {service.perHour}</span>{" "}
          {service.isActive ? (
            <span className="border border-green-400 bg-emerald-100 text-sm  px-2 rounded-lg">
              Active
            </span>
          ) : (
            <span className="border px-2 rounded-lg text-muted-foreground text-sm bg-gray-50">
              Inactive
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

export default ServiceItem;
