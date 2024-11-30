import React from 'react';

interface CampaignCardProps {
  title: string;
  description: string;
  status: 'active' | 'completed';
  reward: number;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ title, description, status, reward }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500">Reward:</span>
        <span className="font-medium">${reward}</span>
      </div>
    </div>
  );
}