require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edu_drive_files',
    resource_type: 'auto', // 🚀 Sabse important: PDF detection ke liye
    access_mode: 'public', // 🚀 401 Error fix karne ke liye
    allowed_formats: ['jpg', 'png', 'pdf', 'zip'],
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

module.exports = { cloudinary, upload };