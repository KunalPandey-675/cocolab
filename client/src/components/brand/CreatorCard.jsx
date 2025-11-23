import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const CreatorCard = ({ creator, brandId, isUnlocked }) => {
  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: 'Instagram',
      youtube: 'YouTube',
      tiktok: 'TikTok'
    };
    return icons[platform] || 'Website';
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
          <h3 className={`text-xl font-bold mb-1 ${!isUnlocked ? 'blur-contact text-gray-900' : 'text-gray-900'}`}>
            {isUnlocked ? creator.name : creator.name.split(' ')[0] + ' ' + creator.name.split(' ').slice(1).map(() => '***').join(' ')}
          </h3>
          <p className="text-sm text-gray-600">{creator.location}</p>
        </div>
        {creator.isBoosted && (
          <Badge variant="boosted">✨ Boosted</Badge>
        )}
      </div>

      {/* Niche & Rating */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {Array.isArray(creator.niche) ? (
          creator.niche.slice(0, 2).map((n, idx) => (
            <Badge key={idx} variant="primary">{n}</Badge>
          ))
        ) : (
          <Badge variant="primary">{creator.niche}</Badge>
        )}
        <Badge variant="success" className="text-xs">{creator.averageRating?.toFixed(1)}/5</Badge>
      </div>

      {/* Bio */}
      {creator.bio && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{creator.bio}</p>
      )}

      {/* Platforms */}
      {creator.platforms && creator.platforms.length > 0 && (
        <div className="space-y-2 mb-3">
          {creator.platforms.slice(0, 2).map((platform, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="font-semibold">{getPlatformIcon(platform.name)}</span>
                <span className="text-gray-700">{(platform.followers / 1000).toFixed(1)}K</span>
              </span>
              <span className="text-green-600 font-medium text-xs">{platform.engagementRate}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gray-50 rounded-md p-2 mb-3 text-xs text-gray-600 space-y-1">
        {creator.tier && <div>Tier: <span className="font-semibold text-gray-900">{creator.tier}</span></div>}
        {creator.averageRating && <div>Avg Rating: <span className="font-semibold text-gray-900">{creator.averageRating.toFixed(1)}/5</span></div>}
        {creator.audience?.topCountry && <div>Region: <span className="font-semibold text-gray-900">{creator.audience.topCountry}</span></div>}
      </div>

      {/* Contact Info */}
      {isUnlocked ? (
        <div className="bg-blue-50 rounded-md p-3 mb-4">
          <p className="text-xs text-gray-600 font-semibold">Contact</p>
          <p className="text-xs text-gray-900 mt-1">{creator.email}</p>
          <p className="text-xs text-gray-900">{creator.phone}</p>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-md p-3 mb-4">
          <p className="text-xs text-gray-600">Unlock to see contact info - 1 credit</p>
        </div>
      )}

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
