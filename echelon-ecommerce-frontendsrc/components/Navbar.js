import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout, hasRole, hasAnyRole } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'brand_owner':
        return '/brand/dashboard';
      case 'advertiser':
        return '/advertiser/dashboard';
      default:
        return '/profile';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <h2>Echelon</h2>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <Link to="/client" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          
          {isAuthenticated && (
            <>
              <Link to="/orders" className="navbar-link">
                Orders
              </Link>
              
              {hasAnyRole(['brand_owner', 'admin']) && (
                <Link to="/brand/products" className="navbar-link">
                  My Products
                </Link>
              )}
              
              {hasAnyRole(['advertiser', 'admin']) && (
                <Link to="/advertiser/ads" className="navbar-link">
                  My Ads
                </Link>
              )}
              
              {hasRole('admin') && (
                <Link to="/admin/dashboard" className="navbar-link">
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right side items */}
        <div className="navbar-right">
          {/* Cart */}
          {isAuthenticated && (
            <Link to="/cart" className="navbar-cart">
              <FaShoppingCart />
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
          )}

          {/* User Menu */}
          <div className="navbar-user">
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to={getDashboardLink()} className="user-link">
                  <FaUser />
                  <span>{user.username}</span>
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/register" className="navbar-link register-link">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="mobile-menu-btn">
            <FaBars />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
