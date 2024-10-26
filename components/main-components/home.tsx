import Image from "next/image";
import frame from "@/public/assets/images/frame1.png";
import { Button } from "../ui/button";

export default function Home() {
  return (
    <div className=" w-full relative h-[500px] md:h-[700px] lg:h-[700px] overflow-hidden items-center px-20 flex  ">
      <div className="flex flex-col w-1/2  gap-y-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Android + iOS <br />
          <span className="text-black">mobile </span>
          <span className="font-light italic text-[#B071EC]">
            wireframe kit
          </span>
        </h1>
        <p className="w-4/5 leading-loose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
