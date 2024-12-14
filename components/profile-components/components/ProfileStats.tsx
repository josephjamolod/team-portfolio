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
    { src: linkedin, icon: <FiLinkedin size={20} key="linkedin" /> },
    { src: whatsApp, icon: <HiOutlinePhone size={20} key="phone" /> },
    { src: skype, icon: <TfiSkype size={20} key="skype" /> },
    { src: fb, icon: <SlSocialFacebook size={20} key="fb" /> },
    { src: x, icon: <FaXTwitter size={20} key="twitter" /> },
    { src: insta, icon: <IoLogoInstagram size={20} key="instagram" /> },
    { src: web, icon: <GoGlobe size={20} key="globe" /> },
    { src: yt, icon: <LuYoutube size={20} key="yt" /> },
  ];

  return (
    <div className=" flex flex-col gap-y-2 items-center text-primary ">
      <div className="flex w-full   justify-between">
        {sources.map((source, index) => {
          return (
            source.src && (
              <LinkTag key={index} src={source.src || "#"} icon={source.icon} />
            )
          );
        })}
      </div>
    </div>
  );
};
