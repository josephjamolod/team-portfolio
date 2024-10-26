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

export default function Services() {
  return (
    <main className="flex flex-col justify-center items-center py-5 gap-y-5 px-20">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Our Services
      </h1>
      <div className="grid grid-cols-2 gap-4    ">
        {services.map((service, index) => (
          <div
            className="border border-[#CAC2FF] rounded-xl p-4 flex flex-col gap-y-2"
            key={index}
          >
            <h1 className=" font-bold text-4xl bg-gradient-to-r from-[#7860BC] to-[#9880DC] bg-clip-text text-transparent">
              {service.name}
            </h1>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
