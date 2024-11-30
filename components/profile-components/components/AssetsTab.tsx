import React from "react";
import { AssetCard } from "./AssetCard";

const sampleAssets = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/400/300?random=1",
    name: "Digital Art #1",
    price: 0.5,
    currency: "ETH",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/400/300?random=2",
    name: "Collectible #2",
    price: 0.8,
    currency: "ETH",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/400/300?random=3",
    name: "NFT #3",
    price: 1.2,
    currency: "ETH",
  },
];

interface ToolsTab {
  tools?: string[];
}

export const ToolsTab: React.FC<ToolsTab> = ({ tools }) => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools?.map((tool, index) => (
        <AssetCard key={index} tool={tool} />
      ))}
    </div>
  );
};
