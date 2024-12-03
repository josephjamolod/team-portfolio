import React from "react";
import { AssetCard } from "./AssetCard";

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
