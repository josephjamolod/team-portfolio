import * as React from "react";

import { SelectItem, SelectLabel } from "@/components/ui/select";

export const categories = [
  "ALL",
  "Content Writing",
  "Customer Support",
  "Executive Assistance",
  "Lead Generation",
  "Project Management",
  "Sales Support",
  "Social Media Management",
  "Video Editing",
  "Web Designer",
  "Web Development",
];

const newCategories = categories.filter((category) => category !== "ALL");

export function CategoryInput() {
  return (
    <>
      <SelectLabel>Categories</SelectLabel>
      {newCategories.map((category, index) => (
        <SelectItem key={index} value={category}>
          {category}
        </SelectItem>
      ))}
    </>
  );
}
