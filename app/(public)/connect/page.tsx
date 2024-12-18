import Loading from "@/app/loading";
import { AnimatedText } from "@/components/connect-components/animatedText";
import { WorldMapDemo } from "@/components/connect-components/worldMapDemo";

import React, { Suspense } from "react";

export default function Connect() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen w-full bg-white dark:bg-black">
        <WorldMapDemo>
          <div className="max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
            <p className="font-bold text-xl md:text-4xl dark:text-white text-[#6434d3]">
              Remote{" "}
              <span className="text-primary">
                <AnimatedText />
              </span>
            </p>
            <p className="text-sm md:text-lg text-neutral-500 dark:text-muted-foreground max-w-2xl mx-auto p-4">
              <span className="block">
                Plan to connect your business remotely? DOLOMAJ is your best
                choice!
              </span>
              <span className="block">Book a 30 min meeting now.</span>
            </p>
          </div>
        </WorldMapDemo>
      </div>
    </Suspense>
  );
}
