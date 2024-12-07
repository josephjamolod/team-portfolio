import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ margin }: { margin: string }) {
  return (
    <Link
      href={"/search-person"}
      className={` flex py-2 h-11 gap-x-2 px-2 xl:px-4 items-center  double-gradient-border border  text-center border-[#8676eeb5]  font-ubuntu text-primary font-semibold text-lg leading-[1.8em]   ${margin}`}
    >
      <div className="flex items-center scale-90 hover:scale-100 transform transition-transform duration-300 ">
        <IoSearchOutline className="mx-2 text-2xl " />
        <span className="pr-0 xl:pr-12 "> Search Person </span>
      </div>
    </Link>
  );
}
