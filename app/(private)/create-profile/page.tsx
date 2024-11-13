import "react-image-crop/dist/ReactCrop.css";

import CreateProfile from "@/components/createProfile-components/createProfile";

export default function Profile() {
  return (
    <div className="flex items-center flex-col min-h-screen px-10 lg:px-20 3xl:px-60">
      <div className="flex relative h-[500px] max-w-[1250px] w-full justify-center ">
        <CreateProfile profile={false} />
        <CreateProfile profile={true} />
      </div>
    </div>
  );
}
