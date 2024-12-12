"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import ProfileDropdown from "./profileDropdown";
import { Menu } from "../header-components/menu";
import SearchBar from "../header-components/searchBar";
import { useAuth } from "@/providers/userProvider";
import { ModeToggle } from "../header-components/themeToggle";

import Logo from "../logo";

export default function Header() {
  const { user, logOutUser, isOldDataPresent } = useAuth();
  return (
    <header className="fixed z-50 w-full flex items-center justify-between h-[74px] border border-b-[#CAC2FF80] pr-5 xl:px-10 bg-secondary shadow-sm">
      <div className="flex items-center mx-3">
        <ul className="hidden lg:flex gap-x-12 items-center">
          <Logo size="text-3xl" />
          <ModeToggle />
          <ProfileDropdown
            isOldDataPresent={isOldDataPresent}
            user={user}
            logOutUser={logOutUser}
          />
          <Link
            className="hover:underline text-lg hover:text-muted-foreground duration-300 font-semibold "
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="hover:underline text-lg hover:text-muted-foreground  duration-300 font-semibold "
            href={"/#services"}
          >
            Services
          </Link>
        </ul>
      </div>
      <div className="hidden lg:flex items-center gap-x-4">
        <SearchBar />

        <Link href={"/meet-the-team"}>
          <Button
            variant={"outline"}
            className="rounded-full text-white hover:text-white bg-[#6652ee] hover:bg-[#5139edb5]  h-11 text-base leading-[1.8em]  transition-colors duration-300"
          >
            Meet Our Team
          </Button>
        </Link>

        <Link href={"/connect"}>
          <Button
            variant={"ghost"}
            className="hover:underline text-base hover:text-muted-foreground  duration-300 font-semibold"
          >
            Connect
          </Button>
        </Link>
      </div>
      <div className="flex lg:hidden w-full justify-between">
        <Logo size="text-2xl" />
        <div className="flex lg:hidden">
          <Menu
            isOldDataPresent={isOldDataPresent}
            user={user}
            logOutUser={logOutUser}
          />
        </div>
      </div>
    </header>
  );
}
