"use client";

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

import { GoTools } from "react-icons/go";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

enum Color {
  Primary = "text-black",
  Secondary = "text-white",
}

interface ItemsType {
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

export function AutoCarousel() {
  const plugin = React.useMemo(() => Autoplay({ delay: 1500 }), []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin]}
      className="w-full pt-2 md:pt-10 pb-5  mx-auto px-10 md:px-20 3xl:px-60"
    >
      <p className="flex items-center gap-x-4 text-lg font-bold py-1 pl-4">
        <GoTools className="text-4xl" />
        <span> SOFTWARE AND TOOLS</span>
      </p>

      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/3  lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 pt-4 h-full shadow-lg"
          >
            <div
              className={`${item.color} ${item.titleColor} flex flex-col  items-center justify-between rounded-lg p-4 h-[150px] sm:h-[200px] md:h-[300px] transition-transform duration-300 hover:scale-110 cursor-pointer`}
            >
              <p className="hidden md:flex flex-shrink font-semibold text-center">
                {item.title}
              </p>
              <span className="flex flex-grow "> {item.description}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <p className="  pt-8 leading-none text-[18px] font-semibold md:font-normal md:text-[36px] lg:text-[56px]">
        Find verified experts from top tools.
      </p>
    </Carousel>
  );
}
