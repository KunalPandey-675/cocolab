import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { isLoggedIn, role, user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">InfluencerConnect</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-medium text-gray-900">{user?.name}</span>
                </span>
                {role === 'brand' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {user?.credits} Credits
                  </span>
                )}
                <Link
                  to={role === 'brand' ? '/brand/dashboard' : '/creator/dashboard'}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth?signup=true"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
