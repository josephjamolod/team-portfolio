"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function MainTitle() {
  const words = [
    {
      text: "Meet",
    },
    {
      text: "DOLOMAJ'S",
      className: "text-[#624ced] dark:text-[#624ced] ",
    },
    {
      text: "Team",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center   ">
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link
          href={"/connect"}
          className="w-40 h-10 rounded-xl flex items-center justify-center bg-black border dark:border-white border-transparent text-white text-sm"
        >
          Connect Now
        </Link>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Learn More
        </button>
      </div>
    </div>
  );
}
