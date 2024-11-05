import BackGround from "@/components/auth-components/backGround";
import { LogInForm } from "@/components/auth-components/loginForm";
import Image from "next/image";

//font
import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
export const fonts = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["600"],
});

//pngs
import purpleBG from "@/public/assets/images/purpleBG.png";

export default function LogInPage() {
  return (
    <main className="flex justify-center  min-h-screen p-4 overflow-hidden">
      <div className="flex  h-auto  max-w-[900px] w-full max-h-[583px] mt-20 rounded-md relative ">
        <div className="absolute h-12 w-12 bg-[#ffff] border shadow-xl -left-5  -top-4 rounded-full" />
        <div className="absolute h-12 w-12 bg-gradient-to-r from-[#988ce6] to-[#624ced] border shadow-2xl -right-5  -bottom-4 rounded-full" />
        <div className=" w-full absolute h-full object-cover ">
          <Image
            src={purpleBG}
            alt="back-ground"
            className="h-full rounded-md"
            fill
          />
        </div>

        <div className="z-10 hidden md:flex flex-1 flex-col gap-y-4 items-center justify-center  rounded-md overflow-hidden text-white">
          <BackGround>
            <h1 className={cn(fonts.className, "text-5xl font-black pt-0 ")}>
              Sign In
            </h1>
          </BackGround>
        </div>
        <div className="flex flex-1 items-center justify-center z-10">
          <LogInForm>
            <h1 className={cn(fonts.className, "text-3xl font-black pt-0 ")}>
              Log In Here
            </h1>
          </LogInForm>
        </div>
      </div>
    </main>
  );
}
