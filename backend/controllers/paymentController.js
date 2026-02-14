const Razorpay = require('razorpay');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, productId } = req.body;
    const options = {
      amount: amount * 100, // Razorpay paise mein leta hai
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
    // Payment verification logic (Signature verification)
    // Verification ke baad Order model mein entry save karenge
    // Aur User ke purchasedFiles array mein push karenge
};