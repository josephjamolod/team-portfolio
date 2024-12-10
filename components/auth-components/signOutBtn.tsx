"use client";

import { GoSignOut } from "react-icons/go";

import { Button } from "../ui/button";

type SignOutBtnProps = {
  logOutUser: () => void;
  variant:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
};

export default function SignOutBtn({ variant, logOutUser }: SignOutBtnProps) {
  const handleSignOut = async () => {
    await logOutUser();
  };
  return (
    <Button
      className="w-full flex lg:justify-start lg:pl-12"
      variant={variant}
      onClick={handleSignOut}
    >
      <GoSignOut />
      <span> Sign Out</span>
    </Button>
  );
}
