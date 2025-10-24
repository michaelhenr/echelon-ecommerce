import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaUpload, FaCheck, FaStore } from 'react-icons/fa';
import { LuxuryStudyBackground } from '../components/Backgrounds';
import toast from 'react-hot-toast';

const ProductSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    brandName: '',
    brandDescription: '',
    brandEmail: '',
    brandPhone: '',
    images: [],
    specifications: {
      color: '',
      material: '',
      size: '',
      weight: '',
      dimensions: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [needsBrand, setNeedsBrand] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('specifications.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if brand exists or needs to be created
      if (!formData.brand && !formData.brandName) {
        toast.error('Please select an existing brand or provide brand information');
        setIsSubmitting(false);
        return;
      }

      if (!formData.brand && formData.brandName) {
        setNeedsBrand(true);
        toast.info('Brand information will be submitted along with the product');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Product submission successful! We will review your application.');
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
        <div className="product-submission-page">
          <div className="submission-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h2>Product Submitted Successfully!</h2>
            <p>Thank you for submitting your product to Echelon Society. We will review your application and get back to you within 2-3 business days.</p>
            {needsBrand && (
              <p>Your brand information has also been submitted for review.</p>
            )}
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
        <title>Submit Your Product - Echelon Society</title>
        <meta name="description" content="Submit your product to Echelon Society's premium marketplace" />
      </Helmet>

      <LuxuryStudyBackground>
        <div className="product-submission-page">
          <div className="submission-container">
            <div className="submission-header">
              <div className="header-icon">
                <FaBox />
              </div>
              <h1>Submit Your Product</h1>
              <p>Add your product to Echelon Society's premium marketplace</p>
            </div>

            <form onSubmit={handleSubmit} className="submission-form">
              <div className="form-section">
                <h3>Product Information</h3>
                
                <div className="form-group">
                  <label htmlFor="productName">Product Name *</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Product Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Describe your product, its features, and benefits"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price (EGP) *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
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
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                      <option value="footwear">Footwear</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="home">Home & Living</option>
                      <option value="beauty">Beauty & Cosmetics</option>
                      <option value="sports">Sports & Fitness</option>
                      <option value="electronics">Electronics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Brand Information</h3>
                
                <div className="form-group">
                  <label htmlFor="brand">Existing Brand</label>
                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                  >
                    <option value="">Select existing brand</option>
                    <option value="echelon">Echelon Society</option>
                    <option value="other">Other Brand</option>
                  </select>
                  <p className="form-help">If your brand is not listed, please provide brand information below</p>
                </div>

                {(!formData.brand || formData.brand === 'other') && (
                  <div className="brand-info">
                    <h4>New Brand Information</h4>
                    
                    <div className="form-group">
                      <label htmlFor="brandName">Brand Name *</label>
                      <input
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleInputChange}
                        placeholder="Enter brand name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="brandDescription">Brand Description</label>
                      <textarea
                        id="brandDescription"
                        name="brandDescription"
                        value={formData.brandDescription}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Brief description of your brand"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="brandEmail">Brand Email *</label>
                        <input
                          type="email"
                          id="brandEmail"
                          name="brandEmail"
                          value={formData.brandEmail}
                          onChange={handleInputChange}
                          placeholder="brand@email.com"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="brandPhone">Brand Phone</label>
                        <input
                          type="tel"
                          id="brandPhone"
                          name="brandPhone"
                          value={formData.brandPhone}
                          onChange={handleInputChange}
                          placeholder="+20 123 456 7890"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h3>Product Specifications</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <input
                      type="text"
                      id="color"
                      name="specifications.color"
                      value={formData.specifications.color}
                      onChange={handleInputChange}
                      placeholder="e.g., Black, White, Blue"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="material">Material</label>
                    <input
                      type="text"
                      id="material"
                      name="specifications.material"
                      value={formData.specifications.material}
                      onChange={handleInputChange}
                      placeholder="e.g., Cotton, Leather, Metal"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <input
                      type="text"
                      id="size"
                      name="specifications.size"
                      value={formData.specifications.size}
                      onChange={handleInputChange}
                      placeholder="e.g., S, M, L, XL or dimensions"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      type="number"
                      id="weight"
                      name="specifications.weight"
                      value={formData.specifications.weight}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="dimensions">Dimensions (cm)</label>
                  <input
                    type="text"
                    id="dimensions"
                    name="specifications.dimensions"
                    value={formData.specifications.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g., 10 x 15 x 5"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Product Images</h3>
                
                <div className="form-group">
                  <label htmlFor="images">Upload Product Images</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="images"
                      name="images"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                    <label htmlFor="images" className="file-upload-label">
                      <FaUpload />
                      Choose Images
                    </label>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="image-preview">
                      <h4>Selected Images:</h4>
                      <div className="image-list">
                        {formData.images.map((file, index) => (
                          <div key={index} className="image-item">
                            <span>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="remove-image"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
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
                  {isSubmitting ? 'Submitting...' : 'Submit Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </LuxuryStudyBackground>
    </>
  );
};

export default ProductSubmission;
