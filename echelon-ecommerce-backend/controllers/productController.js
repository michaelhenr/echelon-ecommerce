const { Product } = require('../models');
const { asyncHandler, validateRequest } = require('../middleware/auth');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const category = req.query.category;
  const brand = req.query.brand;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const search = req.query.search;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'desc';

  // Build filter object
  const filter = { isActive: true };
  
  if (category) filter.category = category;
  if (brand) filter.brand = new RegExp(brand, 'i');
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  if (search) {
    filter.$or = [
      { name: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const products = await Product.find(filter)
    .populate('brandOwner', 'username email')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Product.countDocuments(filter);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      },
      filters: {
        category,
        brand,
        minPrice,
        maxPrice,
        search
      }
    }
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('brandOwner', 'username email');

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  res.json({
    success: true,
    data: { product }
  });
});

// @desc    Create product (Brand Owner only)
// @route   POST /api/products
// @access  Private/Brand Owner
const createProduct = asyncHandler(async (req, res) => {
  const productData = {
    ...req.body,
    brandOwner: req.user.id
  };

  const product = await Product.create(productData);

  const populatedProduct = await Product.findById(product._id)
    .populate('brandOwner', 'username email');

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: { product: populatedProduct }
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  // Check if user owns the product or is admin
  if (product.brandOwner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this product'
    });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('brandOwner', 'username email');

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: { product: updatedProduct }
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  // Check if user owns the product or is admin
  if (product.brandOwner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to delete this product'
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// @desc    Get products by brand owner
// @route   GET /api/products/brand/:brandOwnerId
// @access  Public
const getProductsByBrand = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const products = await Product.find({ 
    brandOwner: req.params.brandOwnerId,
    isActive: true 
  })
    .populate('brandOwner', 'username email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Product.countDocuments({ 
    brandOwner: req.params.brandOwnerId,
    isActive: true 
  });

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }
  });
});

// @desc    Get my products (Brand Owner)
// @route   GET /api/products/my-products
// @access  Private/Brand Owner
const getMyProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const products = await Product.find({ brandOwner: req.user.id })
    .populate('brandOwner', 'username email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Product.countDocuments({ brandOwner: req.user.id });

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }
  });
});

// @desc    Update product inventory
// @route   PUT /api/products/:id/inventory
// @access  Private
const updateInventory = asyncHandler(async (req, res) => {
  const { quantity, sku } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  // Check if user owns the product or is admin
  if (product.brandOwner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this product'
    });
  }

  product.inventory.quantity = quantity;
  if (sku) product.inventory.sku = sku;

  await product.save();

  res.json({
    success: true,
    message: 'Inventory updated successfully',
    data: { product }
  });
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category', { isActive: true });
  
  res.json({
    success: true,
    data: { categories }
  });
});

// @desc    Get product brands
// @route   GET /api/products/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Product.distinct('brand', { isActive: true });
  
  res.json({
    success: true,
    data: { brands }
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByBrand,
  getMyProducts,
  updateInventory,
  getCategories,
  getBrands
};
