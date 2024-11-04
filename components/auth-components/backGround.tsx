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
        <div className="absolute backdrop-blur-md bg-white opacity-10 h-full w-full rounded-2xl" />
        <Image src={welcomeUser} alt="welcome user" height={300} width={300} />
      </div>
    </>
  );
}
