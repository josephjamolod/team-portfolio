"use client";
// import WorldMap from "@/components/ui/world-map";

import { Calendly } from "./calendly";

import dynamic from "next/dynamic";

import { dots } from "@/contants";

const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
});

export function WorldMapDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className=" py-40 dark:bg-black bg-white fixed w-full">
      {children}
      <div className="place-self-center">
        <Calendly />
      </div>
      <WorldMap dots={dots} />
    </div>
  );
}
