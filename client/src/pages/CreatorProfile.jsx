import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { getCreatorById, logProfileView } from '../api/creator';
import { getBrandById, unlockCreatorContact } from '../api/brand';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role, updateUser } = useAuthStore();
  const [creator, setCreator] = useState(null);
  const [brand, setBrand] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch creator data
        const creatorData = await getCreatorById(id);
        setCreator(creatorData);

        // If brand, fetch brand data and log view
        if (role === 'brand' && user?.id) {
          const brandData = await getBrandById(user.id);
          setBrand(brandData);

          // Check if already unlocked
          const unlocked = brandData.unlockedCreators.some(
            c => (c._id || c) === id
          );
          setIsUnlocked(unlocked);

          // Log profile view
          await logProfileView(id, user.id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, role, user]);

  const handleUnlock = async () => {
    if (!brand || brand.credits < 1) {
      alert('Insufficient credits!');
      return;
    }

    setUnlocking(true);
    try {
      const response = await unlockCreatorContact(user.id, id);
      setIsUnlocked(true);
      setBrand(prev => ({ ...prev, credits: response.credits }));
      updateUser({ credits: response.credits });
      alert('Contact unlocked successfully!');
    } catch (error) {
      console.error('Error unlocking contact:', error);
      alert(error.response?.data?.message || 'Failed to unlock contact');
    } finally {
      setUnlocking(false);
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: 'Instagram',
      youtube: 'YouTube',
      tiktok: 'TikTok'
    };
    return icons[platform] || 'Website';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Creator not found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Search
        </button>

        {/* Header Card */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
                  {creator.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className={`text-3xl font-bold text-gray-900 ${role === 'brand' && !isUnlocked ? 'blur-contact' : ''}`}>
                      {creator.name}
                    </h1>
                    {creator.isVerified && (
                      <Badge variant="success" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <p className="text-gray-600">{creator.location}</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {Array.isArray(creator.niche) ? (
                  creator.niche.map((n, idx) => (
                    <Badge key={idx} variant="primary">{n}</Badge>
                  ))
                ) : (
                  <Badge variant="primary">{creator.niche}</Badge>
                )}
                <Badge variant={creator.tier === 'Established' ? 'success' : creator.tier === 'Growth' ? 'primary' : 'warning'}>
                  {creator.tier} Creator
                </Badge>
                {creator.isBoosted && <Badge variant="boosted">Boosted</Badge>}
              </div>

              {creator.bio && (
                <p className="text-gray-700 leading-relaxed mb-4">{creator.bio}</p>
              )}

              {/* Stats Row */}
              <div className="flex gap-6 text-sm mb-4">
                {creator.averageRating !== undefined && (
                  <div>
                    <span className="text-gray-600">Rating: </span>
                    <span className="font-semibold text-gray-900">
                      {creator.averageRating?.toFixed(1)}/5 ({Math.round(creator.averageRating)} stars)
                    </span>
                  </div>
                )}
                {creator.rate && (
                  <div>
                    <span className="text-gray-600">Rate: </span>
                    <span className="font-semibold text-gray-900">${creator.rate}</span>
                  </div>
                )}
                {creator.totalCollaborations !== undefined && (
                  <div>
                    <span className="text-gray-600">Collaborations: </span>
                    <span className="font-semibold text-gray-900">{creator.totalCollaborations}</span>
                  </div>
                )}
              </div>

              {/* Social Media Links */}
              {(creator.instagramLink || creator.youtubeLink) && (
                <div className="flex gap-3">
                  {creator.instagramLink && (
                    <a
                      href={creator.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition"
                    >
                      Instagram
                    </a>
                  )}
                  {creator.youtubeLink && (
                    <a
                      href={creator.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      ▶️ YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 bg-white rounded-t-lg px-4">
          {['overview', 'platforms', 'portfolio', 'testimonials'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-3 font-medium transition capitalize ${selectedTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab === 'platforms' ? 'Social Media' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <>
            {/* Platform Analytics */}
            <Card className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Analytics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {creator.platforms?.map((platform, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{getPlatformIcon(platform.name)}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 capitalize">{platform.name}</h3>
                        <p className={`text-sm text-gray-600 ${role === 'brand' && !isUnlocked ? 'blur-contact' : ''}`}>
                          {platform.handle}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Followers</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {(platform.followers / 1000).toFixed(1)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Avg Views</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {(platform.avgViews / 1000).toFixed(1)}K
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Engagement Rate</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-500 h-3 rounded-full"
                              style={{ width: `${Math.min(platform.engagementRate * 10, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-lg font-bold text-green-600">
                            {platform.engagementRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills & Rate */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {creator.skills && creator.skills.length > 0 && (
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              )}
              {creator.rate && (
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-3">Collaboration Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">${creator.rate}</p>
                </Card>
              )}
            </div>

            {/* Audience Demographics */}
            {creator.audience && (
              <Card className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Demographics</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Top Country */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Top Country</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-600">Region:</span>
                      <span className="text-lg text-gray-700">{creator.audience.topCountry}</span>
                    </div>
                  </div>

                  {/* Age Brackets */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Age Distribution</h3>
                    <div className="space-y-2">
                      {creator.audience.ageBrackets && Object.entries(creator.audience.ageBrackets).map(([range, percentage]) => (
                        <div key={range} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{range}</span>
                          <span className="font-semibold text-gray-900">{percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gender Split */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Gender Split</h3>
                    {creator.audience.genderSplit && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Male</span>
                            <span className="font-semibold text-gray-900">{creator.audience.genderSplit.male}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${creator.audience.genderSplit.male}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Female</span>
                            <span className="font-semibold text-gray-900">{creator.audience.genderSplit.female}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-pink-500 h-2 rounded-full"
                              style={{ width: `${creator.audience.genderSplit.female}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </>
        )}

        {selectedTab === 'platforms' && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {creator.platforms?.map((platform, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{getPlatformIcon(platform.name)}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 capitalize">{platform.name}</h3>
                      <p className={`text-sm text-gray-600 ${role === 'brand' && !isUnlocked ? 'blur-contact' : ''}`}>
                        {platform.handle}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Followers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(platform.followers / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Avg Views</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(platform.avgViews / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Engagement Rate</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full"
                            style={{ width: `${Math.min(platform.engagementRate * 10, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          {platform.engagementRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedTab === 'portfolio' && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
            {creator.portfolio && creator.portfolio.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {creator.portfolio.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="space-y-1 text-sm">
                        {item.brandName && <p><span className="font-medium">Brand:</span> {item.brandName}</p>}
                        {item.campaignType && <p><span className="font-medium">Type:</span> {item.campaignType}</p>}
                        {item.results && <p><span className="font-medium">Results:</span> {item.results}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">No portfolio items yet</p>
            )}
          </Card>
        )}

        {selectedTab === 'testimonials' && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Testimonials</h2>
            {creator.testimonials && creator.testimonials.length > 0 ? (
              <div className="space-y-4">
                {creator.testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 bg-gray-50 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-gray-900">{testimonial.brandName}</p>
                      <span className="text-gray-900 font-semibold">{testimonial.rating}/5</span>
                    </div>
                    {testimonial.comment && (
                      <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">No testimonials yet</p>
            )}
          </Card>
        )}

        {/* Contact Information (Only for brands) */}
        {role === 'brand' && (
          <Card className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

            {isUnlocked ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 text-green-700 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">Contact Unlocked</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${creator.email}`} className="text-blue-600 hover:underline">
                      {creator.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${creator.phone}`} className="text-blue-600 hover:underline">
                      {creator.phone}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Unlock Contact Details</h3>
                    <p className="text-sm text-gray-600">
                      Get full access to this creator's email and phone number
                    </p>
                  </div>
                  <div className="text-xl font-bold text-gray-600">Locked</div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="blur-contact select-none">
                      Email: {creator.email?.substring(0, 3)}*****@*****.com
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="blur-contact select-none">
                      Phone: +91-**********
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Cost: <span className="font-semibold text-gray-900">1 Credit</span>
                    <br />
                    Your balance: <span className="font-semibold text-blue-600">{brand?.credits || 0} Credits</span>
                  </div>
                  <Button
                    onClick={handleUnlock}
                    disabled={unlocking || !brand || brand.credits < 1}
                    size="lg"
                  >
                    {unlocking ? 'Unlocking...' : 'Unlock Contact (1 Credit)'}
                  </Button>
                </div>

                {brand && brand.credits < 1 && (
                  <p className="text-sm text-red-600 mt-3">
                    ⚠️ Insufficient credits. Please contact support to purchase more credits.
                  </p>
                )}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;
