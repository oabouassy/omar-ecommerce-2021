const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const charge = async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Omar-Ecommerce Store",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};
module.exports = {
  charge,
};
