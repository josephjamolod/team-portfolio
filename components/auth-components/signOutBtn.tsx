"use client";

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
    <Button className="w-full" variant={variant} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
