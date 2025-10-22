const express = require('express');
const { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser, 
  approveUser, 
  deactivateUser, 
  getUserStats 
} = require('../controllers/userController');
const { 
  authenticateToken, 
  authorizeRoles, 
  validateRequest 
} = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Admin only routes
router.get('/', authorizeRoles('admin'), getUsers);
router.get('/stats', authorizeRoles('admin'), getUserStats);
router.post('/', 
  authorizeRoles('admin'),
  validateRequest({
    username: { required: true, minLength: 3, maxLength: 30 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 },
    role: { required: true }
  }),
  createUser
);
router.put('/:id/approve', authorizeRoles('admin'), approveUser);
router.put('/:id/deactivate', authorizeRoles('admin'), deactivateUser);
router.delete('/:id', authorizeRoles('admin'), deleteUser);

// General routes
router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;
