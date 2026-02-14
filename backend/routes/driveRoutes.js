const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const DriveItem = require('../models/Asset');

// @route   GET /api/drive/public-preview
// @desc    Get top 4 items for Landing Page (Public Access)
// @access  Public (No token required)
router.get('/public-preview', async (req, res) => {
  try {
    // Senior Tip: Sirf wahi files dikhayenge jo 'file' type ki hain aur latest hain
    const items = await DriveItem.find({ type: 'file' })
      .select('name price type createdAt') // Sensitive info (like fileUrl) hide kar sakte hain yahan
      .limit(4)
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (err) {
    console.error("Public Preview Error:", err);
    res.status(500).json({ error: "Failed to fetch trending resources" });
  }
});

// --- EXISTING PROTECTED ROUTES ---

// Get all items for Dashboard (Protected)
router.get('/', protect, async (req, res) => {
  try {
    const items = await DriveItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Admin only: Add new resource
router.post('/add', protect, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Not authorized" });
  
  try {
    const { name, type, parent, price, fileUrl } = req.body;
    const newItem = await DriveItem.create({ name, type, parent, price, fileUrl });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Upload failed" });
  }
});


// Is route ko driveRoutes.js mein add karein
router.delete('/:id', protect, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Unauthorized" });

  try {
    const item = await DriveItem.findById(req.id);
    
    if (item.type === 'folder') {
      // Recursive delete: Delete all children who have this folder as parent
      await DriveItem.deleteMany({ parent: req.params.id });
    }
    
    await DriveItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item and its contents deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;