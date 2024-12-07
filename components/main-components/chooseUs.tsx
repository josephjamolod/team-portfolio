import { messages } from "@/contants";

export default function ChooseUs() {
  return (
    <div
      id="why-choose-us"
      className="flex flex-col justify-center py-5 md:py-10 gap-y-10 md:gap-y-20 px-10 md:px-20 3xl:px-60"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ">
        Why Choose Us?
      </h1>
      <ul className="text-xl list-disc list-inside space-y-2   flex flex-col gap-y-4 w-full ">
        {messages.map((message, index) => {
          return (
            <li
              key={index}
              className="text-[#b071ec] bg-[#efecff] border border-[#624ced] rounded-xl p-8 flex flex-col gap-y-2"
            >
              <span className="font-bold  text-4xl bg-gradient-to-r from-[#7d6de4] to-[#624ced] bg-clip-text text-transparent">
                {message.text}{" "}
              </span>
              <span className="text-lg font-normal lg:text-xl leading-loose tracking-wider block text-primary">
                {message.description}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
