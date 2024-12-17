import Image from "next/image";
import React from "react";

interface AssetCardProps {
  tool: string;
}

export const AssetCard: React.FC<AssetCardProps> = ({ tool }) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Image
        src={tool}
        alt="tool"
        height={300}
        width={300}
        className="object-cover"
      />
    </div>
  );
};
