const { Ad } = require('../models');
const { asyncHandler, validateRequest } = require('../middleware/auth');

// @desc    Get all ads
// @route   GET /api/ads
// @access  Public
const getAds = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;
  const type = req.query.type;
  const advertiser = req.query.advertiser;

  // Build filter object
  const filter = {};
  if (status) filter.status = status;
  if (type) filter.type = type;
  if (advertiser) filter.advertiser = advertiser;

  const ads = await Ad.find(filter)
    .populate('advertiser', 'username email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Ad.countDocuments(filter);

  res.json({
    success: true,
    data: {
      ads,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }
  });
});

// @desc    Get single ad
// @route   GET /api/ads/:id
// @access  Public
const getAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id)
    .populate('advertiser', 'username email');

  if (!ad) {
    return res.status(404).json({
      success: false,
      error: 'Ad not found'
    });
  }

  res.json({
    success: true,
    data: { ad }
  });
});

// @desc    Create ad (Advertiser only)
// @route   POST /api/ads
// @access  Private/Advertiser
const createAd = asyncHandler(async (req, res) => {
  const adData = {
    ...req.body,
    advertiser: req.user.id
  };

  const ad = await Ad.create(adData);

  const populatedAd = await Ad.findById(ad._id)
    .populate('advertiser', 'username email');

  res.status(201).json({
    success: true,
    message: 'Ad created successfully',
    data: { ad: populatedAd }
  });
});

// @desc    Update ad
// @route   PUT /api/ads/:id
// @access  Private
const updateAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({
      success: false,
      error: 'Ad not found'
    });
  }

  // Check if user owns the ad or is admin
  if (ad.advertiser.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this ad'
    });
  }

  const updatedAd = await Ad.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('advertiser', 'username email');

  res.json({
    success: true,
    message: 'Ad updated successfully',
    data: { ad: updatedAd }
  });
});

// @desc    Delete ad
// @route   DELETE /api/ads/:id
// @access  Private
const deleteAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({
      success: false,
      error: 'Ad not found'
    });
  }

  // Check if user owns the ad or is admin
  if (ad.advertiser.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to delete this ad'
    });
  }

  await Ad.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Ad deleted successfully'
  });
});

// @desc    Get my ads (Advertiser)
// @route   GET /api/ads/my-ads
// @access  Private/Advertiser
const getMyAds = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const ads = await Ad.find({ advertiser: req.user.id })
    .populate('advertiser', 'username email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Ad.countDocuments({ advertiser: req.user.id });

  res.json({
    success: true,
    data: {
      ads,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }
  });
});

// @desc    Approve ad (Admin only)
// @route   PUT /api/ads/:id/approve
// @access  Private/Admin
const approveAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({
      success: false,
      error: 'Ad not found'
    });
  }

  ad.status = 'approved';
  await ad.save();

  res.json({
    success: true,
    message: 'Ad approved successfully',
    data: { ad }
  });
});

// @desc    Reject ad (Admin only)
// @route   PUT /api/ads/:id/reject
// @access  Private/Admin
const rejectAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({
      success: false,
      error: 'Ad not found'
    });
  }

  ad.status = 'rejected';
  await ad.save();

  res.json({
    success: true,
    message: 'Ad rejected successfully',
    data: { ad }
  });
});

// @desc    Get active ads for display
// @route   GET /api/ads/active
// @access  Public
const getActiveAds = asyncHandler(async (req, res) => {
  const now = new Date();
  const type = req.query.type;

  const filter = {
    status: 'active',
    'schedule.startDate': { $lte: now },
    'schedule.endDate': { $gte: now }
  };

  if (type) filter.type = type;

  const ads = await Ad.find(filter)
    .populate('advertiser', 'username')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: { ads }
  });
});

// @desc    Track ad metrics (click, view)
// @route   POST /api/ads/:id/track
// @access  Public
const trackAdMetrics = asyncHandler(async (req, res) => {
  const { action } = req.body; // 'view' or 'click'

  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    return res.status(404).json({
      success: false,
      error: 'Ad not found'
    });
  }

  if (action === 'view') {
    ad.metrics.views += 1;
  } else if (action === 'click') {
    ad.metrics.clicks += 1;
  }

  await ad.save();

  res.json({
    success: true,
    message: 'Metrics updated successfully'
  });
});

// @desc    Get ad statistics (Admin only)
// @route   GET /api/ads/stats
// @access  Private/Admin
const getAdStats = asyncHandler(async (req, res) => {
  const totalAds = await Ad.countDocuments();
  const pendingAds = await Ad.countDocuments({ status: 'pending' });
  const activeAds = await Ad.countDocuments({ status: 'active' });
  
  const adsByType = await Ad.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 }
      }
    }
  ]);

  const adsByStatus = await Ad.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      totalAds,
      pendingAds,
      activeAds,
      adsByType,
      adsByStatus
    }
  });
});

module.exports = {
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
};
