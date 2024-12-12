import Image from "next/image";
import frame from "@/public/assets/images/frame1.png";
import { Button } from "../ui/button";

export default function About() {
  return (
    <div
      id="about-us"
      className="w-full relative  overflow-hidden pt-28 pb-5 md:pt-40 px-10 md:px-20 3xl:px-60 flex lg:pb-20 "
    >
      <div className="flex flex-col  w-full xl:w-1/2 z-10 gap-y-5 md:gap-y-10">
        <div className="text-4xl flex flex-col gap-y-5 md:text-5xl lg:text-6xl font-bold leading-tight">
          {/* ABOUT US :<br /> */}
          <span className="text-primary text-5xl md:text-7xl font-semibold">
            DOLOMAJ&#39;s{" "}
            <span className="font-light text-5xl md:text-7xl italic  gradient-text dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
              services.
            </span>
          </span>

          <p className="leading-none text-[30px] md:text-[56px]">
            Welcome to{" "}
            <span className=" gradient-text dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
              {" "}
              DOLOMAJs
            </span>
            ,
            <span className="block md:inline-block">
              {" "}
              Your trusted partner
            </span>{" "}
            in your business development.
            <span className="block"></span>
            {/* We specialize in providing comprehensive services that
            empower businesses to streamline their operations, enhance
            productivity, and achieve their strategic goals. Our expertise spans
            across various domains, including video editing, executive
            assistance, web design, lead generation, content writing, and social
            media management. */}
          </p>
        </div>

        <div className="flex pt-2 gap-x-4 w-full md:w-3/4">
          <Button
            variant={"outline"}
            className="flex flex-1 items-center gradient-bg justify-center dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400 border-0
       rounded-full text-white text-lg max-w-full p-[4px] whitespace-nowrap cursor-pointer h-12 md:h-14 transition-transform duration-300 hover:outline-none active:scale-90"
          >
            <span className="bg-secondary text-primary hover:border-transparent px-6  border border-[#6434d3] h-10 md:h-12  rounded-full w-full flex items-center justify-center transition-all duration-300 hover:bg-transparent">
              Our Portfolio
            </span>
          </Button>
          {/* <Button
            variant={"outline"}
            className="flex-1 border border-[#5139ed]  double-gradient-border text-lg md:text-xl  h-12 md:h-14 hover:bg-[#efecff] "
          >
            <span className=" w-full h-full flex items-center justify-center scale-100 hover:scale-110 transform transition-transform duration-300 ">
              {" "}
              Our Portfolio
            </span>
          </Button> */}
          <Button
            className="rounded-full flex-1 text-white hover:text-white bg-[#6652ee] hover:bg-[#5139edb5]  h-11 text-base leading-[1.8em] md:h-14 transition-colors duration-300"
            variant={"outline"}
            // className="flex-1 hover:border-[#5139edb5] text-lg md:text-xl hover:text-[#5139ed] hover:bg-[#efecff] bg-[#5139edb5] text-secondary  rounded-full h-11 md:h-14"
          >
            Learn More
          </Button>
        </div>
      </div>
      <Image
        src={frame}
        className="absolute right-0 top-0 hidden xl:flex"
        alt="frame"
        height={900}
        width={900}
      />
    </div>
  );
}
