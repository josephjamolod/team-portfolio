import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ margin }: { margin: string }) {
  return (
    <button
      type="button"
      className={` flex py-2 h-11 gap-x-2 lg:px-4 items-center  double-gradient-border border  text-center border-[#8676eeb5]  font-ubuntu text-primary font-semibold text-lg leading-[1.8em]   ${margin}`}
    >
      <div className="flex items-center scale-90 hover:scale-100 transform transition-transform duration-300 ">
        <IoSearchOutline className="mx-3 text-2xl " />
        <span className="lg:pr-12 "> Search Person </span>
      </div>
    </button>
    // <button className="double-gradient-border border text-center border-[#624ced] font-ubuntu text-primary font-bold text-base leading-[1.8em]  ">
    //   Button Text
    // </button>
  );
}
