import Link from "next/link";
import React from "react";

import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";

interface SocialsType {
  icon: JSX.Element;
  href: string;
}

const socials: SocialsType[] = [
  { icon: <FaFacebookSquare />, href: "#" },
  { icon: <FaLinkedin />, href: "#" },
  { icon: <FaDiscord />, href: "#" },
];

export default function Social({ cn }: { cn: string }) {
  return (
    <div className="flex gap-x-3">
      {socials.map((text, index) => {
        return (
          <Link key={index} href={text.href} className={`${cn} h-min`}>
            {text.icon}
          </Link>
        );
      })}
    </div>
  );
}
