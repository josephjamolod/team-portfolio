"use client";

import { signOutHandler } from "@/src/lib/firebase/config/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "../ui/button";

type SignOutBtnProps = {
  router: AppRouterInstance;
  variant:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
};

export default function SignOutBtn({ router, variant }: SignOutBtnProps) {
  const handleSignOut = async () => {
    await signOutHandler();
    router.push("/login");
  };
  return (
    <Button className="w-full" variant={variant} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
