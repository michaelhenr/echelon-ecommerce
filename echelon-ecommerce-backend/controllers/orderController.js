const { Order, Product, User } = require('../models');
const { asyncHandler, validateRequest } = require('../middleware/auth');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;
  const customer = req.query.customer;

  // Build filter object
  const filter = {};
  if (status) filter.status = status;
  if (customer) filter.customer = customer;
  
  // If not admin, only show user's own orders
  if (req.user.role !== 'admin') {
    filter.customer = req.user.id;
  }

  const orders = await Order.find(filter)
    .populate('customer', 'username email')
    .populate('items.product', 'name price images')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Order.countDocuments(filter);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('customer', 'username email profile')
    .populate('items.product', 'name price images brand');

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }

  // Check if user owns the order or is admin
  if (order.customer._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to view this order'
    });
  }

  res.json({
    success: true,
    data: { order }
  });
});

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, billingAddress, payment } = req.body;

  // Validate items
  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Order must contain at least one item'
    });
  }

  // Calculate total amount and validate products
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      return res.status(400).json({
        success: false,
        error: `Product ${item.product} not found`
      });
    }

    if (product.inventory.quantity < item.quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient inventory for product ${product.name}`
      });
    }

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price
    });
  }

  // Create order
  const order = await Order.create({
    orderNumber: generateOrderNumber(),
    customer: req.user.id,
    items: orderItems,
    shippingAddress,
    billingAddress,
    payment: {
      ...payment,
      amount: totalAmount
    },
    totalAmount,
    shippingCost: 0, // Can be calculated based on address
    tax: 0 // Can be calculated based on location
  });

  // Update product inventory
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { 'inventory.quantity': -item.quantity } }
    );
  }

  const populatedOrder = await Order.findById(order._id)
    .populate('customer', 'username email')
    .populate('items.product', 'name price images');

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: { order: populatedOrder }
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }

  // Check authorization
  if (req.user.role !== 'admin' && order.customer.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this order'
    });
  }

  order.status = status;
  await order.save();

  res.json({
    success: true,
    message: 'Order status updated successfully',
    data: { order }
  });
});

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { status, transactionId } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }

  order.payment.status = status;
  if (transactionId) order.payment.transactionId = transactionId;
  
  await order.save();

  res.json({
    success: true,
    message: 'Payment status updated successfully',
    data: { order }
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }

  // Check if order can be cancelled
  if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
    return res.status(400).json({
      success: false,
      error: 'Order cannot be cancelled'
    });
  }

  // Check authorization
  if (order.customer.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to cancel this order'
    });
  }

  // Restore product inventory
  for (const item of order.items) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { 'inventory.quantity': item.quantity } }
    );
  }

  order.status = 'cancelled';
  await order.save();

  res.json({
    success: true,
    message: 'Order cancelled successfully',
    data: { order }
  });
});

// @desc    Get order statistics (Admin only)
// @route   GET /api/orders/stats
// @access  Private/Admin
const getOrderStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const completedOrders = await Order.countDocuments({ status: 'delivered' });
  
  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalRevenue = await Order.aggregate([
    {
      $match: { status: 'delivered' }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$totalAmount' }
      }
    }
  ]);

  const recentOrders = await Order.find()
    .populate('customer', 'username email')
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: {
      totalOrders,
      pendingOrders,
      completedOrders,
      ordersByStatus,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders
    }
  });
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  getOrderStats
};
