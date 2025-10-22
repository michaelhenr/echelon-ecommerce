const express = require('express');
const { 
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
} = require('../controllers/productController');
const { 
  authenticateToken, 
  authorizeRoles, 
  validateRequest 
} = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/brand/:brandOwnerId', getProductsByBrand);
router.get('/:id', getProduct);

// Protected routes
router.use(authenticateToken);

// Brand owner routes
router.get('/my-products', authorizeRoles('brand_owner', 'admin'), getMyProducts);
router.post('/', 
  authorizeRoles('brand_owner', 'admin'),
  validateRequest({
    name: { required: true, maxLength: 100 },
    description: { required: true, maxLength: 1000 },
    price: { required: true, type: 'number' },
    category: { required: true },
    brand: { required: true, maxLength: 50 }
  }),
  createProduct
);
router.put('/:id', updateProduct);
router.put('/:id/inventory', updateInventory);
router.delete('/:id', deleteProduct);

module.exports = router;
