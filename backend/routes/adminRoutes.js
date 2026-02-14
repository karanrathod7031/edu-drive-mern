const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const DriveItem = require('../models/Asset');
const User = require('../models/User');

// @route   GET /api/admin/stats
router.get('/stats', protect, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Access Denied" });

  try {
    const totalFiles = await DriveItem.countDocuments({ type: 'file' });
    const totalValue = await DriveItem.aggregate([
      { $match: { type: 'file' } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);
    const totalUsers = await User.countDocuments({ role: 'user' });

    res.json({
      count: totalFiles,
      value: totalValue[0]?.total || 0,
      users: totalUsers
    });
  } catch (err) {
    res.status(500).json({ error: "Stats fetch failed" });
  }
});

module.exports = router;