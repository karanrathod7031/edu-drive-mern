const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 role: { 
    type: String, 
    enum: ['admin', 'student', 'user'], 
    default: 'student' 
  },
  purchasedFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DriveItem' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);