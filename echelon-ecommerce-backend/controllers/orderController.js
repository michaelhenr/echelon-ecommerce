const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { items, total, userId } = req.body;  // From FR4
    if (!items || !total || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newOrder = new Order({ items, total, userId, status: 'pending' });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();  // For admin to monitor (FR6)
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(updatedOrder);  // Admin approves transactions
  } catch (error) {
    res.status(400).json({ message: 'Error approving order', error });
  }
};
