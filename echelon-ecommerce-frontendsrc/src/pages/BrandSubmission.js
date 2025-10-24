import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaStore, FaUpload, FaCheck } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';
import toast from 'react-hot-toast';

const BrandSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brandName: '',
    description: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    establishedYear: '',
    category: '',
    logo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      logo: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Brand submission successful! We will review your application.');
      setIsSubmitted(true);
      
      // Redirect to client page after 3 seconds
      setTimeout(() => {
        navigate('/client');
      }, 3000);
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <LuxuryStudyBackground>
        <div className="brand-submission-page">
          <div className="submission-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h2>Brand Submitted Successfully!</h2>
            <p>Thank you for submitting your brand to Echelon Society. We will review your application and get back to you within 2-3 business days.</p>
            <p>You will receive an email confirmation shortly.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/client')}
            >
              Return to Home
            </button>
          </div>
        </div>
      </LuxuryStudyBackground>
    );
  }

  return (
    <>
      <Helmet>
        <title>Submit Your Brand - Echelon Society</title>
        <meta name="description" content="Submit your brand to join Echelon Society's premium marketplace" />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="brand-submission-page">
          <div className="submission-container">
            <div className="submission-header">
              <div className="header-icon">
                <FaStore />
              </div>
              <h1>Submit Your Brand</h1>
              <p>Join Echelon Society's premium marketplace and showcase your products to our exclusive clientele</p>
            </div>

            <form onSubmit={handleSubmit} className="submission-form">
              <div className="form-section">
                <h3>Brand Information</h3>
                
                <div className="form-group">
                  <label htmlFor="brandName">Brand Name *</label>
                  <input
                    type="text"
                    id="brandName"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your brand name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Brand Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Tell us about your brand, its values, and what makes it unique"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="fashion">Fashion</option>
                    <option value="accessories">Accessories</option>
                    <option value="footwear">Footwear</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="home">Home & Living</option>
                    <option value="beauty">Beauty & Cosmetics</option>
                    <option value="sports">Sports & Fitness</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="establishedYear">Established Year</label>
                  <input
                    type="number"
                    id="establishedYear"
                    name="establishedYear"
                    value={formData.establishedYear}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="e.g., 2020"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Contact Information</h3>
                
                <div className="form-group">
                  <label htmlFor="contactEmail">Contact Email *</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone">Contact Phone</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+20 123 456 7890"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourbrand.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Business Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter your business address"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Brand Logo</h3>
                
                <div className="form-group">
                  <label htmlFor="logo">Upload Brand Logo</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label htmlFor="logo" className="file-upload-label">
                      <FaUpload />
                      Choose Logo File
                    </label>
                  </div>
                  {formData.logo && (
                    <p className="file-selected">Selected: {formData.logo.name}</p>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default BrandSubmission;
