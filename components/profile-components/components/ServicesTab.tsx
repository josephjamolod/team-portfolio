import React from "react";
import { ServiceCard } from "./ServiceCard";
import { Services } from "@/app/(public)/meet-the-team/[id]/page";

interface ServicesTabProps {
  services?: Services[]; // Array of Services
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ services }) => {
  return (
    <div className="py-6 space-y-4">
      {services?.map((service, index) => (
        <ServiceCard key={index} {...service} id={index} />
      ))}
    </div>
  );
};