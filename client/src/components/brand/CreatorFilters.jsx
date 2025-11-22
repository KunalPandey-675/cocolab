import { useState } from 'react';
import useBrandStore from '../../store/brandStore';
import useUIStore from '../../store/uiStore';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const CreatorFilters = () => {
  const { filters, setFilters, resetFilters } = useBrandStore();
  const { isFilterModalOpen, closeFilterModal } = useUIStore();

  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters);
    closeFilterModal();
  };

  const handleReset = () => {
    setLocalFilters({
      platform: '',
      niche: '',
      minFollowers: '',
      maxFollowers: '',
      minEngagement: '',
      location: ''
    });
    resetFilters();
  };

  const handleChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isFilterModalOpen}
      onClose={closeFilterModal}
      title="Filter Creators"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform
          </label>
          <select
            value={localFilters.platform}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        {/* Niche */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Niche
          </label>
          <select
            value={localFilters.niche}
            onChange={(e) => handleChange('niche', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Niches</option>
            <option value="Tech">Tech</option>
            <option value="Fashion">Fashion</option>
            <option value="Fitness">Fitness</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>

        {/* Follower Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Followers
            </label>
            <input
              type="number"
              value={localFilters.minFollowers}
              onChange={(e) => handleChange('minFollowers', e.target.value)}
              placeholder="e.g., 10000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Followers
            </label>
            <input
              type="number"
              value={localFilters.maxFollowers}
              onChange={(e) => handleChange('maxFollowers', e.target.value)}
              placeholder="e.g., 100000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Engagement Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Engagement Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={localFilters.minEngagement}
            onChange={(e) => handleChange('minEngagement', e.target.value)}
            placeholder="e.g., 3.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={localFilters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g., Mumbai, India"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="secondary"
            onClick={handleReset}
            className="flex-1"
          >
            Reset Filters
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatorFilters;
