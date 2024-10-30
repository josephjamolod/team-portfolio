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

export default function ProfileDropdown() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border rounded-full border-[#b071ec]">
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
              <p>Log In as User</p>
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
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="bottom" className="cursor-pointer">
            <Link href={"/login"}> Sign In</Link>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
