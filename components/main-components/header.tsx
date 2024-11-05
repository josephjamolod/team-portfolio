import Image from "next/image";
import logo from "@/public/assets/images/logo.png";

import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import ProfileDropdown from "./profileDropdown";
import { Menu } from "../header-components/menu";

export default function Header() {
  return (
    <header className="fixed z-50 w-full flex items-center justify-between h-16 border border-b-[#CAC2FF80] px-5 xl:px-10 backdrop-blur-md shadow-sm">
      <Image src={logo} alt="logo" height={150} width={150} />
      <div className="flex items-center mx-3">
        <ul className="hidden lg:flex gap-x-12">
          <Link className="hover:underline" href={"/"}>
            Home
          </Link>
          <Link className="hover:underline  duration-300" href={"#services"}>
            Services
          </Link>
        </ul>
      </div>
      <div className="hidden sm:flex border  w-2/5 py-2 h-9  border-[#624ced]  rounded-full  items-center text-center bg-[#EFECFF] mx-3">
        <IoSearchOutline className="mx-3 text-2xl text-[#624ced]" />
        <input
          placeholder="Search Gallery Feed"
          className="bg-transparent  w-full h-4 text-sm outline-none "
          type="text"
        />
      </div>
      <div className="hidden lg:flex items-center gap-x-4">
        <Button
          variant={"outline"}
          className="rounded-full primary-button hover:bg-[#5139edb5] hover:text-white transition-colors duration-300"
        >
          Meet Our Team
        </Button>
        <ProfileDropdown />
        <Button
          variant={"outline"}
          className="rounded-full primary-button hover:bg-[#5139edb5] hover:text-white transition-colors duration-300"
        >
          Connect
        </Button>
      </div>
      <div className="flex lg:hidden">
        <Menu />
      </div>
    </header>
  );
}
