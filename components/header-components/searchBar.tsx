import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ margin }: { margin: string }) {
  return (
    <div
      className={`w-full border flex  py-2 h-9  border-[#624ced]  rounded-full  items-center text-center bg-[#EFECFF] ${margin}`}
    >
      <IoSearchOutline className="mx-3 text-2xl text-[#624ced]" />
      <input
        placeholder="Search Gallery Feed"
        className="bg-transparent  w-full h-4 text-sm outline-none "
        type="text"
      />
    </div>
  );
}
