import React, { useState } from "react";
import { z } from "zod";
import FormInput from "./formInput";

import { Button } from "@/components/ui/button";
import { serviceSchema } from "@/schema";

export interface Service {
  id: number;
  name: string;
  description: string;
}

interface ServiceFormProps {
  onAddService: (service: Service) => void;
}

interface FormErrors {
  name?: string[];
  description?: string[];
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onAddService }) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const createService = (name: string, description: string): Service => ({
    id: Date.now(),
    name,
    description,
  });

  const handleSubmit = () => {
    try {
      const validatedData = serviceSchema.parse({
        name: serviceName,
        description: serviceDescription,
      });

      onAddService(
        createService(validatedData.name, validatedData.description)
      );

      // Reset form
      setServiceName("");
      setServiceDescription("");
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormErrors;
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path]?.push(err.message);
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="bg-[#efecff] rounded-lg p-4 mb-4">
      <div className="space-y-4">
        <FormInput
          id="serviceName"
          label="Service Name"
          value={serviceName}
          onChange={setServiceName}
          placeholder="Enter service name"
          error={errors.name}
        />
        <FormInput
          id="serviceDescription"
          label="Service Description"
          value={serviceDescription}
          onChange={setServiceDescription}
          placeholder="Enter service description"
          error={errors.description}
        />

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-md hover:opacity-100 opacity-85 h-12 text-xl hover:shadow-lg bg-gradient-to-r from-[#988ce6] to-[#624ced] mt-[20px] transform transition-opacity duration-300"
        >
          Add Service
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
