import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaChartLine, FaUsers, FaAd } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Echelon Ecommerce - Your Premier Shopping Destination</title>
        <meta name="description" content="Discover amazing products from trusted brands on Echelon Ecommerce platform" />
      </Helmet>

      <div className="home-page home-background">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Welcome to Echelon Ecommerce</h1>
              <p>Your premier destination for quality products and seamless shopping experience</p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary btn-lg">
                  <FaShoppingBag />
                  Shop Now
                </Link>
                <Link to="/register" className="btn btn-outline btn-lg">
                  Join Echelon
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/hero-image.jpg" alt="Echelon Ecommerce" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose Echelon?</h2>
              <p>Experience the future of e-commerce with our innovative platform</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaShoppingBag />
                </div>
                <h3>Wide Product Selection</h3>
                <p>Browse thousands of products from trusted brands across various categories</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaChartLine />
                </div>
                <h3>Advanced Analytics</h3>
                <p>Track your sales and performance with comprehensive analytics dashboard</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <h3>Multi-Role Platform</h3>
                <p>Support for clients, brand owners, advertisers, and administrators</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaAd />
                </div>
                <h3>Advertising Solutions</h3>
                <p>Promote your products with our advanced advertising management system</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Brands</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of satisfied customers and start shopping today</p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Create Account
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </section>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default Home;
