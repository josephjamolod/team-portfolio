"use client";

import { ChangeEvent } from "react";
import { ModalPropType } from "./modal";

const ImageCropper = ({ closeModal, updateAvatar }: ModalPropType) => {
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      console.log(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full cursor-pointer text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
    </>
  );
};
export default ImageCropper;
