import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';

// Brand Owner Pages
import ProductManagement from './pages/brand/ProductManagement';
import BrandDashboard from './pages/brand/BrandDashboard';

// Advertiser Pages
import AdManagement from './pages/advertiser/AdManagement';
import AdvertiserDashboard from './pages/advertiser/AdvertiserDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import AdApproval from './pages/admin/AdApproval';

// Styles
import './styles/global.css';
import './styles/backgrounds.css';
import './styles/dashboard.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="App">
                <Navbar />
                <main className="main-content">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    
                    {/* Protected Routes */}
                    <Route path="/cart" element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="/orders" element={
                      <ProtectedRoute>
                        <OrderHistory />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    {/* Brand Owner Routes */}
                    <Route path="/brand/dashboard" element={
                      <ProtectedRoute allowedRoles={['brand_owner', 'admin']}>
                        <BrandDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/brand/products" element={
                      <ProtectedRoute allowedRoles={['brand_owner', 'admin']}>
                        <ProductManagement />
                      </ProtectedRoute>
                    } />
                    
                    {/* Advertiser Routes */}
                    <Route path="/advertiser/dashboard" element={
                      <ProtectedRoute allowedRoles={['advertiser', 'admin']}>
                        <AdvertiserDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/advertiser/ads" element={
                      <ProtectedRoute allowedRoles={['advertiser', 'admin']}>
                        <AdManagement />
                      </ProtectedRoute>
                    } />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/users" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <UserManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/orders" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <OrderManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/ads" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdApproval />
                      </ProtectedRoute>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;