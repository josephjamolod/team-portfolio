import { Badge } from "@/components/ui/badge";
import React from "react";

interface ProfileSectionProps {
  name: string;
  imageUrl: string;
  status: "AVAILABLE" | "BUSY" | "OFFLINE";
  isPro?: boolean;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  imageUrl,
  status,
  isPro,
}) => {
  return (
    <div className="md:py-6 md:px-14 p-6 bg-white ">
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-100"
        />
        <Badge
          variant={"secondary"}
          className="absolute bg-green-200 hover:bg-green-300 bottom-2 right-2 text-green-800"
        >
          {status.toLowerCase()}
        </Badge>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 capitalize">
          {name}
          {isPro && (
            <Badge
              variant="default"
              className="text-sm gradient-bg text-primary border-purple-700"
            >
              PRO
            </Badge>
          )}
        </h2>
      </div>
    </div>
  );
};