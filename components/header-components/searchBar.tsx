import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar() {
  return (
    <span className="bg-secondary text-primary hover:border-transparent px-6 h-11 border border-[#6434d3] rounded-full w-full flex items-center justify-center transition-all duration-300 hover:bg-transparent">
      <IoSearchOutline className="mx-2 text-2xl font-bold" />
      <span className="pr-0 xl:pr-12 text-sm md:text-base lg:text-lg font-semibold">
        Explore Network Talent
      </span>
    </span>
  );
}
