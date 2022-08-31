// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

/* Collect_payment takes the context as a parameter so it can
 * determine the client's URL.  It returns an object with two
 * properties.  One property is "success", which is 1 if the
 * function was successful and 0 of not.  If the function is
 * successful the other property is "stripe_session_id", which
 * has the session ID that the client is to use.  If the function
 * is not successful the other property is "message", which
 * describes the error.  */
module.exports = async function collect_payment(context) {
  let product = null;
  let price = null;
  let session = null;
  try {
    /* The service being purchased is Matchmaking.  */
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
    /* The price for a match is US $10.00.  */
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: 1000,
      currency: "usd",
    });
  } catch (error) {
    console.error("Stripe error creating price ", error);
    return { success: 0, message: "Stripe error creating price." };
  }

  /* The URL is where the client lives.  Credit card processing starts
   * by the client directing the browser to a secure page so the user
   * can enter his credit card information.  When that is complete
   * the secure page directs the browser back to the client.  Which
   * page of the client is invoked depends on whether the credit
   * card was processed successfully.  */
  const URL = context.headers.referer;

  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${URL}choose_list`,
      cancel_url: `${URL}pay/credit_card_rejected`,
    });
    return { success: 1, stripe_session_id: session.id };
  } catch (error) {
    console.error("Stripe error creating checkout", error);
    return { success: 0, message: "Stripe error creating checkout." };
  }
};
