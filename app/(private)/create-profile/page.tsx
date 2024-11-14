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
    </div>
  );
}
