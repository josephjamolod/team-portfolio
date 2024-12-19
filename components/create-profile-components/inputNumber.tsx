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
import { useTheme } from "next-themes";

interface FormFieldPhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  country?: string;
  isOptional?: boolean;
}

interface CountryData {
  countryCode?: string;
  dialCode?: string;
  name?: string;
}

const FormFieldPhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  country = "ph",
  isOptional = false,
}: FormFieldPhoneInputProps<T>) => {
  const { theme } = useTheme();
  const { formState } = useFormContext<T>();

  const isDarkMode = theme === "dark";

  const handlePhoneChange = (
    value: string,
    countryData: CountryData,
    onChange: (updatedValue: { countryCode: string; number: string }) => void
  ) => {
    const updatedValue = {
      countryCode: countryData?.countryCode || "",
      number: value || "",
    };

    onChange(updatedValue);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <div className="flex items-center justify-between">
            <FormLabel className="flex gap-x-2 text-primary text-xs">
              <span>{label}</span>
              {!isOptional && <span className="text-red-500">*</span>}
            </FormLabel>
          </div>
          <FormControl>
            <PhoneInput
              {...field}
              country={country || "ph"}
              value={field.value?.number || ""}
              containerClass="custom-phone-container"
              inputStyle={{
                fontSize: "0.875rem",
                height: "2.5rem",
                backgroundColor: isDarkMode
                  ? "hsl(var(--secondary))"
                  : "#efecff",
                border: formState.errors[name]
                  ? "1.5px solid #f87171"
                  : isDarkMode
                  ? "1.5px solid hsl(var(--secondary))"
                  : "1.5px solid #e4e8ee",
                borderRadius: 0,
                width: "100%",
              }}
              placeholder={placeholder}
              onChange={(value, countryData) =>
                handlePhoneChange(value, countryData, (updatedValue) =>
                  field.onChange(updatedValue)
                )
              }
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
