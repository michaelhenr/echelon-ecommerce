const express = require('express');
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart, 
  getCartCount 
} = require('../controllers/cartController');
const { 
  authenticateToken, 
  validateRequest 
} = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getCart);
router.get('/count', getCartCount);
router.post('/items', 
  validateRequest({
    productId: { required: true },
    quantity: { required: false, type: 'number' }
  }),
  addToCart
);
router.put('/items/:productId', 
  validateRequest({
    quantity: { required: true, type: 'number' }
  }),
  updateCartItem
);
router.delete('/items/:productId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
