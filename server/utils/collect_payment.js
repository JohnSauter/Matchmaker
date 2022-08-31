// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

module.exports = async function collect_payment(context) {
  let product = null;
  let price = null;
  let session = null;
  try {
    product = await stripe.products.create({
      name: "Matchmaking",
      default_price_data: {
        unit_amount: 1000,
        currency: "usd",
      },
      expand: ["default_price"],
    });
  } catch (error) {
    console.error("Stripe error creating product: ", error);
    return { success: 0, message: "Stripe error creating product." };
  }
  try {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: 1000,
      currency: "usd",
    });
  } catch (error) {
    console.error("Stripe error creating price ", error);
    return { success: 0, message: "Stripe error creating price." };
  }

  const url = context.headers.referer;

  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${url}choose_list`,
      cancel_url: `${url}pay/credit_card_rejected`,
    });
    return { success: 1, stripe_session_id: session.id };
  } catch (error) {
    console.error("Stripe error creating checkout", error);
    return { success: 0, message: "Stripe error creating checkout." };
  }
};
