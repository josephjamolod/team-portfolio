import Image from "next/image";
import React from "react";
import logo from "@/public/assets/images/logo.png";

export const SocialActions: React.FC = () => {
  return (
    <div className="px-6 py-4 space-y-2 flex flex-col items-center justify-center">
      <Image src={logo} height={150} width={150} alt="logo" />
      <p className="w-full py-2 px-4  text-sm text-center  text-gray-700 flex items-center justify-center gap-2">
        <span className="text-xl">© </span>
        <span className="pt-[2px]"> 2024 DOLOMAJ. All Right Reserved.</span>
      </p>
    </div>
  );
};
