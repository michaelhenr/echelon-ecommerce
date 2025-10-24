import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaHeart, FaGift, FaCheckCircle } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';
import toast from 'react-hot-toast';

const ThankYou = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Simulate email submission
    toast.success('Thank you! You will receive your 10% discount code via email shortly.');
    setIsSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Thank You - Echelon Society</title>
        <meta name="description" content="Thank you for choosing Echelon Society. Get 10% off your next order!" />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="thank-you-page">
          <div className="thank-you-container">
            <div className="thank-you-content">
              <div className="thank-you-icon">
                <FaHeart />
              </div>
              
              <h1>Thank You for Choosing Echelon Society!</h1>
              
              <p className="thank-you-message">
                We're grateful for your support and trust in our brand. Your purchase helps us continue 
                our mission of making a positive impact in our community.
              </p>

              <div className="discount-offer">
                <div className="discount-icon">
                  <FaGift />
                </div>
                <h2>Special Offer Just for You!</h2>
                <p>Get 10% off your next order as a thank you for being part of the Echelon Society family.</p>
                
                {!isSubmitted ? (
                  <form onSubmit={handleEmailSubmit} className="email-form">
                    <div className="form-group">
                      <label htmlFor="email">Enter your email to receive your discount code:</label>
                      <div className="email-input-group">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="email-input"
                        />
                        <button type="submit" className="btn btn-primary">
                          Get 10% Off
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="success-message">
                    <FaCheckCircle className="success-icon" />
                    <p>Discount code sent to your email! Check your inbox.</p>
                  </div>
                )}
              </div>

              <div className="social-impact">
                <h3>Your Impact</h3>
                <p>
                  By choosing Echelon Society, you're directly contributing to our mission. 
                  50% of our profits go to helping the less fortunate in our community, 
                  providing clothing and essential items to those who need it most.
                </p>
                <div className="impact-stats">
                  <div className="stat">
                    <span className="stat-number">50%</span>
                    <span className="stat-label">Profits Donated</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">1000+</span>
                    <span className="stat-label">Lives Touched</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">2017</span>
                    <span className="stat-label">Established</span>
                  </div>
                </div>
              </div>

              <div className="next-steps">
                <h3>What's Next?</h3>
                <div className="steps-grid">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Order Processing</h4>
                      <p>Your order will be processed within 1-2 business days.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Shipping</h4>
                      <p>We'll ship your order using our reliable delivery partners.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Delivery</h4>
                      <p>You'll receive your order within 3-5 business days.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h3>Need Help?</h3>
                <p>
                  If you have any questions about your order or need assistance, 
                  please don't hesitate to contact our customer service team.
                </p>
                <div className="contact-methods">
                  <a href="mailto:support@echelonsociety.store" className="contact-link">
                    support@echelonsociety.store
                  </a>
                  <a href="tel:+201234567890" className="contact-link">
                    +20 123 456 7890
                  </a>
                </div>
              </div>

              <div className="thank-you-actions">
                <a href="/products" className="btn btn-primary btn-lg">
                  Continue Shopping
                </a>
                <a href="/about" className="btn btn-outline btn-lg">
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default ThankYou;
