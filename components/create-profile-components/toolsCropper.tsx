import Image from "next/image";
import React, { useState, useRef } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "../ui/button";

interface ToolsCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
  const size = Math.min(mediaWidth, mediaHeight);
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: size,
        height: size,
      },
      1,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ToolsCropper({
  image,
  onCropComplete,
  onCancel,
}: ToolsCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height));
  }

  const getCroppedImg = () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return canvas.toDataURL("image/jpeg", 1);
  };

  const handleCrop = () => {
    const croppedImage = getCroppedImg();
    if (croppedImage) {
      onCropComplete(croppedImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-[90vw] max-w-2xl">
        <div className="relative max-h-[60vh] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            locked={true}
            className="max-w-full"
          >
            <Image
              ref={imgRef}
              src={image}
              onLoad={onImageLoad}
              width={700}
              height={700}
              alt="Crop"
            />
          </ReactCrop>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            onClick={onCancel}
            className="hover:shadow-md"
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCrop}
            className="bg-[#efecff] text-[#624ced] border border-[#624ced] hover:bg-[#624ced] hover:text-white"
            variant={"default"}
          >
            Crop
          </Button>
        </div>
      </div>
    </div>
  );
}
