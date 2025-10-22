import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaClock, FaTruck, FaBox } from 'react-icons/fa';

const Checkout = () => {
  return (
    <>
      <Helmet>
        <title>Checkout - Echelon Ecommerce</title>
        <meta name="description" content="Complete your purchase" />
      </Helmet>

      <div className="checkout-page products-background">
        <div className="container">
          <div className="checkout-header">
            <h1>Checkout</h1>
            <p>Complete your purchase</p>
          </div>

          <div className="checkout-content">
            <div className="checkout-form">
              <div className="form-section">
                <h2>Shipping Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input type="text" id="zipCode" required />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" required />
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-lg btn-full">
                Complete Purchase
              </button>
            </div>

            <div className="checkout-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                
                <div className="order-items">
                  <div className="order-item">
                    <div className="item-info">
                      <h4>Wireless Headphones</h4>
                      <p>Quantity: 1</p>
                    </div>
                    <span className="item-price">$99.99</span>
                  </div>
                  
                  <div className="order-item">
                    <div className="item-info">
                      <h4>Phone Case</h4>
                      <p>Quantity: 2</p>
                    </div>
                    <span className="item-price">$59.98</span>
                  </div>
                </div>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>$159.97</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax</span>
                  <span>$12.80</span>
                </div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>$172.77</span>
                </div>
              </div>

              <div className="security-info">
                <h3>Secure Checkout</h3>
                <div className="security-features">
                  <div className="security-item">
                    <FaCheckCircle />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="security-item">
                    <FaCheckCircle />
                    <span>PCI Compliant</span>
                  </div>
                  <div className="security-item">
                    <FaCheckCircle />
                    <span>Money Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
