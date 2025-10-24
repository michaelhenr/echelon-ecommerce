import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaAd, FaStore, FaBox, FaCrown } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';

const LandingPage = () => {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount >= 5) {
      setShowAdminPassword(true);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === '333') {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <>
      <Helmet>
        <title>Echelon Society - A Higher Standard</title>
        <meta name="description" content="Welcome to Echelon Society - Your premier destination for luxury fashion and quality products" />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="landing-page">
          {/* Header with Logo */}
          <header className="landing-header">
            <div className="logo-container" onClick={handleLogoClick}>
              <div className="logo">
                <FaCrown className="logo-icon" />
                <h1>Echelon Society</h1>
                <p className="tagline">A Higher Standard</p>
              </div>
            </div>
          </header>

          {/* Admin Password Modal */}
          {showAdminPassword && (
            <div className="admin-modal-overlay">
              <div className="admin-modal">
                <h3>Admin Access</h3>
                <form onSubmit={handleAdminLogin}>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="admin-password-input"
                  />
                  <div className="admin-modal-buttons">
                    <button type="submit" className="btn btn-primary">Access Admin</button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowAdminPassword(false);
                        setLogoClickCount(0);
                        setAdminPassword('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="landing-main">
            <div className="landing-hero">
              <h2>Welcome to Echelon Society</h2>
              <p>Choose your path to join our premium platform</p>
            </div>

            {/* Four Main Options */}
            <div className="options-grid">
              {/* Client Option */}
              <Link to="/client" className="option-card client-option">
                <div className="option-icon">
                  <FaShoppingBag />
                </div>
                <h3>I'm a Client</h3>
                <p>Browse and purchase products from our curated collection of premium brands</p>
                <div className="option-features">
                  <span>• Browse Products</span>
                  <span>• Search & Filter</span>
                  <span>• Secure Checkout</span>
                </div>
              </Link>

              {/* Advertiser Option */}
              <Link to="/advertiser" className="option-card advertiser-option">
                <div className="option-icon">
                  <FaAd />
                </div>
                <h3>I'm an Advertiser</h3>
                <p>Promote your products and services with targeted advertising campaigns</p>
                <div className="option-features">
                  <span>• Create Campaigns</span>
                  <span>• Set Budget & Schedule</span>
                  <span>• Track Performance</span>
                </div>
              </Link>

              {/* Brand Owner Option */}
              <Link to="/brand" className="option-card brand-option">
                <div className="option-icon">
                  <FaStore />
                </div>
                <h3>I'm a Brand Owner</h3>
                <p>Submit your brand and showcase your products to our premium clientele</p>
                <div className="option-features">
                  <span>• Submit Brand Details</span>
                  <span>• Manage Products</span>
                  <span>• Track Sales</span>
                </div>
              </Link>

              {/* Product Submission Option */}
              <Link to="/product-submission" className="option-card product-option">
                <div className="option-icon">
                  <FaBox />
                </div>
                <h3>I have a Product</h3>
                <p>Submit individual products with detailed information and specifications</p>
                <div className="option-features">
                  <span>• Product Details</span>
                  <span>• Brand Association</span>
                  <span>• Quality Standards</span>
                </div>
              </Link>
            </div>

            {/* About Section */}
            <section className="landing-about">
              <div className="about-content">
                <h3>About Echelon Society</h3>
                <p>
                  Founded in 2017, Echelon Society began as a sportswear company and has evolved into a 
                  premium fashion brand with a mission to help those in need. We believe in "A Higher Standard" 
                  - not just in our products, but in our commitment to social responsibility.
                </p>
                <p>
                  Today, we continue our legacy by donating 50% of our profits to support the less fortunate, 
                  providing quality clothing and assistance to those who need it most. Every purchase you make 
                  contributes to this noble cause.
                </p>
              </div>
            </section>
          </main>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default LandingPage;
