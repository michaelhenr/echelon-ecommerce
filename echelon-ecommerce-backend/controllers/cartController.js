const { Cart, Product } = require('../models');
const { asyncHandler } = require('../middleware/auth');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate('items.product', 'name price images inventory');

  if (!cart) {
    return res.json({
      success: true,
      data: { cart: { items: [], total: 0 } }
    });
  }

  // Calculate total
  let total = 0;
  cart.items.forEach(item => {
    total += item.product.price * item.quantity;
  });

  res.json({
    success: true,
    data: { 
      cart: {
        ...cart.toObject(),
        total
      }
    }
  });
});

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Validate product exists and is active
  const product = await Product.findOne({ 
    _id: productId, 
    isActive: true 
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found or inactive'
    });
  }

  // Check inventory
  if (product.inventory.quantity < quantity) {
    return res.status(400).json({
      success: false,
      error: 'Insufficient inventory'
    });
  }

  // Find or create cart
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ 
      user: req.user.id, 
      items: [] 
    });
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name price images inventory');

  res.json({
    success: true,
    message: 'Item added to cart successfully',
    data: { cart: populatedCart }
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({
      success: false,
      error: 'Quantity must be at least 1'
    });
  }

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      error: 'Cart not found'
    });
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found in cart'
    });
  }

  // Check inventory
  const product = await Product.findById(productId);
  if (product.inventory.quantity < quantity) {
    return res.status(400).json({
      success: false,
      error: 'Insufficient inventory'
    });
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name price images inventory');

  res.json({
    success: true,
    message: 'Cart item updated successfully',
    data: { cart: populatedCart }
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      error: 'Cart not found'
    });
  }

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();

  const populatedCart = await Cart.findById(cart._id)
    .populate('items.product', 'name price images inventory');

  res.json({
    success: true,
    message: 'Item removed from cart successfully',
    data: { cart: populatedCart }
  });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      error: 'Cart not found'
    });
  }

  cart.items = [];
  await cart.save();

  res.json({
    success: true,
    message: 'Cart cleared successfully',
    data: { cart }
  });
});

// @desc    Get cart count
// @route   GET /api/cart/count
// @access  Private
const getCartCount = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.json({
      success: true,
      data: { count: 0 }
    });
  }

  const count = cart.items.reduce((total, item) => total + item.quantity, 0);

  res.json({
    success: true,
    data: { count }
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount
};
