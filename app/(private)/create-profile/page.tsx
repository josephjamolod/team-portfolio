import "react-image-crop/dist/ReactCrop.css";

import logo from "@/public/assets/images/logo.png";
import CreateProfile from "@/components/createProfile-components/createProfile";
import CreateProfileForm from "@/components/createProfile-components/createProfileForm";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex items-center flex-col min-h-screen  lg:px-20 3xl:px-60">
      <div className="flex relative h-[300px] lg:h-[500px] max-w-[1250px] w-full justify-center mb-28">
        <CreateProfile profile={false} />
        <CreateProfile profile={true} />
      </div>
      <div className="flex flex-col relative w-full  max-w-[1250px]  border-b border-b-black">
        <CreateProfileForm>
          <Image
            src={logo}
            alt="logo"
            height={200}
            width={200}
            className="absolute top-4 left-1/2 -translate-x-1/2"
          />
          <h1 className="lg:text-2xl text-lg text-center lg:text-start pt-4">
            Create Profile
          </h1>
        </CreateProfileForm>
      </div>
    </div>
  );
}
