const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Asset = require('../models/Asset');

require('dotenv').config();

// 1. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edudrive_mern',
    resource_type: 'auto',
    access_mode: 'public',
    allowed_formats: ['jpg', 'png', 'pdf', 'zip'],
    flags: 'attachment'
  },
});

const upload = multer({ storage });

// --- API ROUTES ---

// 🚀 GET: Saare Assets fetch karna
router.get('/', async (req, res) => {
  try {
    const pId = req.query.parentId;
    const query = (pId === 'null' || !pId) 
      ? { $or: [{ parentId: null }, { parentId: { $exists: false } }] }
      : { parentId: pId };

    const assets = await Asset.find(query).sort({ type: 1, title: 1 });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 POST: File Upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File select karein" });
    const { name, parentId, category, price, semester, branch } = req.body;
    const secureUrl = req.file.path.replace("http://", "https://");

    const newAsset = await Asset.create({
      title: name || req.file.originalname,
      type: 'file',
      parentId: !parentId || parentId === 'null' || parentId === 'root' ? null : parentId,
      fileUrl: secureUrl,   
      category: category || 'Notes',
      price: Number(price) || 0,
      semester: semester || 'Sem 1',
      branch: branch || ''
    });
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 POST: Create Folder
router.post('/folder', async (req, res) => {
  try {
    const folder = await Asset.create({ 
      title: req.body.title, 
      type: 'folder', 
      parentId: !req.body.parentId || req.body.parentId === 'null' ? null : req.body.parentId 
    });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 PUT: Rename Asset (Fixes 404 on Rename) ✅
router.put('/:id', async (req, res) => {
  try {
    const { title } = req.body;
    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      { title: title },
      { new: true }
    );
    if (!updatedAsset) return res.status(404).json({ error: "Asset not found" });
    res.json(updatedAsset);
  } catch (err) {
    res.status(500).json({ error: "Rename failed" });
  }
});

// 🚀 DELETE: Remove Asset (Fixes 404 on Delete) ✅
router.delete('/:id', async (req, res) => {
  try {
    const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
    if (!deletedAsset) return res.status(404).json({ error: "Asset not found" });
    res.json({ message: "Asset deleted successfully 🗑️" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;