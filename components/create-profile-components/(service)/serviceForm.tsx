import React, { useState } from "react";
import { z } from "zod";
import FormInput from "./formInput";
import { Button } from "@/components/ui/button";
import { serviceSchema } from "@/schema";
import { v4 as uuidv4 } from "uuid";

export interface Service {
  id: string;
  name: string;
  description: string;
  perHour: number;
  isActive: boolean;
}

interface ServiceFormProps {
  onAddService: (service: Service) => void;
}

interface FormErrors {
  name?: string[];
  description?: string[];
  perHour?: string[];
  isActive?: string[];
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onAddService }) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [perHour, setPerHour] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

  const createService = (
    name: string,
    description: string,
    perHour: number,
    isActive: boolean
  ): Service => ({
    id: uuidv4(),
    name,
    description,
    perHour,
    isActive,
  });

  const handleSubmit = () => {
    try {
      const validatedData = serviceSchema.parse({
        name: serviceName,
        description: serviceDescription,
        perHour,
        isActive,
      });

      onAddService(
        createService(
          validatedData.name,
          validatedData.description,
          validatedData.perHour,
          validatedData.isActive
        )
      );

      // Reset form
      setServiceName("");
      setServiceDescription("");
      setPerHour(0);
      setIsActive(true);
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
    <div className="bg-[#efecff] dark:bg-secondary rounded-lg p-4 mb-4">
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
        <div>
          <div className="flex px-2 items-center mt-2 gap-x-2">
            <label
              htmlFor="servicePerHour"
              className="font-medium text-primary text-xs"
            >
              <span className="pr-2">Per hour:</span>
              <input
                placeholder="$"
                type="number"
                className="px-2 w-16 border border-gray-300 rounded-lg bg-transparent text-md h-10 focus:outline-none focus:border-[#b071ec]"
                min="0"
                value={perHour}
                onChange={(e) =>
                  setPerHour(e.target.value === "" ? 0 : Number(e.target.value))
                }
              />
            </label>

            {/* Toggle Switch */}
            <label className="flex items-center cursor-pointer gap-2">
              <span className="text-xs font-medium">Active:</span>
              <div
                className={`relative w-8 h-4 ${
                  isActive ? "bg-[#614cedbe]" : "bg-gray-300"
                } rounded-full transition-colors duration-300`}
                onClick={() => setIsActive((prev) => !prev)}
              >
                <div
                  className={`absolute top-1 left-1 w-2 h-2 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    isActive ? "transform translate-x-4" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
        <span>
          {errors.perHour && (
            <div className="mt-1 text-sm text-red-600">
              {errors.perHour.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          )}
        </span>

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-md hover:opacity-100 opacity-85 h-12 text-xl bg-[#624ced] hover:bg-[#5643d1] hover:shadow-lg mt-[20px] transform transition-opacity text-white duration-300"
        >
          Add Service
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
