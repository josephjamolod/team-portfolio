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

export default function TeamMVC() {
  return (
    <div className="pb-10">
      <VerticalTimeline>
        <VerticalTimelineElement
          contentStyle={{
            background: "#EFECFF",
            color: "#b075eb",
            border: "solid #b075eb",
          }}
          contentArrowStyle={{ borderRight: "7px solid #b075eb" }}
          date={<Image src={mission} height={500} width={500} alt="mission" />}
          iconStyle={{
            background: "#fff",
            color: "#b075eb",
            border: "solid #b075eb",
          }}
          icon={<FaCheckCircle />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-4xl bg-gradient-to-r from-[#7860BC] to-[#9880DC] bg-clip-text text-transparent">
            Our Mission
          </h3>
          <p className="text-black">
            At DOLOMAJs, our mission is to deliver top-notch online services
            that drive efficiency and innovation for our clients. We are
            dedicated to understanding your unique needs and providing
            customized solutions that add value to your business.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          contentStyle={{
            background: "#EFECFF",
            color: "#b075eb",
            border: "solid #b075eb",
          }}
          contentArrowStyle={{ borderRight: "7px solid #b075eb" }}
          date={<Image src={vision} height={500} width={500} alt="vision" />}
          iconStyle={{
            background: "#fff",
            color: "#b075eb",
            border: "solid #b075eb",
          }}
          icon={<FaCheckCircle />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-4xl bg-gradient-to-r from-[#7860BC] to-[#9880DC] bg-clip-text text-transparent">
            Our Vision
          </h3>
          <p className="text-black">
            Our vision is to provide our partners with online solutions, known
            for our commitment to quality, reliability, and excellence. We aim
            to foster long-term partnerships with our clients, helping them to
            succeed in an ever-evolving business landscape.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          contentStyle={{
            background: "#EFECFF",
            color: "#b075eb",
            border: "solid #b075eb",
          }}
          contentArrowStyle={{ borderRight: "7px solid #b075eb" }}
          date={
            <Image src={commitment} height={500} width={500} alt="commitment" />
          }
          iconStyle={{
            background: "#fff",
            color: "#b075eb",
            border: "solid #b075eb",
          }}
          icon={<FaCheckCircle />}
        >
          <h3 className="vertical-timeline-element-title font-bold text-4xl bg-gradient-to-r from-[#7860BC] to-[#9880DC] bg-clip-text text-transparent">
            Our Commitment
          </h3>
          <p className="text-black">
            We are committed to delivering high-quality business solutions that
            exceed your expectations. Whether you need support with a single
            project or ongoing services, DOLOMAJs is here to help you succeed.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}
