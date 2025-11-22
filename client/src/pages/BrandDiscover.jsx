import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useBrandStore from '../store/brandStore';
import useUIStore from '../store/uiStore';
import { getCreators } from '../api/creator';
import { getBrandById } from '../api/brand';
import Button from '../components/ui/Button';
import CreatorCard from '../components/brand/CreatorCard';
import CreatorFilters from '../components/brand/CreatorFilters';

const BrandDiscover = () => {
  const navigate = useNavigate();
  const { user, role } = useAuthStore();
  const { creators, setCreators, filters, setLoading, loading } = useBrandStore();
  const { openFilterModal } = useUIStore();
  const [unlockedCreatorIds, setUnlockedCreatorIds] = useState([]);

  useEffect(() => {
    if (role !== 'brand') {
      navigate('/');
      return;
    }

    fetchCreators();
    fetchBrandData();
  }, [role, navigate, filters]);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const data = await getCreators(filters);
      setCreators(data);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandData = async () => {
    try {
      const brandData = await getBrandById(user.id);
      setUnlockedCreatorIds(brandData.unlockedCreators.map(c => c._id || c));
    } catch (error) {
      console.error('Error fetching brand data:', error);
    }
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Creators</h1>
          <p className="text-gray-600">
            Find the perfect creators for your brand using our advanced filters
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={openFilterModal} variant="outline">
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              
              {activeFilterCount > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {filters.platform && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      Platform: {filters.platform}
                    </span>
                  )}
                  {filters.niche && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                      Niche: {filters.niche}
                    </span>
                  )}
                  {filters.location && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      Location: {filters.location}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600">
              {creators.length} creator{creators.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Creators Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading creators...</p>
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No creators found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <Button onClick={openFilterModal}>
              Modify Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <CreatorCard
                key={creator._id}
                creator={creator}
                brandId={user.id}
                isUnlocked={unlockedCreatorIds.includes(creator._id)}
              />
            ))}
          </div>
        )}
      </div>

      <CreatorFilters />
    </div>
  );
};

export default BrandDiscover;
