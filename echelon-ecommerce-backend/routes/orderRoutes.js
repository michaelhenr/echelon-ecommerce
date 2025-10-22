const express = require('express');
const { 
  getOrders, 
  getOrder, 
  createOrder, 
  updateOrderStatus, 
  updatePaymentStatus, 
  cancelOrder, 
  getOrderStats 
} = require('../controllers/orderController');
const { 
  authenticateToken, 
  authorizeRoles, 
  validateRequest 
} = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// General routes
router.get('/', getOrders);
router.get('/stats', authorizeRoles('admin'), getOrderStats);
router.get('/:id', getOrder);
router.post('/', 
  validateRequest({
    items: { required: true },
    shippingAddress: { required: true },
    payment: { required: true }
  }),
  createOrder
);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/payment', updatePaymentStatus);
router.put('/:id/cancel', cancelOrder);

module.exports = router;
