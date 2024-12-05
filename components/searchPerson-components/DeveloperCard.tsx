import React from "react";
import { Badge } from "@/components/ui/badge";
import { Staff } from "../../app/(public)/search-person/page";

interface StaffCardProps {
  staff: Staff;
  isSelected: boolean;
  onClick: () => void;
}

export const StaffCard: React.FC<StaffCardProps> = ({
  staff,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all
        ${isSelected ? "ring-2 ring-[#624ced] shadow-md" : "hover:shadow-md"}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src={staff.profileSrc}
            alt={staff.name}
            className="min-w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 capitalize">
            {staff.name + " " + staff.lastname}

            <Badge
              variant="default"
              className="text-xs bg-green-200 hover:bg-green-300 bottom-2 right-2 text-green-800"
            >
              AVAILABLE
            </Badge>
          </h2>
          <p className="text-gray-600 text-base font-medium">
            {staff.position}
          </p>
        </div>
      </div>
      <p className="text-gray-600 text-base">{staff.serviceDescription}</p>
    </div>
  );
};
