import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const CreatorCard = ({ creator, brandId, isUnlocked }) => {
  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: '📷',
      youtube: '▶️',
      tiktok: '🎵'
    };
    return icons[platform] || '🌐';
  };

  const maskContact = (contact) => {
    if (!contact) return '***********';
    const parts = contact.split('@');
    if (parts.length === 2) {
      return `${parts[0].substring(0, 2)}*****@${parts[1]}`;
    }
    return contact.substring(0, 3) + '*********';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{creator.name}</h3>
          <p className="text-sm text-gray-600">{creator.location}</p>
        </div>
        {creator.isBoosted && (
          <Badge variant="boosted">✨ Boosted</Badge>
        )}
      </div>

      {/* Niche & Tier */}
      <div className="flex gap-2 mb-4">
        <Badge variant="primary">{creator.niche}</Badge>
        <Badge variant={creator.tier === 'Established' ? 'success' : creator.tier === 'Growth' ? 'primary' : 'warning'}>
          {creator.tier}
        </Badge>
      </div>

      {/* Bio */}
      {creator.bio && (
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{creator.bio}</p>
      )}

      {/* Platforms */}
      <div className="space-y-2 mb-4">
        {creator.platforms?.slice(0, 2).map((platform, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span>{getPlatformIcon(platform.name)}</span>
              <span className="text-gray-700 capitalize">{platform.name}</span>
            </span>
            <div className="flex gap-4 text-gray-600">
              <span>{(platform.followers / 1000).toFixed(1)}K followers</span>
              <span className="text-green-600 font-medium">{platform.engagementRate}% eng.</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Info (Blurred if not unlocked) */}
      <div className="bg-gray-50 rounded-md p-3 mb-4">
        <p className="text-xs text-gray-500 mb-2">Contact Information</p>
        <div className="space-y-1">
          <p className={`text-sm ${!isUnlocked ? 'blur-contact' : 'text-gray-900'}`}>
            📧 {isUnlocked ? creator.email : maskContact(creator.email)}
          </p>
          <p className={`text-sm ${!isUnlocked ? 'blur-contact' : 'text-gray-900'}`}>
            📞 {isUnlocked ? creator.phone : '+91-**********'}
          </p>
        </div>
        {!isUnlocked && (
          <p className="text-xs text-blue-600 mt-2">🔒 Use 1 credit to unlock</p>
        )}
      </div>

      {/* View Profile Button */}
      <Link to={`/creator/${creator._id}`}>
        <Button className="w-full">
          View Full Profile
        </Button>
      </Link>
    </div>
  );
};

export default CreatorCard;
