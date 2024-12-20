"use client";

import React, {
  useState,
  useCallback,
  useRef,
  SetStateAction,
  Dispatch,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FiUpload, FiX, FiTrash2 } from "react-icons/fi";
import ToolsCropper from "./toolsCropper";
import { Button } from "../ui/button";
import Image from "next/image";

export interface ImageFile extends File {
  preview?: string;
  croppedImage?: string;
}

interface UploadToolsPropType {
  images: ImageFile[] | [];
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
}

export default function UploadTools({
  images,
  setImages,
}: UploadToolsPropType) {
  //careful logging this without image, cause browser will crash "console.log(images[0].croppedImage);"

  const cancelRef = useRef<HTMLButtonElement>(null);
  const [currentImage, setCurrentImage] = useState<ImageFile | null>(null);

  const [showCropper, setShowCropper] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > 12) {
        toast.error("Maximum 12 photos allowed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      if (newFiles.length > 0) {
        setCurrentImage(newFiles[0] as ImageFile);
        setShowCropper(true);
      }

      setImages((prev) => [...prev, ...newFiles]);
    },
    [setImages, images.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 12,
  });

  const handleCropComplete = (croppedImage: string) => {
    if (currentImage) {
      setImages((prev) =>
        prev.map((img) =>
          img === currentImage ? { ...img, croppedImage } : img
        )
      );
    }
    setShowCropper(false);
    setCurrentImage(null);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview!);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const clearAllImages = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview!);
    });
    setImages([]);
    toast.success("All images cleared", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-primary">Tool Expertise</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-center md:flex-row gap-x-2 text-sm font-medium text-muted-foreground">
          <span> Images uploaded: </span>
          <p>
            <span className="text-[#6652ee] font-bold">{images.length}</span>{" "}
            out of <span className="text-[#6652ee] font-bold">12</span>
          </p>
        </div>
        {images.length > 0 && (
          <Button
            onClick={clearAllImages}
            variant={"destructive"}
            className="bg-red-600"
          >
            <FiTrash2 />
            Clear All
          </Button>
        )}
      </div>

      <div className="bg-[#efecff] dark:bg-secondary rounded-lg p-4 mb-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 bg-white dark:bg-black text-center cursor-pointer transition-colors mb-8
          ${
            isDragActive
              ? "border-[#6652ee] bg-[#efecff]"
              : "border-gray-300 hover:border-[#6652ee]"
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-[#6652ee]">
            Drag and drop images here, or click to select files
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum 12 photos allowed
          </p>
        </div>
      </div>

      {showCropper && currentImage && (
        <ToolsCropper
          image={currentImage.preview!}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowCropper(false);
            if (cancelRef) {
              cancelRef.current?.click();
            }
          }}
        />
      )}

      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-min pb-4">
          {images.map((file, index) => (
            <div key={index} className="relative group flex-shrink-0 w-40">
              <Image
                src={file.croppedImage || (file.preview as string)}
                alt={`Preview ${index + 1}`}
                height={200}
                width={200}
                className=" object-cover rounded-lg"
              />
              <button
                type="button"
                ref={cancelRef}
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
