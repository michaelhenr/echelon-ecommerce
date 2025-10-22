import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../contexts/CartContext';
import { FaSearch, FaFilter, FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProductShowcaseBackground } from '../components/Backgrounds';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ProductList = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCart();

  // Fetch products with filters
  const { data: productsData, isLoading, error } = useQuery(
    ['products', filters, currentPage],
    async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        )
      });

      const response = await axios.get(`${API_BASE_URL}/products?${params}`);
      return response.data.data;
    },
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Fetch categories
  const { data: categoriesData } = useQuery(
    'categories',
    async () => {
      const response = await axios.get(`${API_BASE_URL}/products/categories`);
      return response.data.data.categories;
    }
  );

  // Fetch brands
  const { data: brandsData } = useQuery(
    'brands',
    async () => {
      const response = await axios.get(`${API_BASE_URL}/products/brands`);
      return response.data.data.brands;
    }
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading products</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  const { products, pagination } = productsData || { products: [], pagination: {} };

  return (
    <>
      <Helmet>
        <title>Products - Echelon Ecommerce</title>
        <meta name="description" content="Browse our wide selection of products" />
      </Helmet>

      <div className="products-page products-background">
        <div className="products-header">
          <h1>Our Products</h1>
          <p>Discover amazing products from trusted brands</p>
        </div>

        <div className="products-container">
          {/* Filters Sidebar */}
          <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button 
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            {/* Search */}
            <div className="filter-group">
              <label>Search</label>
              <div className="search-input">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categoriesData?.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <label>Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brandsData?.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-main">
            <div className="products-toolbar">
              <button 
                className="mobile-filters-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
              </button>
              
              <div className="results-info">
                <p>
                  Showing {products.length} of {pagination.total} products
                </p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                          alt={product.name}
                          loading="lazy"
                        />
                      </Link>
                      <button className="wishlist-btn">
                        <FaHeart />
                      </button>
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">
                        <Link to={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      
                      <p className="product-brand">{product.brand}</p>
                      
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < 4 ? 'filled' : ''} />
                          ))}
                        </div>
                        <span className="rating-text">(4.0)</span>
                      </div>
                      
                      <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.inventory.quantity === 0 && (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </div>
                      
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product._id)}
                        disabled={product.inventory.quantity === 0}
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {[...Array(pagination.pages)].map((_, i) => {
                    const page = i + 1;
                    const isCurrentPage = page === currentPage;
                    const shouldShow = 
                      page === 1 || 
                      page === pagination.pages || 
                      Math.abs(page - currentPage) <= 2;
                    
                    if (!shouldShow) {
                      if (page === 2 && currentPage > 4) {
                        return <span key={page} className="pagination-ellipsis">...</span>;
                      }
                      if (page === pagination.pages - 1 && currentPage < pagination.pages - 3) {
                        return <span key={page} className="pagination-ellipsis">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={page}
                        className={`pagination-number ${isCurrentPage ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                  disabled={currentPage === pagination.pages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </ProductShowcaseBackground>
    </>
  );
};

export default ProductList;
