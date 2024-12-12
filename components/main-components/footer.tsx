import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/images/logo.png";
import Social from "../footer-components/social";

interface AboutUsTye {
  label: string;
  href: string;
}

interface CompanyType {
  label: string;
  href: string;
}

const aboutUs: AboutUsTye[] = [
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Meet The Team", href: "/meet-the-team" },
  { label: "Let's Connect", href: "/connect" },
];

const company: CompanyType[] = [
  { label: "FAQs", href: "#" },
  { label: "Terms & Condition", href: "#" },
];

export default function Footer() {
  return (
    <main className=" mt-40  border border-[#b071ec] bg-[#efecff]  text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 px-10 lg:px-52 h-full gap-8 pt-20">
        <ul className=" h-full flex flex-col gap-y-4">
          <Image src={logo} alt="logo" height={175} width={175} />
          <h3 className="pr-4 font-medium md:font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit dolore magna
            aliqua.
          </h3>
        </ul>
        <ul className=" h-full flex flex-col  gap-y-4">
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
        </ul>
        <ul className=" h-full flex flex-col gap-y-4">
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
        </ul>
        <ul className=" h-full flex flex-col gap-y-4 ">
          <Link href={"#"} className="font-semibold text-lg">
            Connect to Us
          </Link>
          <Social cn="text-4xl" />
        </ul>
      </div>
      <hr className="w-full border-t-[1px] border-[#b071ec] mt-5" />
      <h1 className="text-center w-full pt-2 pb-2 bg-[#b071ec] text-white">
        Copy right{" "}
        <Link
          href={"https://www.facebook.com/jamolod.joseph"}
          className="font-semibold"
        >
          Joseph
        </Link>
        . All Right Reserved
      </h1>
    </main>
  );
}
