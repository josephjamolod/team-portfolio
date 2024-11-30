"use client";

import React, { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileStats } from "./components/ProfileStats";
import { ProfileTabs } from "./components/ProfileTabs";
import { SocialActions } from "./components/SocialActions";
import { ToolsTab } from "./components/AssetsTab";
import { CampaignsTab } from "./components/CampaignsTab";
import { ProfileData } from "@/app/(public)/meet-the-team/[id]/page";

type ProfileProps = {
  profileData: ProfileData | null;
};

function Profile({ profileData }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("Tools");

  const tabs = [
    { name: "Tools", isActive: activeTab === "Tools" },
    { name: "Campaigns", count: 2, isActive: activeTab === "Campaigns" },
  ];

  return (
    <div className="min-h-screen pt-24 bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <ProfileHeader
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
          following={54}
          followers={190}
          campaignValue={95}
          poster={95}
        />
        <ProfileTabs tabs={tabs} onTabChange={setActiveTab} />
        {activeTab === "Tools" ? (
          <ToolsTab tools={profileData?.tools} />
        ) : (
          <CampaignsTab />
        )}
        <SocialActions />
      </div>
    </div>
  );
}

export default Profile;
