import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaHeart, FaHandsHelping, FaCrown, FaShirt } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Echelon Society - A Higher Standard</title>
        <meta name="description" content="Learn about Echelon Society's journey from sportswear to premium fashion, our mission to help the less fortunate, and our commitment to quality." />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="about-page">
          {/* Hero Section */}
          <section className="about-hero">
            <div className="container">
              <div className="about-hero-content">
                <h1>About Echelon Society</h1>
                <p className="hero-subtitle">A Higher Standard in Fashion and Social Responsibility</p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="our-story">
            <div className="container">
              <div className="story-content">
                <div className="story-text">
                  <h2>Our Story</h2>
                  <p>
                    Founded in 2017, Echelon Society began as a sportswear company with a vision to create 
                    high-quality athletic apparel. What started as a small venture has evolved into something 
                    much greater - a premium fashion brand with a heart for social change.
                  </p>
                  <p>
                    Over the years, we've grown from focusing solely on sportswear to becoming a comprehensive 
                    fashion brand that represents "A Higher Standard" in everything we do. Our journey has been 
                    marked by continuous growth, innovation, and an unwavering commitment to our community.
                  </p>
                </div>
                <div className="story-image">
                  <div className="image-placeholder">
                    <FaShirt className="story-icon" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mission-section">
            <div className="container">
              <div className="mission-content">
                <div className="mission-image">
                  <div className="image-placeholder">
                    <FaHeart className="mission-icon" />
                  </div>
                </div>
                <div className="mission-text">
                  <h2>Our Mission</h2>
                  <p>
                    At Echelon Society, we believe that fashion should not only look good but also do good. 
                    That's why we've made it our mission to help those in need by donating 50% of our profits 
                    to support the less fortunate in our community.
                  </p>
                  <p>
                    We provide quality clothing and essential items to those who need it most, ensuring that 
                    everyone has access to decent clothing regardless of their economic situation. This commitment 
                    to social responsibility is at the core of everything we do.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <div className="container">
              <h2 className="section-title">Our Values</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon">
                    <FaCrown />
                  </div>
                  <h3>Quality First</h3>
                  <p>We maintain the highest standards in materials, craftsmanship, and design to ensure every product meets our "Higher Standard" promise.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <FaHeart />
                  </div>
                  <h3>Social Responsibility</h3>
                  <p>We're committed to making a positive impact in our community by supporting those in need through our charitable initiatives.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <FaHandsHelping />
                  </div>
                  <h3>Community Support</h3>
                  <p>We believe in giving back to the community that has supported us, creating a cycle of positive change and mutual support.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="impact-section">
            <div className="container">
              <div className="impact-content">
                <h2>Our Impact</h2>
                <div className="impact-stats">
                  <div className="stat-item">
                    <div className="stat-number">50%</div>
                    <div className="stat-label">Profits Donated</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">2017</div>
                    <div className="stat-label">Established</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Lives Touched</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">Commitment</div>
                  </div>
                </div>
                <p className="impact-text">
                  Every purchase you make with Echelon Society directly contributes to our mission of helping 
                  those in need. Together, we're building a community where fashion meets compassion, and 
                  every customer becomes a partner in our social impact journey.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="cta-section">
            <div className="container">
              <div className="cta-content">
                <h2>Join Our Mission</h2>
                <p>Be part of something greater. Every purchase makes a difference.</p>
                <div className="cta-actions">
                  <a href="/products" className="btn btn-primary btn-lg">
                    Shop Now
                  </a>
                  <a href="/register" className="btn btn-outline btn-lg">
                    Join Echelon
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default About;
