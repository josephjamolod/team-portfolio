"use client";

import * as React from "react";

import { IoSettingsOutline, IoShieldHalf } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface UserAndLogOutUserType {
  user: User | null;
  logOutUser: () => void;
  isOldDataPresent: boolean | undefined;
}

export default function ProfileDropdown({
  user,
  logOutUser,
  isOldDataPresent,
}: UserAndLogOutUserType) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" rounded-full ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-[4px] gradient-bg rounded-full dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
              </div>
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

        <div className="flex flex-col gap-y-1">
          {user && (
            <Link href={"/create-profile"}>
              <Button
                className="w-full flex justify-start pl-12"
                variant={"outline"}
              >
                <IoSettingsOutline />
                {isOldDataPresent ? "Update Profile" : "Create Profile"}
              </Button>
            </Link>
          )}

          {user ? (
            <SignOutBtn logOutUser={logOutUser} variant="outline" />
          ) : (
            <Link href={"/login"}>
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem
                  value="bottom"
                  className="cursor-pointer"
                >
                  Sign In
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </Link>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
