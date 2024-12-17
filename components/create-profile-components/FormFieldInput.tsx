import React from "react";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface FormFieldInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type?: string;
  label: string;
  placeholder: string;
  className?: string;
  optional: boolean;
}

const FormFieldInput = <T extends FieldValues>({
  control,
  name,
  type = "text",
  label,
  placeholder,
  className = "",
  optional,
}: FormFieldInputProps<T>) => {
  const { formState } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <div className="flex items-center justify-between">
            <FormLabel className="flex gap-x-2 text-primary text-xs">
              <span> {label}</span>
              {!optional && <span className="text-red-500">*</span>}
            </FormLabel>
          </div>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`text-xs h-10 rounded-none bg-[#efecff] dark:bg-secondary focus:outline-none focus:border-[#b071ec] ${
                formState.errors[name] && "border-red-500"
              } ${className}`}
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

export default FormFieldInput;
