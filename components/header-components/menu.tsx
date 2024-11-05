import logo from "@/public/assets/images/logo.png";

import { Button } from "@/components/ui/button";
import { LuBellRing } from "react-icons/lu";

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
import Image from "next/image";
import Social from "../footer-components/social";
import Link from "next/link";
import SearchBar from "./searchBar";

export function Menu() {
  const signIn = false;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>

      <SheetContent>
        {!signIn && <Image src={logo} alt="logo" height={150} width={150} />}
        <SheetHeader className={`${signIn ? "flex" : "hidden"}`}>
          <SheetTitle className="flex items-center justify-center gap-x-2">
            Reminder
            <LuBellRing />
          </SheetTitle>
          <SheetDescription>
            Keep your profile descriptive, professional, and creative to make a
            strong impression and stand out!
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          {!signIn && (
            <div className="flex flex-col gap-y-2">
              <label className="text-[#b071ec] text-xs ">Staff Only</label>
              <Link href={"/login"}>
                <SheetTrigger className="gap-x-2 border text-[#b071ec] hover:text-[#b071ec] border-[#b071ec] rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
                  <IoShieldHalf />
                  Sign In
                </SheetTrigger>
              </Link>
            </div>
          )}
          <DropdownMenuSeparator />
          <SearchBar margin="mx-0" />
          <Link href={"/"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              Home
            </SheetTrigger>
          </Link>
          <Link href={"#services"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              Services
            </SheetTrigger>
          </Link>
          <Link href={"#"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              {" "}
              Meet The Team
            </SheetTrigger>
          </Link>

          <Link href={"#"}>
            <SheetTrigger className="border rounded-md shadow-sm font-medium w-full hover:bg-accent h-9 px-4 py-2 items-center flex justify-center">
              Connect
            </SheetTrigger>
          </Link>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {signIn ? (
              <Button type="submit">Sign Out</Button>
            ) : (
              <Social cn="text-2xl" />
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
