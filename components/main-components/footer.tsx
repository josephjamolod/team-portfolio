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
  { label: "Meet The Team", href: "#" },
  { label: "Let's Connect", href: "#" },
];

const company: CompanyType[] = [
  { label: "FAQs", href: "#" },
  { label: "Terms & Condition", href: "#" },
];

export default function Footer() {
  return (
    <main className=" mt-40 h-80 border border-[#b071ec] bg-[#efecff] mb-10 text-sm">
      <div className="grid grid-cols-4 px-52 h-full gap-8 pt-20">
        <ul className=" h-full flex flex-col gap-y-4">
          <Image src={logo} alt="logo" height={175} width={175} />
          <h3 className="pr-4">
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
              <Link key={index} href={text.href}>
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
              <Link key={index} href={text.href}>
                {text.label}
              </Link>
            );
          })}
        </ul>
        <ul className=" h-full flex flex-col gap-y-4 ">
          <Link href={"#"} className="font-semibold text-lg">
            Connect Us
          </Link>
          <Social cn="text-4xl" />
        </ul>
      </div>
      <h1 className="text-center w-full pt-4 pb-2">
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
