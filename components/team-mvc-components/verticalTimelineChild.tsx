import Image, { StaticImageData } from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

interface VerticalTimelinePropType {
  isDarkMode: boolean;
  img: StaticImageData;
  label: string;
  description: string;
}

export default function VerticalTimelineChild({
  isDarkMode,
  img,
  label,
  description,
}: VerticalTimelinePropType) {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: isDarkMode ? "hsl(var(--secondary))" : "#EFECFF", // Dark gray for dark mode, light purple otherwise
        color: isDarkMode ? "#ffffff" : "#6652ee", // Text color for dark and light modes
        border: `solid 1.5px ${isDarkMode ? "#4b5563" : "#6652ee"}`,
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${
          isDarkMode ? "hsl(var(--secondary))" : "#6652ee"
        }`,
      }}
      date={<Image src={img} height={500} width={500} alt="mission" />}
      iconStyle={{
        background: isDarkMode ? "hsl(var(--secondary))" : "#fff",
        color: "#6652ee",
        border: "solid #6652ee ",
      }}
      icon={<FaCheckCircle />}
    >
      <h3 className="vertical-timeline-element-title font-bold text-4xl gradient-text dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
        {label}
      </h3>
      <p className="text-base lg:text-xl leading-loose tracking-wider text-primary">
        {description}
      </p>
    </VerticalTimelineElement>
  );
}
