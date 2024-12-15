"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import canva from "@/public/canva.svg";
import figma from "@/public/figma.svg";
import ps from "@/public/ps.svg";
import pr from "@/public/pr.svg";
import au from "@/public/au.svg";
import veed from "@/public/veed.svg";
import eleven from "@/public/eleven.svg";
import runway from "@/public/runway.svg";
import heygen from "@/public/heygen.svg";
import excel from "@/public/excel.svg";
import word from "@/public/word.svg";
import ppt from "@/public/ppt.svg";

enum Color {
  Primary = "text-black",
  Secondary = "text-white",
}

export interface ItemsType {
  title: string;
  titleColor: Color;
  color: string;
  description: React.JSX.Element;
}

const items: ItemsType[] = [
  {
    title: "Canva",
    titleColor: Color.Secondary,
    color: "  bg-gradient-to-b from-violet-500 via-violet-500 to-[#d88435]",
    description: <Image src={canva} alt="canva" height={150} width={150} />,
  },
  {
    title: "Figma",
    titleColor: Color.Secondary,
    color: " bg-gradient-to-b from-[#4840a3] via-[#4840a3] to-[#d114d1]",
    description: <Image src={figma} alt="figma" height={150} width={150} />,
  },
  {
    title: "Adobe Premiere Pro",
    titleColor: Color.Primary,
    color: " bg-gradient-to-b from-[#9cbbfc] via-[#9cbbfc] to-[#6c4cb8]",
    description: <Image src={pr} alt="pr" height={150} width={150} />,
  },

  {
    title: "Adobe Photoshop",
    titleColor: Color.Primary,
    color: " bg-gradient-to-b from-[#d8eff7] via-[#d8eff7] to-[#6c4cb8]",
    description: <Image src={ps} alt="ps" height={150} width={150} />,
  },
  {
    title: "Adobe Audition",
    titleColor: Color.Secondary,
    color: " bg-gradient-to-b from-[#293855] via-[#293855] to-[#2d4baf]",
    description: <Image src={au} alt="au" height={150} width={150} />,
  },
  {
    title: "Heygen",
    titleColor: Color.Primary,
    color: " bg-gradient-to-b from-cyan-500 via-cyan-500 to-[#2c44b1]",
    description: <Image src={heygen} alt="heygen" height={150} width={150} />,
  },
  {
    title: "Veed.io",
    titleColor: Color.Primary,
    color: "  bg-gradient-to-b from-[#f9cd6a] via-[#f9cd6a] to-[#d45d39]",
    description: <Image src={veed} alt="veed" height={150} width={150} />,
  },
  {
    title: "ElevenLabs",
    titleColor: Color.Primary,
    color: "  bg-gradient-to-b from-[#f1ac20] via-[#f1ac20] to-[#98e63e] ",
    description: <Image src={eleven} alt="eleven" height={150} width={150} />,
  },
  {
    title: "Runway",
    titleColor: Color.Primary,
    color: " bg-gradient-to-b from-[#c3e8c9] via-[#c3e8c9] to-[#3ec2d3] ",
    description: <Image src={runway} alt="runway" height={150} width={150} />,
  },
  {
    title: "Microsoft Excel",
    titleColor: Color.Secondary,
    color: " bg-gradient-to-b from-emerald-500 via-emerald-500 to-[#3e81e6]",
    description: <Image src={excel} alt="excel" height={150} width={150} />,
  },
  {
    title: "Microsoft PPT",
    titleColor: Color.Secondary,
    color: " bg-gradient-to-b from-orange-500 via-orange-500 to-[#ba6cda]",
    description: <Image src={ppt} alt="ppt" height={150} width={150} />,
  },
  {
    title: "Microsoft Word",
    titleColor: Color.Secondary,
    color: "bg-gradient-to-b from-[#4165d5] via-[#4165d5] to-[#293855]",
    description: <Image src={word} alt="word" height={150} width={150} />,
  },
];

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden  ",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className={`w-[120px] md:w-[200px] max-w-full ${item.color} relative rounded-2xl border-none dark:border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 `}
            // style={{
            //   background:
            //     "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            // }}
            key={item.title}
          >
            <blockquote className=" flex flex-col relative h-24 md:h-60">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span
                className={`flex-shrink relative z-20 text-sm font-semibold leading-[1.6] invisible md:visible ${item.titleColor} gray-100 `}
              >
                {item.title}
              </span>
              <div className="absolute flex flex-1 items-center justify-center h-full  w-full">
                {item.description}
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
