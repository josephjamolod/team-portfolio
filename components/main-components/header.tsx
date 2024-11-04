import Image from "next/image";
import logo from "@/public/assets/images/logo.png";

import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import Test from "./test";
import ProfileDropdown from "./profileDropdown";

export default function Header() {
  return (
    <header className="fixed z-50 w-full flex items-center justify-between h-16 border border-b-[#CAC2FF80] px-10 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-x-14">
        <Image src={logo} alt="logo" height={150} width={150} />
        <ul className="flex gap-x-12">
          <Link href={"/"}>Home</Link>
          <Link href={"#services"}>Services</Link>
        </ul>
      </div>
      <div className="border  w-2/5 py-2 h-9  border-[#624ced]  rounded-full flex items-center text-center bg-[#EFECFF] ">
        <IoSearchOutline className="mx-3 text-2xl text-[#624ced]" />
        <input
          placeholder="Search Gallery Feed"
          className="bg-transparent  w-full h-4 text-sm outline-none "
          type="text"
        />
      </div>
      <div className="flex items-center gap-x-4">
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
    </header>
  );
}
