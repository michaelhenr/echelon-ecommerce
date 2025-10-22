const { User } = require('../models');
const { asyncHandler, validateRequest } = require('../middleware/auth');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const role = req.query.role;
  const isApproved = req.query.isApproved;

  // Build filter object
  const filter = {};
  if (role) filter.role = role;
  if (isApproved !== undefined) filter.isApproved = isApproved === 'true';

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await User.countDocuments(filter);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.json({
    success: true,
    data: { user }
  });
});

// @desc    Create user (Admin only)
// @route   POST /api/users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, profile } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'User already exists with this email or username'
    });
  }

  const user = await User.create({
    username,
    email,
    password,
    role,
    profile,
    isApproved: true // Admin-created users are auto-approved
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    }
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, role, profile, isActive, isApproved } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { username, email, role, profile, isActive, isApproved },
    { new: true, runValidators: true }
  ).select('-password');

  res.json({
    success: true,
    message: 'User updated successfully',
    data: { user: updatedUser }
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Approve user (Admin only)
// @route   PUT /api/users/:id/approve
// @access  Private/Admin
const approveUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  user.isApproved = true;
  await user.save();

  res.json({
    success: true,
    message: 'User approved successfully',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    }
  });
});

// @desc    Deactivate user (Admin only)
// @route   PUT /api/users/:id/deactivate
// @access  Private/Admin
const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  user.isActive = false;
  await user.save();

  res.json({
    success: true,
    message: 'User deactivated successfully',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    }
  });
});

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const approvedUsers = await User.countDocuments({ isApproved: true });
  
  const usersByRole = await User.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 }
      }
    }
  ]);

  const recentUsers = await User.find()
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      approvedUsers,
      usersByRole,
      recentUsers
    }
  });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  approveUser,
  deactivateUser,
  getUserStats
};
