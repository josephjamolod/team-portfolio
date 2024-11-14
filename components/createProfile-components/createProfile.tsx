"use client";

import Image from "next/image";
import Modal from "@/components/createProfile-components/modal";
import React, { useState } from "react";

import { PiUploadDuotone } from "react-icons/pi";

export interface CreateProfileType {
  profile: boolean;
}

export default function CreateProfile({ profile }: CreateProfileType) {
  const [modalOpen, setModalOpen] = useState(false);
  const [img, setImg] = useState<undefined | string>();

  const updateAvatar = (imgSrc: string) => {
    setImg(imgSrc);
  };
  return (
    <>
      <div
        className={`flex flex-col items-center bg-gradient-to-b from-[#614ced4b] via-[#efecff]  to-[#efecff] ${
          profile
            ? "h-[175px] w-[175px] lg:w-[200px] lg:h-[200px] absolute -bottom-24 left-1/2 transform -translate-x-1/2 lg:left-20 lg:-translate-x-0 border-8 border-white shadow-md bg-[#efecff] rounded-xl"
            : " w-full border-b border-b-[#624ced] h-full  "
        }  `}
      >
        <div className="relative w-full h-full ">
          <div className="w-full h-full flex justify-center items-center  ">
            {!img ? (
              <button
                title={`Upload a ${profile ? "profile" : "cover photo"}`}
                className={`flex items-center gap-x-4 py-2 px-4 rounded-md  ${
                  !profile
                    ? "bg-[#624ced] text-white hover:bg-[#b075eb] transition-colors duration-300 hover:shadow-lg shadow-md"
                    : "text-[#624ced] flex-col  hover:text-[#b075eb] transition-colors duration-300"
                }`}
                onClick={() => setModalOpen(true)}
              >
                <PiUploadDuotone
                  className={`${profile ? "text-6xl" : "text-2xl"}`}
                />
                <span className="font-semibold">
                  Upload {profile ? "profile" : "cover"}
                </span>
              </button>
            ) : (
              <Image
                title={`Change ${profile ? "profile" : "cover photo"}`}
                onClick={() => setModalOpen(true)}
                width={200}
                height={200}
                src={img}
                alt="Avatar"
                className="w-full h-full object-cover border-2 bg-blue-200 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          profile={profile}
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
