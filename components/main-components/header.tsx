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
        <nav className="hidden lg:flex gap-x-12 items-center">
          <Logo size="text-2xl xl:text-3xl" />
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
        </nav>
      </div>
      <div className="hidden lg:flex items-center gap-x-4">
        <Link
          href={"/search-person"}
          className="flex items-center gradient-bg justify-center dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-cyan-400 border-0
                   rounded-full text-white text-lg max-w-full min-w-[140px] p-[4px] whitespace-nowrap cursor-pointer transition-transform duration-300 hover:outline-none active:scale-90"
        >
          <SearchBar />
        </Link>

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
        <div className="flex lg:hidden gap-x-2">
          <ModeToggle />
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
