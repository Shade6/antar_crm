const Razorpay = require('razorpay');
const { key_id, key_secret } = require('../../config/razorpay');
const razorpay = new Razorpay({
  key_id,
  key_secret,
});

// API to initiate payment
exports.createOrder = async (req, res) => {
  const amount = req.body.amount; // Amount in paise (100 = ₹1)
  const currency = 'INR';

  const options = {
    amount: amount * 100, // convert to paise
    currency,
    receipt: `receipt_${Math.random()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Razorpay order');
  }
};
