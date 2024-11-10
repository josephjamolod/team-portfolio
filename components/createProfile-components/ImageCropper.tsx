"use client";

import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { ModalPropType } from "./modal";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";
import Image from "next/image";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar }: ModalPropType) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  const [error, setError] = useState("");

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (error) setError("");
      const imageUrl = reader.result?.toString() || "";
      const imageElement = document.createElement("img") as HTMLImageElement;
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
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
      {imgSrc && (
        <div className="flex flex-col items-center z-50">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <Image
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              width={500}
              height={500}
              onLoad={onImageLoad}
              priority
            />
          </ReactCrop>{" "}
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              console.log("red");

              if (imgRef.current && previewCanvasRef.current) {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                closeModal();
              } else {
                console.error("Image or canvas element is not available.");
              }
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className={`mt-4 ${
            imgSrc ? "visible" : "invisible"
          } border object-contain rounded-full h-[150px] w-[150px]`}
        />
      )}
    </>
  );
};
export default ImageCropper;
