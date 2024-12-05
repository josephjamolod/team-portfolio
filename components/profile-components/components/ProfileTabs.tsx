import React from "react";
import clsx from "clsx";

interface Tab {
  name: string;
  count?: number;
  isActive?: boolean;
}

interface ProfileTabsProps {
  tabs: Tab[];
  onTabChange: (tab: string) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  tabs,
  onTabChange,
}) => {
  return (
    <div className="px-6 ">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            className={clsx(
              "py-4 relative",
              tab.isActive ? "text-black" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <span className="flex items-center gap-2">
              {tab.name}
              {tab.count !== undefined && (
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-sm">
                  {tab.count}
                </span>
              )}
            </span>
            {tab.isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
