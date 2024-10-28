import Image from "next/image";
import logo from "@/public/assets/images/logo.png";
import memoji from "@/public/assets/images/memoji.png";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed z-10 w-full flex items-center justify-between h-16 border border-b-[#CAC2FF80] px-10 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-x-14">
        <Image src={logo} alt="logo" height={150} width={150} />
        <ul className="flex gap-x-12">
          <Link href={"/"}>Home</Link>
          <Link href={"#services"}>Services</Link>
        </ul>
      </div>
      <div className="border  w-2/5 py-2 h-9  border-slate-300  rounded-full flex items-center text-center bg-[#EFECFF]">
        <IoSearchOutline className="mx-3 text-2xl " />
        <input
          placeholder="Search Gallery Feed"
          className="bg-transparent  w-full h-4 text-sm outline-none "
          type="text"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <Button
          variant={"outline"}
          className="rounded-full primary-button hover:text-[#7b3cb6]"
        >
          Meet Our Team
        </Button>
        <Image
          src={memoji}
          alt="profile"
          width={45}
          height={45}
          className="bg-[#EFECFF] rounded-full"
        />
        <Button
          variant={"outline"}
          className="rounded-full primary-button hover:text-[#7b3cb6]"
        >
          Connect
        </Button>
      </div>
    </header>
  );
}
