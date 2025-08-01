import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuth } from './lib/auth.jsx';
import { USER_TYPES } from './utils/users.js';
import RentedCars from './components/RentedCars.jsx';

// Lazy loaded components
const Homepage = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Forgot = lazy(() => import('./components/Forgot'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const CarModel = lazy(() => import('./pages/Cars'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));

// ProtectedRoute component
const ProtectedRoute = ({ user, userType, adminOnly = false, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && userType !== USER_TYPES.ADMIN) return <Navigate to="/dashboard" replace />;
  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide header/footer on these paths
  const hideLayoutOn = ['/login', '/register', '/admin'];
  const shouldHideLayout = hideLayoutOn.includes(location.pathname);

  return (
    <div className="w-dvw">
      {!shouldHideLayout && <Header />}
      <main className="flex-1">{children}</main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

function App() {
  const { user, loading, setUser } = useAuth();
  const userType = user?.role || USER_TYPES.CUSTOMER;

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={user ? <Navigate to={userType === USER_TYPES.ADMIN ? '/admin' : '/'} replace /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/dashboard" replace /> : <Register />}
            />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vehicles" element={<CarModel />} />

            {/* Protected customer routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user} userType={userType}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user} userType={userType}>
                  <Profile user={user} setUser={setUser} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/myrents"
              element={
                <ProtectedRoute user={user} userType={userType}>
                  <RentedCars user={user} setUser={setUser} />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={user} userType={userType} adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Catch-all: redirect unknown paths to home or 404 page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;

