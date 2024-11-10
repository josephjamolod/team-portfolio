"use client";

import Image from "next/image";
import Modal from "@/components/createProfile-components/modal";
import React, { useState } from "react";
import plus from "@/public/assets/plus.svg";

export default function CreateProfile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [img, setImg] = useState<undefined | string>();

  const updateAvatar = (imgSrc: string) => {
    setImg(imgSrc);
  };
  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <button
          className=" rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <Image
            width={200}
            height={200}
            src={img || plus}
            alt="Avatar"
            className="w-[150px] h-[150px] rounded-full border-2 border-gray-400 cursor-pointer"
          />
        </button>
      </div>

      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
