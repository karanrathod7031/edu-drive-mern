// 1. Sahi model import karein (Asset.js use karein)
const Asset = require('../models/Asset'); 

exports.uploadFile = async (req, res) => {
  try {
    const { title, name, parentId, category, price } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "File upload fail ho gayi!" });
    }

    const secureUrl = req.file.path.replace("http://", "https://");

    // 2. Model ke fields (title, type, price) se match karein
    const newFile = await Asset.create({
      title: title || name || req.file.originalname, // Model mein 'title' hai
      type: 'file',
      parentId: !parentId || parentId === 'root' ? null : parentId,
      category: category || 'Notes',
      price: Number(price) || 0, // Number mein convert karna zaroori hai
      fileUrl: secureUrl,
    });

    console.log(`✅ Asset Published: ${newFile.title}`);
    res.status(201).json(newFile);
  } catch (err) {
    console.error("❌ Controller Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 3. Stats ke liye ye function bhi pakka check karein
exports.getAllAssets = async (req, res) => {
  try {
    // .find() bina kisi filter ke saare documents (files/folders) nikal lega
    const allItems = await Asset.find({}); 
    res.status(200).json(allItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};