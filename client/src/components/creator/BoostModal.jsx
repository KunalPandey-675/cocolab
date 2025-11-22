import { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { boostCreatorProfile } from '../../api/creator';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const BoostModal = () => {
  const { isBoostModalOpen, closeBoostModal } = useUIStore();
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBoost = async () => {
    setLoading(true);
    try {
      await boostCreatorProfile(user.id);
      updateUser({ isBoosted: true });
      setSuccess(true);
      setTimeout(() => {
        closeBoostModal();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error boosting profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isBoostModalOpen}
      onClose={closeBoostModal}
      title="Boost Your Profile"
    >
      {success ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Boosted!</h3>
          <p className="text-gray-600">Your profile will appear at the top of search results.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-4">
              <h4 className="text-lg font-semibold text-purple-900 mb-2">
                🚀 Get Maximum Visibility
              </h4>
              <p className="text-purple-700 text-sm">
                Boost your profile to appear at the top of brand searches and get 3x more profile views!
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-sm">Featured at the top of search results</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-sm">Special "Boosted" badge on your profile</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-sm">Increased brand discovery and engagement</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={closeBoostModal}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleBoost}
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Boosting...' : 'Boost Now'}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default BoostModal;
