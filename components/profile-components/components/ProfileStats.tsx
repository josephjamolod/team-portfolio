import React from "react";

import { HiOutlinePhone } from "react-icons/hi2";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiSkype } from "react-icons/tfi";
import { FiLinkedin } from "react-icons/fi";
import { GoGlobe } from "react-icons/go";
import { LuYoutube } from "react-icons/lu";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import LinkTag from "./linkTag";

interface ProfileStatsProps {
  fb?: string;
  insta?: string;
  linkedin?: string;
  skype?: string;
  x?: string;
  web?: string;
  yt?: string;
  whatsApp?: string;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  fb,
  insta,
  skype,
  web,
  whatsApp,
  x,
  yt,
  linkedin,
}) => {
  const sources = [
    { src: linkedin, icon: <FiLinkedin size={26} key="linkedin" /> },
    { src: whatsApp, icon: <HiOutlinePhone size={26} key="phone" /> },
    { src: skype, icon: <TfiSkype size={26} key="skype" /> },
    { src: fb, icon: <SlSocialFacebook size={26} key="fb" /> },
    { src: x, icon: <FaXTwitter size={26} key="twitter" /> },
    { src: insta, icon: <IoLogoInstagram size={26} key="instagram" /> },
    { src: web, icon: <GoGlobe size={26} key="globe" /> },
    { src: yt, icon: <LuYoutube size={26} key="yt" /> },
  ];

  return (
    <div className="px-6 py-4 flex flex-col gap-y-2 items-center border-t border-gray-200 text-[#624ced]">
      <h1 className=" px-2 text-[12px] w-full items-start font-bold text-muted-foreground">
        SOCIALS
      </h1>

      <div className="flex w-full   justify-between">
        {sources.map((source, index) => {
          return (
            <LinkTag key={index} src={source.src || "#"} icon={source.icon} />
          );
        })}
      </div>
    </div>
  );
};
