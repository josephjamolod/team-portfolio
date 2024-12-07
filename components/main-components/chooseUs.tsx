import { messages } from "@/contants";
import { HoverEffect } from "../ui/card-hover-effect";

export default function ChooseUs() {
  return (
    <div className="flex flex-col justify-center pt-5  px-10 md:px-20 3xl:px-60 ">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ">
        Why Choose Us
      </h1>
      <HoverEffect items={messages} />
    </div>
  );
}
