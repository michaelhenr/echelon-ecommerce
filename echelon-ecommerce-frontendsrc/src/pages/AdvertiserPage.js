import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaAd, FaUpload, FaCheck, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';
import toast from 'react-hot-toast';

const AdvertiserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    budget: '',
    startDate: '',
    endDate: '',
    targetAudience: {
      ageMin: '',
      ageMax: '',
      categories: [],
      location: ''
    },
    content: {
      imageUrl: '',
      videoUrl: '',
      linkUrl: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('targetAudience.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          [field]: value
        }
      }));
    } else if (name.startsWith('content.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        categories: checked 
          ? [...prev.targetAudience.categories, value]
          : prev.targetAudience.categories.filter(cat => cat !== value)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Ad campaign submitted successfully! We will review your application.');
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
        <div className="advertiser-page">
          <div className="submission-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h2>Ad Campaign Submitted Successfully!</h2>
            <p>Thank you for submitting your advertising campaign to Echelon Society. We will review your application and get back to you within 2-3 business days.</p>
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
        <title>Advertiser Dashboard - Echelon Society</title>
        <meta name="description" content="Create and manage your advertising campaigns on Echelon Society" />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="advertiser-page">
          <div className="advertiser-container">
            <div className="advertiser-header">
              <div className="header-icon">
                <FaAd />
              </div>
              <h1>Create Ad Campaign</h1>
              <p>Promote your products and services to Echelon Society's premium clientele</p>
            </div>

            <form onSubmit={handleSubmit} className="advertiser-form">
              <div className="form-section">
                <h3>Campaign Information</h3>
                
                <div className="form-group">
                  <label htmlFor="title">Campaign Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter campaign title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Campaign Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Describe your campaign and its objectives"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Ad Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select ad type</option>
                    <option value="banner">Banner Ad</option>
                    <option value="video">Video Ad</option>
                    <option value="popup">Popup Ad</option>
                    <option value="sidebar">Sidebar Ad</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>Budget & Schedule</h3>
                
                <div className="form-group">
                  <label htmlFor="budget">Campaign Budget (EGP) *</label>
                  <div className="budget-input">
                    <FaDollarSign className="budget-icon" />
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      min="100"
                      step="10"
                      placeholder="1000"
                    />
                  </div>
                  <p className="form-help">Minimum budget: 100 EGP</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date *</label>
                    <div className="date-input">
                      <FaCalendarAlt className="date-icon" />
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">End Date *</label>
                    <div className="date-input">
                      <FaCalendarAlt className="date-icon" />
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Target Audience</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ageMin">Minimum Age</label>
                    <input
                      type="number"
                      id="ageMin"
                      name="targetAudience.ageMin"
                      value={formData.targetAudience.ageMin}
                      onChange={handleInputChange}
                      min="13"
                      max="100"
                      placeholder="18"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ageMax">Maximum Age</label>
                    <input
                      type="number"
                      id="ageMax"
                      name="targetAudience.ageMax"
                      value={formData.targetAudience.ageMax}
                      onChange={handleInputChange}
                      min="13"
                      max="100"
                      placeholder="65"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Target Categories</label>
                  <div className="checkbox-group">
                    {['fashion', 'accessories', 'footwear', 'jewelry', 'home', 'beauty', 'sports', 'electronics'].map(category => (
                      <label key={category} className="checkbox-label">
                        <input
                          type="checkbox"
                          value={category}
                          checked={formData.targetAudience.categories.includes(category)}
                          onChange={handleCategoryChange}
                        />
                        <span className="checkbox-text">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Target Location</label>
                  <input
                    type="text"
                    id="location"
                    name="targetAudience.location"
                    value={formData.targetAudience.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Cairo, Alexandria, Egypt"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Ad Content</h3>
                
                <div className="form-group">
                  <label htmlFor="imageUrl">Image URL</label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="content.imageUrl"
                    value={formData.content.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="videoUrl">Video URL</label>
                  <input
                    type="url"
                    id="videoUrl"
                    name="content.videoUrl"
                    value={formData.content.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video.mp4"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="linkUrl">Destination URL *</label>
                  <input
                    type="url"
                    id="linkUrl"
                    name="content.linkUrl"
                    value={formData.content.linkUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://yourwebsite.com"
                  />
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
                  {isSubmitting ? 'Submitting...' : 'Submit Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default AdvertiserPage;
