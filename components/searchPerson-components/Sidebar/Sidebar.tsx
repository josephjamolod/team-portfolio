import React, { useState } from "react";
import Flag from "react-world-flags";
import { ProfileSection } from "./ProfileSection";
import { ActionButton } from "./ActionButton";
import {
  FiMail,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { TiPhone } from "react-icons/ti";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import { ProfileStats } from "@/components/profile-components/components/ProfileStats";
import { ProfileTabs } from "@/components/profile-components/components/ProfileTabs";
import { ToolsTab } from "@/components/profile-components/components/AssetsTab";
import { ServicesTab } from "@/components/profile-components/components/ServicesTab";
import { SocialActions } from "@/components/profile-components/components/SocialActions";
import { Staff } from "../SearchPerson";
import Image from "next/image";

interface SidebarProps {
  staff: Staff;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ staff, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Tools");

  const tabs = [
    { name: "Tools", isActive: activeTab === "Tools" },
    {
      name: "Services",
      count: staff.services.length,
      isActive: activeTab === "Services",
    },
  ];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "relative h-full transition-all duration-300 ease-in-out",
        isOpen ? "w-[340px] 2xl:w-[500px]" : "w-20"
      )}
    >
      <CollapsibleTrigger className="hidden lg:flex absolute -right-3 top-[137px] z-10 h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full border border-[#624ced] text-[#624ced] text-2xl bg-[#efecff] shadow-sm">
        {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
      </CollapsibleTrigger>

      <aside className="h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-hidden">
        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden absolute top-20 right-4 p-2 text-gray-500 hover:text-gray-900"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}

        {/* Expanded State */}
        <CollapsibleContent
          forceMount
          className={cn(
            "transition-all duration-300 h-full overflow-y-auto pt-20 ",
            isOpen ? "opacity-100" : "opacity-0 invisible h-0"
          )}
        >
          <ProfileSection
            name={staff.name + " " + staff.lastname}
            imageUrl={staff.profileSrc}
            status="AVAILABLE"
            isPro={true}
          />

          <div className="2xl:py-4 2xl:px-14 p-4 space-y-3">
            <ActionButton
              icon={<FiMail className="w-5 h-5" />}
              label="Get In Touch"
              onClick={() => {}}
            />

            <div className="flex items-center text-sm text-gray-600">
              <FiStar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Typically responds within 24 hours</span>
            </div>
          </div>

          <div className="2xl:py-4 2xl:px-14 p-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
              Contact Number:
            </h3>
            <div className="flex  items-center gap-x-4 text-lg font-medium text-gray-900">
              <button className=" text-2xl scale-100 hover:scale-110 transition-transform duration-300">
                <TiPhone />
              </button>
              <span className="font-medium text-gray-900 flex items-center">
                <Flag
                  code={staff.contactNumber.countryCode}
                  style={{
                    width: "1.5rem",
                    height: "2rem",
                    marginRight: "0.5rem",
                  }}
                />
                +{staff.contactNumber.number}
              </span>
            </div>
          </div>

          <div className="2xl:py-4 2xl:px-14 p-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
              Social Links:
            </h3>
            <ProfileStats
              fb={staff.facebookSrc}
              insta={staff.instagramSrc}
              linkedin={staff.linkedinSrc}
              skype={staff.skypeInviteSrc}
              x={staff.twitterSrc}
              web={staff.websiteSrc}
              yt={staff.youtubeSrc}
              whatsApp={staff.whatsappNumber}
            />
          </div>

          <div className="2xl:py-4 2xl:px-14 p-4 border-t border-gray-200">
            <ProfileTabs tabs={tabs} onTabChange={setActiveTab} />
            {activeTab === "Tools" ? (
              <ToolsTab tools={staff.tools} />
            ) : (
              <ServicesTab services={staff.services} />
            )}
            <SocialActions />
          </div>
        </CollapsibleContent>

        {/* Collapsed State Content */}
        {!isOpen && (
          <div className="flex flex-col items-center gap-6 p-4">
            <div className="relative w-12 h-12">
              <Image
                fill
                sizes="50px"
                src={staff.profileSrc}
                alt={staff.name}
                className=" rounded-full object-cover border-2 border-gray-100"
              />
              <span
                className={
                  "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-green-500"
                }
              ></span>
            </div>

            <button
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => {}}
            >
              <FiMail className="w-5 h-5" />
            </button>
          </div>
        )}
      </aside>
    </Collapsible>
  );
};
