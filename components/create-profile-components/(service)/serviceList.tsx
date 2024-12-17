import React from "react";
import { Service } from "./serviceForm";
import ServiceItem from "./serviceItem";

interface ServiceListProps {
  services: Service[];
  onDeleteService: (serviceId: number) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  onDeleteService,
}) => {
  if (services.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <ServiceItem
          key={index}
          id={index}
          service={service}
          onDelete={onDeleteService}
        />
      ))}
    </div>
  );
};

export default ServiceList;
