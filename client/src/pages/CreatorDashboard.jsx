import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import { getCreatorById, getCreatorViewStats } from '../api/creator';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CreatorStats from '../components/creator/CreatorStats';
import BoostModal from '../components/creator/BoostModal';

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const { user, role } = useAuthStore();
  const { openBoostModal } = useUIStore();
  const [creator, setCreator] = useState(null);
  const [viewStats, setViewStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'creator') {
      navigate('/');
      return;
    }

    const fetchCreatorData = async () => {
      try {
        const creatorData = await getCreatorById(user.id);
        setCreator(creatorData);

        const stats = await getCreatorViewStats(user.id);
        setViewStats(stats);
      } catch (error) {
        console.error('Error fetching creator data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorData();
  }, [user, role, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {creator?.name}!
              </h1>
              <p className="text-gray-600">
                {creator?.niche} Creator • {creator?.location}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              {creator?.isBoosted ? (
                <Badge variant="boosted" className="text-base px-4 py-2">
                  ✨ Profile Boosted
                </Badge>
              ) : (
                <Button onClick={openBoostModal} variant="success">
                  🚀 Boost Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {creator?.bio && (
          <Card className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
            <p className="text-gray-700">{creator.bio}</p>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Profile Views</p>
                <p className="text-2xl font-bold text-gray-900">{viewStats?.totalViews || 0}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Views (Last 7 Days)</p>
                <p className="text-2xl font-bold text-gray-900">{viewStats?.recentViews || 0}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tier Status</p>
                <p className="text-2xl font-bold text-gray-900">{creator?.tier}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Platform Analytics */}
        <Card className="mb-8">
          <CreatorStats
            platforms={creator?.platforms}
            tier={creator?.tier}
            profileViews={creator?.profileViews}
          />
        </Card>

        {/* Recent Brand Views */}
        {viewStats?.viewHistory && viewStats.viewHistory.length > 0 && (
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Brand Views</h3>
            <div className="space-y-3">
              {viewStats.viewHistory.map((view, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {view.brandId?.name?.charAt(0) || 'B'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{view.brandId?.name || 'Anonymous Brand'}</p>
                      <p className="text-sm text-gray-600">{view.brandId?.industry || 'Industry not specified'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(view.viewedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <BoostModal />
    </div>
  );
};

export default CreatorDashboard;
