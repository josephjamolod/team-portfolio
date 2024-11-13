interface whyChooseUsTpye {
  text: string;
  description: string;
}

const messages: whyChooseUsTpye[] = [
  {
    text: "Expert Team:",
    description:
      "Our team comprises experienced professionals who are passionate about delivering excellence in every project.",
  },
  {
    text: "Customized Solutions:",
    description:
      "We tailor our services to meet your specific requirements, ensuring optimal results and satisfaction.",
  },
  {
    text: "Innovative Approach:",
    description:
      "We leverage the latest tools and technologies to provide cutting-edge solutions that keep you ahead of the competition.",
  },
  {
    text: "Customer-Centric:",
    description:
      "Our clients are at the heart of everything we do. We prioritize your needs and work collaboratively to achieve your goals.",
  },
];

export default function ChooseUs() {
  return (
    <div
      id="why-choose-us"
      className="flex flex-col justify-center  pb-10 gap-y-10 px-10 md:px-20 3xl:px-60"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ">
        Why Choose Us?
      </h1>
      <ul className="text-xl list-disc list-inside space-y-2   flex flex-col gap-y-2 w-full ">
        {messages.map((message, index) => {
          return (
            <li
              key={index}
              className="text-[#b071ec] bg-[#efecff] border border-[#624ced] rounded-xl p-8 flex flex-col gap-y-2"
            >
              <span className="font-bold  text-4xl bg-gradient-to-r from-[#7d6de4] to-[#624ced] bg-clip-text text-transparent">
                {message.text}{" "}
              </span>
              <span className="text-lg font-normal lg:text-xl leading-loose tracking-wider block text-black">
                {message.description}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
