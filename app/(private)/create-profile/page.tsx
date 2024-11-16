import CreateProfile from "@/components/create-profile-components/createProfile";

export default function Profile() {
  return (
    <div className="flex items-center flex-col min-h-screen  lg:px-20 3xl:px-60">
      <div className="flex   max-w-[1250px] w-full justify-center pt-10 mb-28">
        <CreateProfile />
      </div>
    </div>
  );
}
