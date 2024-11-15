"use client";

import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { ModalPropType } from "./modal";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import Image from "next/image"; // Change here to import as default

import setCanvasPreview from "./setCanvasPreview";

import bracuza from "@/public/assets/images/brazuca.png";
import { FaExclamationCircle } from "react-icons/fa";
import { useAuth } from "@/providers/userProvider";

const ASPECT_RATIO = 16 / 9; // Aspect ratio for cover photo

const ImageCropper = ({ closeModal, updateAvatar, profile }: ModalPropType) => {
  const { setImgFile, setCoverImgFile } = useAuth();

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<PixelCrop>({
    unit: "px",
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [error, setError] = useState("");

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log(file);

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = document.createElement("img");
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalHeight } = e.currentTarget as HTMLImageElement;
        if (!profile && naturalHeight > 1000) {
          setError("Image is too big");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;

    // Set the crop width to the full width of the image and apply the aspect ratio for a rectangular shape
    const fullWidthCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "px", // Ensuring 'px' unit for PixelCrop compatibility
          width, // Full width of the image
        },
        profile ? 1 : ASPECT_RATIO,
        width,
        height
      ),
      width,
      height
    );

    setCrop(fullWidthCrop as PixelCrop); // Cast to PixelCrop
  };

  return (
    <>
      <label className=" mb-3 w-fit flex">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="flex-1 w-full cursor-pointer text-sm text-[#624ced] file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-[#624ced]
           file:text-white  file:cursor-pointer "
        />
        {error && (
          <p className="flex items-center gap-x-2 flex-1 text-sm text-red-400 pl-2 pt-1 ">
            <FaExclamationCircle />
            {error}
          </p>
        )}
      </label>
      {imgSrc ? (
        <div className="flex flex-col items-center z-50">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c as PixelCrop)}
            locked // Locks the crop position and size, making it non-adjustable
            keepSelection
            aspect={profile ? 1 : ASPECT_RATIO} // Set aspect ratio to rectangular (e.g., 16:9)
          >
            <Image
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              width={profile ? 250 : 500}
              height={profile ? 250 : 500}
              onLoad={onImageLoad}
              priority
            />
          </ReactCrop>
          <div className="flex gap-x-4">
            <button
              className="primary-button border border-[#624ced] font-semibold text-xs py-2 px-4 rounded-2xl mt-4 hover:shadow-md"
              onClick={() => {
                if (imgRef.current && previewCanvasRef.current) {
                  setCanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    crop
                  );
                } else {
                  console.error("Image or canvas element is not available.");
                }
              }}
            >
              View crop
            </button>
            <button
              className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-[#624ced] hover:shadow-md"
              onClick={() => {
                if (imgRef.current && previewCanvasRef.current) {
                  setCanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    crop
                  );
                  const dataUrl = previewCanvasRef.current.toDataURL();
                  if (profile) {
                    setImgFile(dataUrl);
                  } else {
                    setCoverImgFile(dataUrl);
                  }
                  updateAvatar(dataUrl);
                  closeModal();
                } else {
                  console.error("Image or canvas element is not available.");
                }
              }}
            >
              Upload
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="h-5/6 w-5/6 border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-10 border-gray-500" />
          <Image
            className="pt-20 border-b-2 border-b-[#624ced] place-self-center"
            src={bracuza}
            alt="frame"
            height={200}
            width={200}
          />
        </>
      )}
      {previewCanvasRef && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4 object-contain rounded h-[150px] w-[266px] place-self-center"
        />
      )}
    </>
  );
};

export default ImageCropper;
