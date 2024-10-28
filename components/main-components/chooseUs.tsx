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
      className="flex flex-col justify-center  pb-10 gap-y-10 "
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-20">
        Why Choose Us?
      </h1>
      <ul className="text-xl list-disc list-inside space-y-2  p-4 flex flex-col gap-y-2 w-full px-20">
        {messages.map((message, index) => {
          return (
            <li
              key={index}
              className="text-[#b071ec] border border-[#b071ec] rounded-xl p-8 flex flex-col gap-y-2"
            >
              <span className="font-bold text-4xl bg-gradient-to-r from-[#7860BC] to-[#9880DC] bg-clip-text text-transparent">
                {message.text}{" "}
                <span className="font-normal text-lg text-black">
                  {message.description}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
