import welcomeUser from "@/public/assets/images/welcomeUser.png";
import Image from "next/image";

export default function BackGround({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <p className="text-xl flex-col flex items-center">
        <span> Welcome back!</span>
        <span>opportunities are waiting for you.</span>
      </p>
      <div className=" relative">
        <div className="absolute backdrop-blur-md bg-white z-10 opacity-10 h-full w-full rounded-2xl" />
        <div className="h-[330px] w-[300px]">
          <Image
            src={welcomeUser}
            alt="welcome user"
            sizes="(max-width: 768px) 100vw, 100vw"
            fill
          />
        </div>
      </div>
    </>
  );
}
