import { Service } from "@/components/create-profile-components/(service)/serviceForm";
import { Badge } from "@/components/ui/badge";
import React from "react";

export const ServiceCard: React.FC<Service> = ({
  description,
  name,
  isActive,
  perHour,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col justify-between items-start mb-2">
        <Badge
          variant={"outline"}
          className={`w-fit  ${
            isActive ? "bg-green-200 text-black" : "text-primary"
          } `}
        >
          {isActive ? "active" : "inactive"}
        </Badge>
        <h3 className="text-base font-semibold text-primary uppercase  ">
          {name}
        </h3>
      </div>
      <p className="text-sm mb-3 text-muted-foreground">{description}</p>
      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">Per Hour:</span>
        <span className="font-medium">${perHour}</span>
      </div>
    </div>
  );
};
