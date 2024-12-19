import Link from "next/link";
import Social from "../footer-components/social";
import Logo from "../logo";
import { aboutUs, company } from "@/contants";

export default function Footer() {
  return (
    <footer className=" mt-40  border border-[#b071ec] bg-[#efecff] dark:bg-secondary text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 px-10 lg:px-52 h-full gap-8 pt-20">
        <div className=" h-full flex flex-col gap-y-4">
          <div className="w-full flex justify-center md:justify-start items-start">
            <Logo size="text-2xl" />
          </div>
          <h3 className=" font-medium md:font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit dolore magna
            aliqua.
          </h3>
        </div>
        <nav className=" h-full flex flex-col  gap-y-4">
          <Link href={"#"} className="font-semibold text-lg">
            About Us
          </Link>
          {aboutUs.map((text, index) => {
            return (
              <Link
                className="font-medium md:font-normal"
                key={index}
                href={text.href}
              >
                {text.label}
              </Link>
            );
          })}
        </nav>
        <nav className=" h-full flex flex-col gap-y-4">
          <Link href={"#"} className="font-semibold text-lg">
            Company
          </Link>
          {company.map((text, index) => {
            return (
              <Link
                className="font-medium md:font-normal"
                key={index}
                href={text.href}
              >
                {text.label}
              </Link>
            );
          })}
        </nav>
        <nav className=" h-full flex flex-col gap-y-4 ">
          <Link href={"#"} className="font-semibold text-lg">
            Connect to Us
          </Link>
          <Social cn="text-4xl" />
        </nav>
      </div>
      <hr className="w-full border-t-[1px]  border-[#6652ee] mt-5" />
      <h1 className="text-center w-full pt-2 pb-2  bg-[#6652ee] text-white">
        Copy right{" "}
        <Link
          href={"https://www.facebook.com/jamolod.joseph"}
          className="font-semibold"
        >
          Joseph
        </Link>
        . All Right Reserved
      </h1>
    </footer>
  );
}
