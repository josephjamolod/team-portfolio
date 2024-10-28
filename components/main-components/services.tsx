interface servicesType {
  name: string;
  description: string;
}

const services: servicesType[] = [
  {
    name: "Video Editing",
    description:
      "Our skilled editors bring your vision to life with professional video editing services that captivate and engage your audience.",
  },
  {
    name: "Executive Assistance",
    description:
      "From managing schedules to coordinating tasks, our executive assistants ensure seamless support for your leadership team.",
  },
  {
    name: "Web Design",
    description:
      "We create visually appealing and user-friendly websites that enhance your online presence and drive business growth.",
  },
  {
    name: "Lead Generation",
    description:
      "Our lead generation experts help you identify and connect with potential customers, boosting your sales pipeline and revenue.",
  },
  {
    name: "Content Writing",
    description:
      "Our talented writers craft compelling content that resonates with your audience and strengthens your brand message.",
  },
  {
    name: "Social Media Management",
    description:
      "We manage your social media platforms with strategic content and engagement tactics to grow your online community and drive interaction",
  },
];

import Link from "next/link";
import { PiArrowCircleUpRightDuotone } from "react-icons/pi";

export default function Services() {
  return (
    <main
      id="services"
      className="flex flex-col justify-center  py-10 gap-y-10 px-20"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Our Services
      </h1>
      <div className="grid grid-cols-2 gap-4    ">
        {services.map((service, index) => (
          <div
            className="border border-[#b071ec] rounded-xl p-4 flex flex-col gap-y-2"
            key={index}
          >
            <div className="flex justify-between items-center">
              <h1 className=" font-bold text-4xl bg-gradient-to-r from-[#7860BC] to-[#9880DC] bg-clip-text text-transparent">
                {service.name}
              </h1>
              <Link href={"/"}>
                <PiArrowCircleUpRightDuotone className="text-4xl text-[#b071ec] hover:text-[#7b3cb6] transition-colors duration-300" />
              </Link>
            </div>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
