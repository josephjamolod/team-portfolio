import React from 'react';

export const SocialActions: React.FC = () => {
  return (
    <div className="px-6 py-4 space-y-2">
      <button className="w-full py-2 px-4 bg-gray-50 rounded-lg text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
        <span className="text-sm">Follow @lenspost on Twitter</span>
      </button>
      <button className="w-full py-2 px-4 bg-gray-50 rounded-lg text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
        <span className="text-sm">Retweet the Tweet</span>
      </button>
    </div>
  );
}