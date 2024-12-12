"use client";

import Image from "next/image";
import logo from "@/public/assets/images/logo.png";

import { Button } from "../ui/button";
import Link from "next/link";
import ProfileDropdown from "./profileDropdown";
import { Menu } from "../header-components/menu";
import SearchBar from "../header-components/searchBar";
import { useAuth } from "@/providers/userProvider";
import { ModeToggle } from "../header-components/themeToggle";

export default function Header() {
  const { user, logOutUser, isOldDataPresent } = useAuth();
  return (
    <header className="fixed z-50 w-full flex items-center justify-between h-[74px] border border-b-[#CAC2FF80] pr-5 xl:px-10 bg-white shadow-sm">
      <div className="flex items-center mx-3">
        <ul className="hidden lg:flex gap-x-12 items-center">
          <ModeToggle />
          <Image src={logo} alt="logo" height={200} width={200} />
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
        <SearchBar margin="mx-3" />

        <Link href={"/meet-the-team"}>
          <Button
            variant={"outline"}
            className="rounded-full primary-button h-11 text-base leading-[1.8em] hover:bg-[#5139edb5] hover:text-white transition-colors duration-300"
          >
            Meet Our Team
          </Button>
        </Link>

        <Link href={"/connect"}>
          <Button
            variant={"ghost"}
            className="rounded-full h-11 text-base primary-button hover:bg-[#5139edb5] hover:text-white transition-colors duration-300"
          >
            Connect
          </Button>
        </Link>
      </div>
      <div className="flex lg:hidden w-full justify-between">
        <Image src={logo} alt="logo" height={150} width={150} />
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
