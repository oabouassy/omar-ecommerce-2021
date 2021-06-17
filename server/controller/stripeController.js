const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const charge = async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    console.log(`=========== ${payment} ===========`);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};
module.exports = {
  charge,
};
