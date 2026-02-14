const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/auth');
const DriveItem = require('../models/Asset');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = await DriveItem.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const options = {
      amount: item.price * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ ...order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: "Order failed" });
  }
});

// Verify & Save Order
router.post('/verify-payment', protect, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, itemId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    const item = await DriveItem.findById(itemId);
    await Order.create({
      user: req.user._id,
      item: itemId,
      razorpay_order_id,
      razorpay_payment_id,
      amount: item.price,
      status: 'success'
    });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid Signature" });
  }
});

// Student History & Stats
router.get('/my-purchases', protect, async (req, res) => {
  try {
    const purchases = await Order.find({ user: req.user._id }).populate('item').sort({ createdAt: -1 });
    const totalSpent = purchases.reduce((acc, curr) => acc + curr.amount, 0);
    res.json({
      stats: { totalSpent, totalItems: purchases.length },
      history: purchases
    });
  } catch (err) {
    res.status(500).json({ error: "Stats fetch failed" });
  }
});

module.exports = router;