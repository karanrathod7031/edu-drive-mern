const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['folder', 'file'], required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', default: null },
  category: { type: String, default: 'General' },
  price: { type: Number, default: 0 },
  fileUrl: { type: String, default: '' },
}, { 
  timestamps: true,
  collection: 'assets' // 👈 Yeh line pakka karegi ki data sahi jagah se aaye
});

module.exports = mongoose.model('Asset', assetSchema);