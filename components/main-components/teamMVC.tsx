"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaCheckCircle } from "react-icons/fa"; // Sample icon for events
import commitment from "@/public/assets/images/commitment.png";
import mission from "@/public/assets/images/mission.png";
import vision from "@/public/assets/images/vision.png";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function TeamMVC() {
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";
  return (
    <div className="pb-10">
      <VerticalTimeline>
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
          date={<Image src={mission} height={500} width={500} alt="mission" />}
          iconStyle={{
            background: isDarkMode ? "hsl(var(--secondary))" : "#fff",
            color: "#6652ee",
            border: "solid #6652ee ",
          }}
          icon={<FaCheckCircle />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-4xl gradient-text dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
            Our Mission
          </h3>
          <p className="text-base lg:text-xl leading-loose tracking-wider text-primary">
            At DOLOMAJs, our mission is to deliver top-notch online services
            that drive efficiency and innovation for our clients. We are
            dedicated to understanding your unique needs and providing
            customized solutions that add value to your business.
          </p>
        </VerticalTimelineElement>
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
          date={<Image src={vision} height={500} width={500} alt="mission" />}
          iconStyle={{
            background: isDarkMode ? "hsl(var(--secondary))" : "#fff",
            color: "#6652ee",
            border: "solid #6652ee ",
          }}
          icon={<FaCheckCircle />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-4xl gradient-text dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
            Our Vision
          </h3>
          <p className="text-base lg:text-xl leading-loose tracking-wider text-primary">
            Our vision is to provide our partners with online solutions, known
            for our commitment to quality, reliability, and excellence. We aim
            to foster long-term partnerships with our clients, helping them to
            succeed in an ever-evolving business landscape.
          </p>
        </VerticalTimelineElement>
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
          date={
            <Image src={commitment} height={500} width={500} alt="mission" />
          }
          iconStyle={{
            background: isDarkMode ? "hsl(var(--secondary))" : "#fff",
            color: "#6652ee",
            border: "solid #6652ee ",
          }}
          icon={<FaCheckCircle />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-4xl gradient-text dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
            Our Commitment
          </h3>
          <p className="text-base lg:text-xl leading-loose tracking-wider text-primary">
            We are committed to delivering high-quality business solutions that
            exceed your expectations. Whether you need support with a single
            project or ongoing services, DOLOMAJs is here to help you succeed.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}
