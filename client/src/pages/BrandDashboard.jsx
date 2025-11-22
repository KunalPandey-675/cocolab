import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { getBrandById } from '../api/brand';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const BrandDashboard = () => {
  const navigate = useNavigate();
  const { user, role } = useAuthStore();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'brand') {
      navigate('/');
      return;
    }

    const fetchBrandData = async () => {
      try {
        const brandData = await getBrandById(user.id);
        setBrand(brandData);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {brand?.name}!
          </h1>
          <p className="text-gray-600">{brand?.industry} • {brand?.location}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Credits</p>
                <p className="text-2xl font-bold text-gray-900">{brand?.credits || 0}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Unlocked Creators</p>
                <p className="text-2xl font-bold text-gray-900">{brand?.unlockedCreators?.length || 0}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Quick Action</p>
                <Button
                  size="sm"
                  onClick={() => navigate('/brand/discover')}
                  className="mt-1"
                >
                  Find Creators
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Action */}
        <Card className="text-center py-12">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Find Your Perfect Creators?
            </h2>
            <p className="text-gray-600 mb-6">
              Use our advanced filters to discover creators that match your brand's needs. 
              Filter by platform, niche, engagement rate, and more.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/brand/discover')}
            >
              Discover Creators
            </Button>
          </div>
        </Card>

        {/* Unlocked Creators */}
        {brand?.unlockedCreators && brand.unlockedCreators.length > 0 && (
          <Card className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Unlocked Creators</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brand.unlockedCreators.map((creator) => (
                <div
                  key={creator._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{creator.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{creator.niche}</p>
                  <div className="flex gap-2 text-xs">
                    {creator.platforms?.map((platform, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded capitalize">
                        {platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BrandDashboard;
