const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🆕 REGISTER ROUTE (Ab ye 404 nahi dega)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // 2. Hash Password (Security first!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create New User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student' // Default role for new signups
    });

    // 4. Generate Token (Register hote hi login ho jaye)
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server Error: Registration failed" });
  }
});

// 🔓 LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server Error: Login failed" });
  }
});

// 🔑 ADMIN SEEDER (Hidden path to create admin)
router.post('/seed-admin', async (req, res) => {
  try {
    const { secret, name, email, password } = req.body;
    if (secret !== "MASTER_KEY_786") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    res.status(201).json({ message: "Admin Created!", admin: newAdmin.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;