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
import { LuArrowUpRightSquare } from "react-icons/lu";

import { DropdownMenuSeparator } from "../ui/dropdown-menu";

export default function Test() {
  return (
    <main
      id="services"
      className="flex flex-col justify-center py-5 md:py-10 gap-y-10 md:gap-y-20 px-10 md:px-20 3xl:px-60"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Our Services
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8  ">
        {services.map((service, index) => (
          <div
            className="border bg-[#efecff]  p-8 rounded-3xl border-[#624ced] gradient-border-none-rounded "
            key={index}
          >
            <div className="flex justify-between text-[#624ced] h-auto w-full">
              <h1 className=" font-bold  text-4xl bg-gradient-to-r from-[#7d6de4] to-[#624ced] bg-clip-text text-transparent">
                {service.name}
              </h1>
              <Link
                className="text-3xl block scale-100 hover:scale-110 transform transition-transform duration-300 bg-transparent "
                href={"/"}
              >
                <LuArrowUpRightSquare />
              </Link>
            </div>
            <DropdownMenuSeparator className="bg-primary mt-4" />
            <p className="md:py-8 text-lg font-normal lg:text-xl leading-loose tracking-wider block text-primary">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
