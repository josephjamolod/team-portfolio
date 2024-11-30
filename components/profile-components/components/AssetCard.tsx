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
      {/* <div className="p-4">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm text-gray-500">{currency}</span>
          <span className="font-medium">{price}</span>
        </div>
      </div> */}
    </div>
  );
};
