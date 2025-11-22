import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import CreatorDashboard from './pages/CreatorDashboard';
import BrandDashboard from './pages/BrandDashboard';
import BrandDiscover from './pages/BrandDiscover';
import CreatorProfile from './pages/CreatorProfile';
import useAuthStore from './store/authStore';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isLoggedIn, role } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Creator Routes */}
            <Route
              path="/creator/dashboard"
              element={
                <ProtectedRoute allowedRole="creator">
                  <CreatorDashboard />
                </ProtectedRoute>
              }
            />

            {/* Brand Routes */}
            <Route
              path="/brand/dashboard"
              element={
                <ProtectedRoute allowedRole="brand">
                  <BrandDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/brand/discover"
              element={
                <ProtectedRoute allowedRole="brand">
                  <BrandDiscover />
                </ProtectedRoute>
              }
            />

            {/* Creator Profile (accessible by brands and the creator themselves) */}
            <Route
              path="/creator/:id"
              element={
                <ProtectedRoute>
                  <CreatorProfile />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
