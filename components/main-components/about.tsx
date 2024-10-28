import Image from "next/image";
import frame from "@/public/assets/images/frame1.png";
import { Button } from "../ui/button";

export default function About() {
  return (
    <div className=" w-full relative h-[500px] md:h-[700px] lg:h-[700px] overflow-hidden items-center px-20 flex  ">
      <div className="flex flex-col w-1/2  gap-y-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          ABOUT US :<br />
          <span className="text-black">DOLOMAJ&#39;s </span>
          <span className="font-light italic text-[#B071EC]">services</span>
        </h1>
        <p className="w-4/5 leading-loose">
          Welcome to DOLOMAJs, your trusted partner in your business
          development. We specialize in providing comprehensive services that
          empower businesses to streamline their operations, enhance
          productivity, and achieve their strategic goals. Our expertise spans
          across various domains, including video editing, executive assistance,
          web design, lead generation, content writing, and social media
          management.
        </p>
        <div className="flex gap-x-2 w-3/4">
          <Button
            variant={"outline"}
            className="flex-1  border primary-button hover:text-[#7b3cb6]"
          >
            Our Portfolio
          </Button>
          <Button variant={"outline"} className="flex-1">
            Learn More
          </Button>
        </div>
      </div>
      <Image
        src={frame}
        className="absolute right-0 top-0"
        alt="frame"
        height={800}
        width={800}
      />
    </div>
  );
}
