import React from 'react';

interface ProfileStatsProps {
  following: number;
  followers: number;
  campaignValue: number;
  poster: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  following,
  followers,
  campaignValue,
  poster,
}) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
      <div className="space-y-1">
        <div className="flex gap-8">
          <div>
            <span className="font-bold text-xl">{following}</span>
            <p className="text-sm text-gray-600">Following</p>
          </div>
          <div>
            <span className="font-bold text-xl">{followers}k</span>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div>
          <p className="text-sm text-gray-600">Campaign Value</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm">$POSTER</span>
            <span className="font-bold text-xl">{poster}</span>
          </div>
        </div>
      </div>
    </div>
  );
}