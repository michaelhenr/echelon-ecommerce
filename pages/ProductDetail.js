import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../contexts/CartContext';
import { FaStar, FaHeart, FaShare, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, this would come from API
  const product = {
    _id: id,
    name: 'Wireless Bluetooth Headphones',
    brand: 'Echelon Audio',
    price: 99.99,
    description: 'Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.',
    category: 'electronics',
    images: [
      { url: '/placeholder-product.jpg', alt: 'Headphones front view' },
      { url: '/placeholder-product.jpg', alt: 'Headphones side view' },
      { url: '/placeholder-product.jpg', alt: 'Headphones with case' }
    ],
    inventory: {
      quantity: 15,
      sku: 'WH-001'
    },
    specifications: {
      weight: '250g',
      dimensions: {
        length: 20,
        width: 18,
        height: 8
      },
      color: 'Black',
      material: 'Premium Plastic & Metal'
    },
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'premium'],
    rating: 4.5,
    reviews: 128
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.inventory.quantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - Echelon Ecommerce</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="product-detail-page products-background">
        <div className="container">
          <div className="product-detail-content">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img
                  src={product.images[selectedImage]?.url || '/placeholder-product.jpg'}
                  alt={product.images[selectedImage]?.alt || product.name}
                />
              </div>
              
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image.url} alt={image.alt} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-header">
                <h1>{product.name}</h1>
                <p className="product-brand">{product.brand}</p>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? 'filled' : ''} />
                    ))}
                  </div>
                  <span className="rating-text">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="product-price">
                <span className="current-price">${product.price}</span>
                {product.inventory.quantity === 0 && (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={product.inventory.quantity}
                    className="quantity-input"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.inventory.quantity}
                    className="quantity-btn"
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="stock-info">
                  {product.inventory.quantity} in stock
                </span>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  onClick={handleAddToCart}
                  disabled={product.inventory.quantity === 0}
                  className="btn btn-primary btn-lg add-to-cart-btn"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
                
                <button className="btn btn-outline btn-lg wishlist-btn">
                  <FaHeart />
                  Add to Wishlist
                </button>
                
                <button className="btn btn-outline btn-lg share-btn">
                  <FaShare />
                  Share
                </button>
              </div>

              {/* Product Tags */}
              <div className="product-tags">
                {product.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="product-specifications">
            <div className="specs-card">
              <h2>Specifications</h2>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Weight</span>
                  <span className="spec-value">{product.specifications.weight}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Dimensions</span>
                  <span className="spec-value">
                    {product.specifications.dimensions.length} × {product.specifications.dimensions.width} × {product.specifications.dimensions.height} cm
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Color</span>
                  <span className="spec-value">{product.specifications.color}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Material</span>
                  <span className="spec-value">{product.specifications.material}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">SKU</span>
                  <span className="spec-value">{product.inventory.sku}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
