import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <AuroraBackground>
      <div className="relative flex flex-col gap-4 items-center justify-center px-4">
        <h1 className="text-5xl md:text-9xl font-bold text-[#6652ee] text-center">
          404
        </h1>
        <h2 className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Page Not Found
        </h2>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-center italic">
          The page you are looking for does not exist, go back to the home page.
        </div>
        <Link href={"/"}>
          <Button className="hover:shadow-md dark:text-white" variant={"ghost"}>
            Go Back
          </Button>
        </Link>
      </div>
    </AuroraBackground>
  );
}
