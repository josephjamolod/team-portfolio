"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { signOutHandler } from "@/src/lib/firebase/config/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type SignOutBtnProps = {
  position: string; // or simply `string` if it can be any string
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  router: AppRouterInstance;
};

export default function SignOutBtn({
  position,
  setPosition,
  router,
}: SignOutBtnProps) {
  const handleSignOut = async () => {
    await signOutHandler();
    router.push("/login");
  };
  return (
    <DropdownMenuRadioGroup
      onClick={handleSignOut}
      value={position}
      onValueChange={setPosition}
    >
      <DropdownMenuRadioItem value="bottom" className="cursor-pointer">
        Sign Out
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}
