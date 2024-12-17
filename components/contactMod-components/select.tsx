import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

export function SelectDemo(
  field: ControllerRenderProps<
    {
      subject: string;
      message: string;
      email: string;
    },
    "subject"
  >
) {
  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-[180px] dark:border-muted-foreground">
        <SelectValue placeholder="Select a concern" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup {...field}>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem value="request_account">Request for Account</SelectItem>
          <SelectItem value="forgot_password">Forgot Password</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
