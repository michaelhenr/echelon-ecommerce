const express = require('express');
const { 
  getAds, 
  getAd, 
  createAd, 
  updateAd, 
  deleteAd, 
  getMyAds, 
  approveAd, 
  rejectAd, 
  getActiveAds, 
  trackAdMetrics, 
  getAdStats 
} = require('../controllers/adController');
const { 
  authenticateToken, 
  authorizeRoles, 
  validateRequest 
} = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/active', getActiveAds);
router.post('/:id/track', trackAdMetrics);

// Protected routes
router.use(authenticateToken);

// General routes
router.get('/', getAds);
router.get('/stats', authorizeRoles('admin'), getAdStats);
router.get('/my-ads', authorizeRoles('advertiser', 'admin'), getMyAds);
router.get('/:id', getAd);

// Advertiser routes
router.post('/', 
  authorizeRoles('advertiser', 'admin'),
  validateRequest({
    title: { required: true, maxLength: 100 },
    description: { required: true, maxLength: 500 },
    type: { required: true },
    budget: { required: true, type: 'number' },
    'schedule.startDate': { required: true },
    'schedule.endDate': { required: true }
  }),
  createAd
);
router.put('/:id', updateAd);
router.delete('/:id', deleteAd);

// Admin routes
router.put('/:id/approve', authorizeRoles('admin'), approveAd);
router.put('/:id/reject', authorizeRoles('admin'), rejectAd);

module.exports = router;
