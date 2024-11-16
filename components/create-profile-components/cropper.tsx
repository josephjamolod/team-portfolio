import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "../ui/button";

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
  label: "Cover Photo" | "Profile Photo";
}

export default function ImageCropper({
  image,
  onCropComplete,
  onCancel,
  aspectRatio = 1,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });

  const [completeCrop, setCompleteCrop] = useState<Crop | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  // const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imageRef.current && completeCrop) {
      const image = imageRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = Math.floor(completeCrop.width * scaleX);
      canvas.height = Math.floor(completeCrop.height * scaleY);

      ctx.imageSmoothingQuality = "high";

      const cropX = Math.floor(completeCrop.x * scaleX);
      const cropY = Math.floor(completeCrop.y * scaleY);
      const cropWidth = Math.floor(completeCrop.width * scaleX);
      const cropHeight = Math.floor(completeCrop.height * scaleY);

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
    }
  }, [completeCrop]);

  const handleCropChange = (c: Crop) => {
    setCrop(c);
    setHasInteracted(true);
  };

  const getCroppedImg = () => {
    const image = imageRef.current;
    if (!image || !completeCrop) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(completeCrop.width * scaleX);
    canvas.height = Math.floor(completeCrop.height * scaleY);

    ctx.imageSmoothingQuality = "high";

    const cropX = Math.floor(completeCrop.x * scaleX);
    const cropY = Math.floor(completeCrop.y * scaleY);
    const cropWidth = Math.floor(completeCrop.width * scaleX);
    const cropHeight = Math.floor(completeCrop.height * scaleY);

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    const base64Image = canvas.toDataURL("image/jpeg", 0.95);
    // console.log(base64Image);

    onCropComplete(base64Image);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h3 className="text-lg font-semibold mb-4">Crop Image</h3>
        <div className="mb-4 max-h-[60vh] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={handleCropChange}
            onComplete={(c) => setCompleteCrop(c)}
            aspect={aspectRatio}
            className="max-w-full"
          >
            <Image
              ref={imageRef}
              src={image}
              alt="Crop me"
              width={700}
              height={700}
              crossOrigin="anonymous"
              onLoad={() => setCompleteCrop(crop)}
            />
          </ReactCrop>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onCancel}
            className="hover:shadow-md"
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button
            onClick={getCroppedImg}
            disabled={!hasInteracted}
            className={`px-4 py-2 rounded-md ${
              hasInteracted
                ? "bg-[#efecff] text-[#624ced] border border-[#624ced] hover:bg-[#624ced] hover:text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Crop & Save
          </Button>
        </div>
      </div>
    </div>
  );
}
