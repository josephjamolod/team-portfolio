"use client";

import React, { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileStats } from "./components/ProfileStats";
import { ProfileTabs } from "./components/ProfileTabs";
import { SocialActions } from "./components/SocialActions";
import { ToolsTab } from "./components/AssetsTab";
import { ServicesTab } from "./components/ServicesTab";
import { ProfileData } from "@/app/(public)/meet-the-team/[id]/page";

type ProfileProps = {
  profileData: ProfileData | null;
};

function Profile({ profileData }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("Tools");

  const tabs = [
    { name: "Tools", isActive: activeTab === "Tools" },
    {
      name: "Services",
      count: profileData?.services.length,
      isActive: activeTab === "Services",
    },
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="flex pt-20 justify-center  bg-[#efecff93] pb-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg mx-60">
          <ProfileHeader
            position={profileData?.position}
            coverUrl={profileData?.coverSrc}
            avatarUrl={profileData?.profileSrc}
            name={
              (profileData?.name &&
                profileData.lastname &&
                profileData?.name + " " + profileData?.lastname) ||
              ""
            }
            email={profileData?.email}
            number={profileData?.contactNumber}
            description={profileData?.serviceDescription}
          />
          <ProfileStats
            fb={profileData?.facebookSrc}
            insta={profileData?.instagramSrc}
            linkedin={profileData?.linkedinSrc}
            skype={profileData?.skypeInviteSrc}
            x={profileData?.twitterSrc}
            web={profileData?.websiteSrc}
            yt={profileData?.youtubeSrc}
            whatsApp={profileData?.whatsappNumber}
          />
          <ProfileTabs tabs={tabs} onTabChange={setActiveTab} />
          {activeTab === "Tools" ? (
            <ToolsTab tools={profileData?.tools} />
          ) : (
            <ServicesTab services={profileData?.services} />
          )}
          <SocialActions />
        </div>
      </div>
    </div>
  );
}

export default Profile;
