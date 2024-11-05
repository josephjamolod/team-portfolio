import Image from "next/image";
import frame from "@/public/assets/images/frame1.png";
import { Button } from "../ui/button";

export default function About() {
  return (
    <div
      id="about-us"
      className="w-full relative  overflow-hidden pt-20 md:pt-40 px-10 md:px-20 flex lg:pb-20 "
    >
      <div className="flex flex-col w-full lg:w-1/2 z-10 gap-y-5 md:gap-y-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          ABOUT US :<br />
          <span className="text-black">DOLOMAJ&#39;s </span>
          <span className="font-light italic text-[#5139edb5]">services</span>
        </h1>
        <p className="w-4/5 font-medium leading-loose">
          Welcome to DOLOMAJs, your trusted partner in your business
          development. We specialize in providing comprehensive services that
          empower businesses to streamline their operations, enhance
          productivity, and achieve their strategic goals. Our expertise spans
          across various domains, including video editing, executive assistance,
          web design, lead generation, content writing, and social media
          management.
        </p>
        <div className="flex gap-x-2 w-full md:w-3/4">
          <Button
            variant={"outline"}
            className="flex-1  primary-button hover:bg-[#5139edb5] hover:text-white transition-colors duration-300"
          >
            Our Portfolio
          </Button>
          <Button variant={"outline"} className="flex-1 hover:text-[#5139edb5">
            Learn More
          </Button>
        </div>
      </div>
      <Image
        src={frame}
        className="absolute right-0 top-0 hidden lg:flex"
        alt="frame"
        height={800}
        width={800}
      />
    </div>
  );
}
