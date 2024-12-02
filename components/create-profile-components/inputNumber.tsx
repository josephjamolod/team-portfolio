import React from "react";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface FormFieldPhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  country?: string; // Default country for the phone input
  isOptional?: boolean; // Indicate if the field is optional
}

const FormFieldPhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  country = "ph", // Default to "ph" (Philippines)
  isOptional = false,
}: FormFieldPhoneInputProps<T>) => {
  const { formState } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <div className="flex items-center justify-between">
            <FormLabel className="flex gap-x-2 text-black text-xs">
              <span> {label}</span>
              {!isOptional && <span className="text-red-500">*</span>}
            </FormLabel>
          </div>
          <FormControl>
            <PhoneInput
              {...field}
              country={country}
              containerClass="custom-phone-container"
              inputStyle={{
                fontSize: "0.875rem", // text-xs
                height: "2.5rem", // h-10
                backgroundColor: "#efecff", // bg-[#efecff]
                border: formState.errors[name]
                  ? "1.5px solid #f87171" // Red border if error
                  : "1.5px solid #e4e8ee", // Default border
                borderRadius: 0,
                width: "100%", // w-full
              }}
              placeholder={placeholder}
              onChange={(value) => field.onChange(value)} // Update form state
            />
          </FormControl>
          {formState.errors[name] && (
            <span className="flex gap-x-2 text-red-400">
              <FormMessage className="text-sm font-normal" />
            </span>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormFieldPhoneInput;
