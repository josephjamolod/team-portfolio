import { FaRegWindowClose } from "react-icons/fa";
import ImageCropper from "./ImageCropper";

interface ModalPropType {
  updateAvatar: (imgSrc: string) => void;
  closeModal: () => void;
}

const Modal = ({ updateAvatar, closeModal }: ModalPropType) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed flex items-center justify-center inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex w-1/2 min-h-screen justify-center px-2 py-20 text-center ">
          <div className="relative w-1/2 sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md text-3xl p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <FaRegWindowClose />
              </button>
              {/* <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
