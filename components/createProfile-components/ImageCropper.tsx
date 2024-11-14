import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { ModalPropType } from "./modal";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import Image from "next/image";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 16 / 9; // Aspect ratio for cover photo

const ImageCropper = ({ closeModal, updateAvatar, profile }: ModalPropType) => {
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
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (error) setError("");
      const imageUrl = reader.result?.toString() || "";
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
              className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
              onClick={() => {
                if (imgRef.current && previewCanvasRef.current) {
                  setCanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    crop
                  );

                  // closeModal();
                } else {
                  console.error("Image or canvas element is not available.");
                }
              }}
            >
              View crop
            </button>
            <button
              className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
              onClick={() => {
                if (imgRef.current && previewCanvasRef.current) {
                  setCanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    crop
                  );
                  const dataUrl = previewCanvasRef.current.toDataURL();
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
      )}
      <canvas
        ref={previewCanvasRef}
        className="mt-4 object-contain rounded h-[150px] w-[266px] place-self-center"
      />
    </>
  );
};

export default ImageCropper;
