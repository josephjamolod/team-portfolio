import Image from "next/image";
import logo from "@/public/assets/images/logo.png";
import memoji from "@/public/assets/images/memoji.png";
import { IoSearchOutline } from "react-icons/io5";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 border border-b-[#CAC2FF80] px-10 backdrop-blur-md">
      <div className="flex items-center gap-x-14">
        <Image src={logo} alt="logo" height={150} width={150} />
        <li className="flex gap-x-12">
          <ul>Feed</ul>
          <ul>Raveshop</ul>
        </li>
      </div>
      <div className="border  w-2/5 py-2 h-9    rounded-full flex items-center text-center bg-[#EFECFF]">
        <IoSearchOutline className="mx-3 text-2xl" />
        <input
          placeholder="Search Gallery Feed"
          className="bg-transparent w-full h-4 text-sm outline-none "
          type="text"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <button className="border border-[#B071EC] text-[#B071EC] bg-[#EFECFF] px-2 h-8 rounded-full text-center">
          Create <span className="text-sm font-semibold">+</span>
        </button>
        <Image
          src={memoji}
          alt="profile"
          width={45}
          height={45}
          className="bg-[#EFECFF] rounded-full"
        />
        <button className="border border-[#B071EC] text-[#B071EC] bg-[#EFECFF] px-2 h-8 rounded-full text-center">
          168
        </button>
      </div>
    </header>
  );
}
