const express = require('express');
const { 
  register, 
  login, 
  getMe, 
  updateProfile, 
  changePassword, 
  logout 
} = require('../controllers/authController');
const { 
  authenticateToken, 
  validateRequest 
} = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', 
  validateRequest({
    username: { required: true, minLength: 3, maxLength: 30 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 },
    role: { required: false }
  }),
  register
);

router.post('/login',
  validateRequest({
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 }
  }),
  login
);

// Protected routes
router.use(authenticateToken);

router.get('/me', getMe);
router.put('/profile', updateProfile);
router.put('/change-password', 
  validateRequest({
    currentPassword: { required: true },
    newPassword: { required: true, minLength: 6 }
  }),
  changePassword
);
router.post('/logout', logout);

module.exports = router;
