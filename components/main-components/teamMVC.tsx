"use client";

import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import commitment from "@/public/assets/images/commitment.png";
import mission from "@/public/assets/images/mission.png";
import vision from "@/public/assets/images/vision.png";

import { useTheme } from "next-themes";

// import VerticalTimelineChild from "../team-mvc-components/verticalTimelineChild";

import dynamic from "next/dynamic";

const VerticalTimelineChild = dynamic(
  () => import("../team-mvc-components/verticalTimelineChild"),
  {
    ssr: false,
  }
);

export default function TeamMVC() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="pb-10">
      <VerticalTimeline>
        <VerticalTimelineChild
          isDarkMode={isDarkMode}
          img={mission}
          label="Our Mission"
          description="At DOLOMAJs, our mission is to deliver top-notch online services
            that drive efficiency and innovation for our clients. We are
            dedicated to understanding your unique needs and providing
            customized solutions that add value to your business."
        />
        <VerticalTimelineChild
          isDarkMode={isDarkMode}
          img={vision}
          label=" Our Vision"
          description="Our vision is to provide our partners with online solutions, known
            for our commitment to quality, reliability, and excellence. We aim
            to foster long-term partnerships with our clients, helping them to
            succeed in an ever-evolving business landscape."
        />
        <VerticalTimelineChild
          isDarkMode={isDarkMode}
          img={commitment}
          label="Our Commitment"
          description="We are committed to delivering high-quality business solutions that
            exceed your expectations. Whether you need support with a single
            project or ongoing services, DOLOMAJs is here to help you succeed."
        />
      </VerticalTimeline>
    </div>
  );
}
