// client/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { refreshScrollTriggers } from './utils/gsapInit';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Accessories from './pages/Accessories';
import About from './pages/About';
import Dealers from './pages/Dealers';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBikes from './pages/admin/AdminBikes';
import AdminGear from './pages/admin/AdminGear';
import AdminParts from './pages/admin/AdminParts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminDealers from './pages/admin/AdminDealers';
import AdminBikeForm from './pages/admin/AdminBikeForm';
import AdminSubscribers from './pages/admin/AdminSubscribers';
import Contact from './pages/support/Contact';
import FAQ from './pages/support/FAQ';
import Shipping from './pages/support/Shipping';
import Returns from './pages/support/Returns';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Cookies from './pages/legal/Cookies';
import { useSessionSync } from './hooks/useSessionSync';
import { useStore } from './store/useStore';


function AppContent() {
  const location = useLocation();
  const { theme } = useStore();
  useSessionSync();

  // Sync theme to document element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => refreshScrollTriggers(), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/about" element={<About />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/motorcycle/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login context="customer" />} />

          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="bikes" element={<AdminBikes />} />
            <Route path="gear" element={<AdminGear />} />
            <Route path="parts" element={<AdminParts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="dealers" element={<AdminDealers />} />
            <Route path="bikes/new" element={<AdminBikeForm />} />
            <Route path="bikes/:id/edit" element={<AdminBikeForm />} />
            <Route path="gear/new" element={<AdminBikeForm />} />
            <Route path="gear/:id/edit" element={<AdminBikeForm />} />
            <Route path="parts/new" element={<AdminBikeForm />} />
            <Route path="parts/:id/edit" element={<AdminBikeForm />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;
