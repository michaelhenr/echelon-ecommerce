import React from 'react';
import './Backgrounds.css';

// Art Deco Flamingo Background Component
export const ArtDecoBackground = ({ children, className = '' }) => {
  return (
    <div className={`art-deco-background ${className}`}>
      <div className="background-pattern">
        <div className="flamingo-element"></div>
        <div className="geometric-patterns">
          <div className="pattern-1"></div>
          <div className="pattern-2"></div>
          <div className="pattern-3"></div>
        </div>
      </div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};

// Heraldic Crest Background Component
export const HeraldicBackground = ({ children, className = '' }) => {
  return (
    <div className={`heraldic-background ${className}`}>
      <div className="crest-container">
        <div className="crown-element"></div>
        <div className="shield-element">
          <div className="flamingo-crest"></div>
        </div>
        <div className="banner-element">
          <span>ELEGANCE SINCE 2025</span>
        </div>
      </div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};

// Minimalist Flamingo Background Component
export const MinimalistBackground = ({ children, className = '' }) => {
  return (
    <div className={`minimalist-background ${className}`}>
      <div className="flamingo-silhouette"></div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};

// Product Showcase Background Component
export const ProductShowcaseBackground = ({ children, className = '' }) => {
  return (
    <div className={`product-showcase-background ${className}`}>
      <div className="product-display">
        <div className="product-1">
          <div className="product-image"></div>
          <div className="product-details">
            <div className="brand-logo"></div>
            <div className="product-text">Echelon Studios</div>
            <div className="product-year">EST 2017</div>
          </div>
        </div>
        <div className="product-2">
          <div className="product-image"></div>
          <div className="product-details">
            <div className="brand-logo"></div>
            <div className="product-text">Echelon Studios</div>
            <div className="product-year">EST 2017</div>
          </div>
        </div>
      </div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};

// Luxury Study Background Component
export const LuxuryStudyBackground = ({ children, className = '' }) => {
  return (
    <div className={`luxury-study-background ${className}`}>
      <div className="study-elements">
        <div className="desk-element"></div>
        <div className="lamp-element"></div>
        <div className="books-element"></div>
        <div className="flamingo-statue"></div>
        <div className="chair-element"></div>
      </div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};
