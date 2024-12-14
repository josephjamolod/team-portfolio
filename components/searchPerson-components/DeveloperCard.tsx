import React from "react";
import { Badge } from "@/components/ui/badge";
import { Staff } from "./SearchPerson";
import Image from "next/image";

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
      className={`bg-white dark:bg-black rounded-lg shadow-sm p-6 cursor-pointer transition-all
        ${isSelected ? "ring-2 ring-[#624ced] shadow-md" : "hover:shadow-md"}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative min-w-16 h-16 ">
          <Image
            src={staff.profileSrc}
            alt={staff.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className=" rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center gap-2 capitalize">
            {staff.name + " " + staff.lastname}

            <Badge
              variant="default"
              className="text-xs bg-green-200 hover:bg-green-300 bottom-2 right-2 text-green-800"
            >
              AVAILABLE
            </Badge>
          </h2>
          <p className="text-gray-600 dark:text-muted-foreground text-base font-medium">
            {staff.position}
          </p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-muted-foreground text-base">
        {staff.serviceDescription}
      </p>
    </div>
  );
};
