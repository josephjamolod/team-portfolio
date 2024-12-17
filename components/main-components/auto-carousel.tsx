"use client";

import { GoTools } from "react-icons/go";
import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function AutoCarousel() {
  return (
    <div className="w-full pt-2 md:pt-10 pb-5  mx-auto px-10 md:px-20 3xl:px-60">
      <p className="flex items-center gap-x-4 text-lg font-bold py-1 pl-4">
        <GoTools className="text-4xl" />
        <span> SOFTWARE AND TOOLS</span>
      </p>
      <div className=" rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards direction="right" speed="slow" />
      </div>
      <p className="  md:pt-8 pt-2 leading-none text-[18px] font-semibold md:font-normal md:text-[36px] lg:text-[56px]">
        Find verified experts from top tools.
      </p>
    </div>
  );
}
