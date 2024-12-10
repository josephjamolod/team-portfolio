"use client";

import logo from "@/public/assets/images/logo.png";
import React from "react";
import Image from "next/image";
import ImageUpload from "./imageUpload";
import CreateProfileForm from "./createProfileForm";
import { useAuth } from "@/providers/userProvider";

function CreateProfile() {
  const {
    profilePhoto,
    setProfilePhoto,
    coverPhoto,
    setCoverPhoto,
    user,
    setImages,
    images,
    updateUserMutation,
    loading,
    isLoadingUpdateMutation,
    services,
    userData,
    handleAddService,
    handleDeleteService,
  } = useAuth();

  console.log(userData);

  return (
    <div className="h-full bg-[#efecff93]  py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl h-full mx-auto">
        <div className="bg-white shadow rounded-sm sm:rounded-lg">
          <div className="px-4 md:px-14 py-5">
            <h1 className="text-2xl font-bold text-[#624ced] mb-8">
              Create Profile
            </h1>

            <div className="space-y-8">
              {/* Cover Photo Container */}
              <div className="relative">
                {/* Cover Photo */}
                <div className="relative w-full h-[200px] md:h-[348px] bg-gray-100">
                  {coverPhoto ? (
                    <>
                      <div className="w-full h-full object-cover">
                        {" "}
                        <Image src={coverPhoto} alt="Cover" fill />
                      </div>

                      <button
                        onClick={() => setCoverPhoto(null)}
                        className="absolute top-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-70 p-2 rounded-md shadow-md"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0">
                      <ImageUpload
                        label="Cover Photo"
                        aspectRatio={3.5 / 1.3}
                        onImageUpload={setCoverPhoto}
                      />
                    </div>
                  )}
                </div>

                {/* Profile Photo */}
                <div className="absolute -bottom-20  left-6">
                  <div className="relative ">
                    {profilePhoto ? (
                      <div className="relative">
                        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover">
                          <Image
                            src={profilePhoto}
                            alt="Profile"
                            className=" object-cover border-4 border-white shadow-lg"
                            fill
                          />
                        </div>
                        <button
                          onClick={() => setProfilePhoto(null)}
                          className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-70 p-2 rounded-md shadow-md"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-40">
                        <ImageUpload
                          label="Profile Photo"
                          aspectRatio={1}
                          onImageUpload={setProfilePhoto}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Spacing for profile photo overflow */}
              <div className="h-12"></div>
            </div>
            <CreateProfileForm
              user={user}
              userData={userData}
              loading={loading}
              updateUserLoader={isLoadingUpdateMutation}
              updateUser={updateUserMutation}
              profilePhoto={profilePhoto}
              coverPhoto={coverPhoto}
              images={images}
              setImages={setImages}
              services={services}
              handleAddService={handleAddService}
              handleDeleteService={handleDeleteService}
            >
              <div className="flex items-center w-full justify-center">
                <Image
                  src={logo}
                  alt="logo"
                  height={150}
                  width={150}
                  className=""
                />
              </div>
            </CreateProfileForm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
