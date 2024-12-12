"use client";

// import logo from "@/public/assets/images/logo.png";

import { Button } from "@/components/ui/button";
import { LuBellRing } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { IoShieldHalf } from "react-icons/io5";
import Social from "../footer-components/social";
import Link from "next/link";
import SearchBar from "./searchBar";

import SignOutBtn from "../auth-components/signOutBtn";
import React from "react";
import { UserAndLogOutUserType } from "../main-components/profileDropdown";
import Logo from "../logo";

export function Menu({
  user,
  logOutUser,
  isOldDataPresent,
}: UserAndLogOutUserType) {
  // const { user, logOutUser } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>

      <SheetContent className="py-8">
        {!user && <Logo size="text-2xl" />}
        <SheetHeader className={`${user ? "flex" : "hidden"}`}>
          <SheetTitle className="flex items-center justify-center gap-x-2">
            Reminder
            <LuBellRing />
          </SheetTitle>
          <SheetDescription>
            Keep your profile descriptive, professional, and creative to make a
            strong impression and stand out!
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-6 mb-2 mx-2">
          <SearchBar />

          <DropdownMenuSeparator />

          <Link href={"/"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              Home
            </SheetTrigger>
          </Link>
          <Link href={"/#services"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              Services
            </SheetTrigger>
          </Link>
          <Link href={"/connect"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              Connect
            </SheetTrigger>
          </Link>

          <Link href={"/meet-the-team"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              Meet The Team
            </SheetTrigger>
          </Link>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {user ? (
              <div className="w-full flex flex-col gap-y-4">
                {" "}
                {user && (
                  <Link href={"/create-profile"}>
                    <Button className="w-full   " variant={"default"}>
                      <IoSettingsOutline />
                      {isOldDataPresent ? "Update Profile" : "Create Profile"}
                    </Button>
                  </Link>
                )}
                <SignOutBtn logOutUser={logOutUser} variant="default" />
              </div>
            ) : (
              <Social cn="text-2xl" />
            )}
          </SheetClose>
        </SheetFooter>

        {!user && (
          <div className="flex flex-col gap-y-2 pt-4">
            <label className="text-[#b071ec] text-xs">Staff Only</label>
            <Link href={"/login"}>
              <SheetTrigger className="gap-x-2 border text-[#b071ec] hover:text-[#b071ec] border-[#b071ec] rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
                <IoShieldHalf />
                Sign In
              </SheetTrigger>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
