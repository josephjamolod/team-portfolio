import { GridBackgroundDemo } from "@/components/gridBackGround";
import { MainTitle } from "@/components/meet-the-team-components/MainTitle";
import { ThreeDCard } from "@/components/meet-the-team-components/ThreeDCard";
import React from "react";

export default function MeetTheTeam() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  pt-20">
      <GridBackgroundDemo />
      <MainTitle />
      <ThreeDCard />
    </div>
  );
}
