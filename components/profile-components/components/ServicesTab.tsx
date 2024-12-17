import React from "react";
import { ServiceCard } from "./ServiceCard";
import { Services } from "@/components/searchPerson-components/SearchPerson";

interface ServicesTabProps {
  services?: Services[]; // Array of Services
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ services }) => {
  return (
    <div className="py-6 space-y-4">
      {services?.map((service, index) => (
        <ServiceCard key={index} {...service} id={index.toString()} />
      ))}
    </div>
  );
};
