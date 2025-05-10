const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = require("stripe")("sk_test_51RMlG33EWaLSoTWPWf7h6MiY48k4dbN9ZrDkmpqIvE6v7v7ZFbaVneLNHiLwfp0KpU0mbre4l9jXGC984vwGhZ1p007vLlfgHe");


router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  console.log("🔥 Received amount:", amount);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "php",
      automatic_payment_methods: { enabled: true },
    });

    console.log("✅ Created PaymentIntent:", paymentIntent.id);
    res.send(paymentIntent.client_secret);
  } catch (err) {
    console.error("❌ Stripe error:", err); 
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
