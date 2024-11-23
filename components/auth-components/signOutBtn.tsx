"use client";

import { signOutHandler } from "@/src/lib/firebase/config/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "../ui/button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { User } from "@/providers/userProvider";

type SignOutBtnProps = {
  logOutUser: () => void;
  // router: AppRouterInstance;
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
    // await signOutHandler();
    await logOutUser();
  };
  return (
    <Button className="w-full" variant={variant} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
