import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar() {
  return (
    <Link
      href={"/search-person"}
      className="flex items-center gradient-bg justify-center dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400 border-0
       rounded-full text-white text-lg max-w-full min-w-[140px] p-[4px] whitespace-nowrap cursor-pointer transition-transform duration-300 hover:outline-none active:scale-90"
    >
      <span className="bg-secondary text-primary hover:border-transparent px-6 h-11 border border-[#6434d3] rounded-full w-full flex items-center justify-center transition-all duration-300 hover:bg-transparent">
        <IoSearchOutline className="mx-2 text-2xl font-bold" />
        <span className="pr-0 xl:pr-12 text-base font-semibold">
          Search Person
        </span>
      </span>
    </Link>
  );
}
