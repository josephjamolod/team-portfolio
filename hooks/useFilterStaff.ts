import { Staff } from "@/components/searchPerson-components/SearchPerson";
import { useMemo } from "react";

export function useFilterStaff(
  staffs: Staff[] | undefined,
  searchQuery: string,
  selectedCategory: string
) {
  return useMemo(() => {
    return staffs?.filter((staff) => {
      const matchesSearch = staff.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "ALL" || staff.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [staffs, searchQuery, selectedCategory]);
}
