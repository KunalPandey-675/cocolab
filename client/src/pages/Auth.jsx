import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { login as apiLogin, signup as apiSignup } from '../api/auth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();

  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true');
  const [role, setRole] = useState(searchParams.get('role') || 'brand');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    industry: [],
    location: '',
    niche: [],
    bio: '',
    phone: '',
    instagramLink: '',
    youtubeLink: '',
    isAgency: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        const signupData = {
          role,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ...(role === 'brand' ? {
            industry: formData.industry,
            location: formData.location,
            isAgency: formData.isAgency
          } : {
            niche: formData.niche,
            location: formData.location,
            bio: formData.bio,
            phone: formData.phone,
            instagramLink: formData.instagramLink,
            youtubeLink: formData.youtubeLink
          })
        };

        const response = await apiSignup(signupData);
        login(response.user);
      } else {
        const response = await apiLogin({
          role,
          email: formData.email,
          password: formData.password
        });
        login(response.user);
      }

      // Navigate to appropriate dashboard
      navigate(role === 'brand' ? '/brand/dashboard' : '/creator/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNicheChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      niche: selected
    });
  };

  const handleIndustryChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      industry: selected
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignup ? 'Join Cocolab today' : 'Login to your account'}
          </p>
        </div>

        <Card>
          {/* Role Toggle */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setRole('brand')}
              className={`flex-1 py-2 rounded-md font-medium transition ${
                role === 'brand'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Brand
            </button>
            <button
              onClick={() => setRole('creator')}
              className={`flex-1 py-2 rounded-md font-medium transition ${
                role === 'creator'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Creator
            </button>
          </div>

          {/* Login/Signup Toggle */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setIsSignup(false)}
              className={`pb-2 font-medium transition ${
                !isSignup
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`pb-2 font-medium transition ${
                isSignup
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {role === 'brand' ? 'Company Name' : 'Your Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={role === 'brand' ? 'PixelWave Electronics' : 'John Doe'}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            {isSignup && role === 'brand' && (
              <>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md">
                  <input
                    type="checkbox"
                    name="isAgency"
                    id="isAgency"
                    checked={formData.isAgency}
                    onChange={(e) => setFormData({ ...formData, isAgency: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="isAgency" className="text-sm font-medium text-gray-700 cursor-pointer">
                    This is an agency account
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-3 border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                    {['Fashion', 'Technology', 'Food & Beverage', 'Beauty & Cosmetics', 'Fitness & Wellness', 'Travel & Hospitality', 'Electronics', 'Gaming', 'Education', 'Finance'].map((ind) => (
                      <label key={ind} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          value={ind}
                          checked={formData.industry.includes(ind)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, industry: [...formData.industry, ind] });
                            } else {
                              setFormData({ ...formData, industry: formData.industry.filter(i => i !== ind) });
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{ind}</span>
                      </label>
                    ))}
                  </div>
                  {formData.industry.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      Selected: {formData.industry.join(', ')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mumbai, India"
                  />
                </div>
              </>
            )}

            {isSignup && role === 'creator' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niches
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-3 border border-gray-300 rounded-md">
                    {['Tech', 'Fashion', 'Fitness', 'Food', 'Travel', 'Lifestyle', 'Gaming', 'Beauty', 'Education', 'Finance'].map((n) => (
                      <label key={n} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          value={n}
                          checked={formData.niche.includes(n)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, niche: [...formData.niche, n] });
                            } else {
                              setFormData({ ...formData, niche: formData.niche.filter(i => i !== n) });
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{n}</span>
                      </label>
                    ))}
                  </div>
                  {formData.niche.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      Selected: {formData.niche.join(', ')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bengaluru, India"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91-9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram Profile Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="instagramLink"
                    value={formData.instagramLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube Channel Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://youtube.com/@yourchannel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 font-medium hover:underline"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
