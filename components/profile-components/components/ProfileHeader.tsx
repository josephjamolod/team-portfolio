import Image from "next/image";
import React from "react";
import { GoMail } from "react-icons/go";
import { CiPhone } from "react-icons/ci";

interface ProfileHeaderProps {
  name: string;
  description?: string;
  avatarUrl?: string;
  coverUrl?: string;
  email?: string;
  number?: string;
  position?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  description,
  avatarUrl,
  coverUrl,
  email,
  number,
  position,
}) => {
  return (
    <div className="">
      {/* Banner Image */}
      <div className="h-96 mb-24 relative w-full   rounded-t-lg">
        {coverUrl && (
          <Image
            fill
            src={coverUrl}
            alt={name}
            className="  border-8 border-white bg-white"
          />
        )}
        <div className="absolute -bottom-20 left-10 rounded-2xl bg-white overflow-hidden">
          <div className="gradient-bg p-2">
            {avatarUrl ? (
              <Image
                height={150}
                width={150}
                src={avatarUrl}
                alt={name}
                className=" rounded-2xl border border-[#8676eeb5] bg-[#8676eeb5] "
              />
            ) : (
              <div className="w-32 h-32 rounded-lg border border-[#8676eeb5] bg-red-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold capitalize">{name}</h1>
            <div className="flex gap-2">
              <button className="flex justify-center items-center gap-x-2 px-4 py-1 bg-[#efecff] border border-[#8676eeb5] rounded-full text-sm font-medium hover:bg-[#8676eeb5] hover:text-secondary transition-colors duration-300">
                <GoMail size={26} />
                <span> {email}</span>
              </button>
              <button className="flex justify-center items-center gap-x-2 px-4 py-1 bg-[#efecff] border border-[#8676eeb5] rounded-full text-sm font-medium hover:bg-[#8676eeb5] hover:text-secondary transition-colors duration-300">
                <CiPhone size={26} />
                {number}
              </button>
            </div>
          </div>
          <p className="capitalize text-xl pt-4 px-2">{position}</p>
          <p className="text-gray-600 text-base px-2 ">{description}</p>
        </div>
      </div>
    </div>
  );
};
