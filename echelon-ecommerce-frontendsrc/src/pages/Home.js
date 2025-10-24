import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaChartLine, FaUsers, FaAd } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Echelon Society - A Higher Standard</title>
        <meta name="description" content="Discover premium products from Echelon Society and curated brands. A Higher Standard in fashion and quality." />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="home-page home-background">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Welcome to Echelon Society</h1>
              <p>A Higher Standard in Fashion and Quality</p>
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
              <h2>Why Choose Echelon Society?</h2>
              <p>Experience premium quality and social responsibility with every purchase</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaShoppingBag />
                </div>
                <h3>Premium Products</h3>
                <p>Curated selection of high-quality products from Echelon Society and trusted partner brands</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaChartLine />
                </div>
                <h3>Social Impact</h3>
                <p>50% of our profits go directly to helping the less fortunate in our community</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <h3>Established 2017</h3>
                <p>From sportswear to premium fashion, we've been serving our community for years</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaAd />
                </div>
                <h3>A Higher Standard</h3>
                <p>We believe in quality, craftsmanship, and making a positive difference in the world</p>
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
