import { Button } from "../ui/button";
import { Orbit } from "../orbit";

export default function About() {
  return (
    <div
      id="about-us"
      className="w-full z-10 relative  overflow-hidden pt-28 pb-5 md:pt-40 px-10 md:px-20 3xl:px-60 flex  "
    >
      <div className="flex flex-col space-y-10 justify-center flex-1 ">
        <div className="text-4xl flex flex-col gap-y-5 md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-primary text-5xl md:text-7xl font-semibold">
            DOLOMAJ&#39;s{" "}
            <span className="font-light text-5xl md:text-7xl italic  gradient-text dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
              services.
            </span>
          </span>
          <p className="leading-none text-[30px] md:text-[40px] 2xl:text-[56px]">
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

          <Button
            className="rounded-full flex-1 text-white hover:text-white bg-[#6652ee] hover:bg-[#5139edb5]  h-11 text-base leading-[1.8em] md:h-14 transition-colors duration-300"
            variant={"outline"}
          >
            Learn More
          </Button>
        </div>
      </div>
      <div className="hidden xl:flex flex-1">
        <Orbit />
      </div>
      {/* <Image
        src={frame}
        className="absolute right-0 top-0 hidden xl:flex"
        alt="frame"
        height={900}
        width={900}
      /> */}
    </div>
  );
}
