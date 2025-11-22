import Badge from '../ui/Badge';

const CreatorStats = ({ platforms, tier, profileViews }) => {
  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: '📷',
      youtube: '▶️',
      tiktok: '🎵'
    };
    return icons[platform] || '🌐';
  };

  return (
    <div className="space-y-6">
      {/* Profile Stats Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Platform Analytics</h3>
          <p className="text-gray-600 text-sm mt-1">Your performance across platforms</p>
        </div>
        <Badge variant={tier === 'Established' ? 'success' : tier === 'Growth' ? 'primary' : 'warning'}>
          {tier} Creator
        </Badge>
      </div>

      {/* Platform Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms?.map((platform, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{getPlatformIcon(platform.name)}</span>
              <div>
                <h4 className="font-semibold capitalize text-gray-900">{platform.name}</h4>
                <p className="text-xs text-gray-500">{platform.handle}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Followers</span>
                <span className="font-semibold text-gray-900">
                  {(platform.followers / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Views</span>
                <span className="font-semibold text-gray-900">
                  {(platform.avgViews / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="font-semibold text-green-600">
                  {platform.engagementRate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Views */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">Profile Views</h4>
            <p className="text-sm text-gray-600">Total brands that viewed your profile</p>
          </div>
          <div className="text-4xl font-bold text-blue-600">
            {profileViews || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorStats;
