"use client";

import * as React from "react";

import { IoShieldHalf } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import memoji from "@/public/assets/images/memoji.png";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import SignOutBtn from "../auth-components/signOutBtn";
import { User } from "@/providers/userProvider";
import { Button } from "../ui/button";

export interface UserAndLogOutUserType {
  user: User | null;
  logOutUser: () => void;
}

export default function ProfileDropdown({
  user,
  logOutUser,
}: UserAndLogOutUserType) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-2 rounded-full border-[#8676eeb5] double-gradient-border focus:outline-[#8676eeb5] ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src={memoji}
                alt="profile"
                width={45}
                height={45}
                className="bg-[#EFECFF] rounded-full cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Log In as User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-[#b071ec] flex items-center gap-x-2">
          <span className="text-2xl">
            <IoShieldHalf />
          </span>
          Staff Only
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href={"/create-profile"}>
          <Button className="w-full   " variant={"outline"}>
            Create Profile
          </Button>
        </Link>

        {user ? (
          <SignOutBtn logOutUser={logOutUser} variant="outline" />
        ) : (
          <Link href={"/login"}>
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="bottom" className="cursor-pointer">
                Sign In
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
