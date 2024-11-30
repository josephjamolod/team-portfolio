import React from 'react';
import { CampaignCard } from './CampaignCard';

const sampleCampaigns = [
  {
    id: 1,
    title: 'Community Engagement',
    description: 'Participate in our community events and earn rewards',
    status: 'active' as const,
    reward: 100
  },
  {
    id: 2,
    title: 'Content Creation',
    description: 'Create and share original content about our project',
    status: 'completed' as const,
    reward: 250
  }
];

export const CampaignsTab: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      {sampleCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} {...campaign} />
      ))}
    </div>
  );
}