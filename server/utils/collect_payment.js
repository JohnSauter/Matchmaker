// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


module.exports = async function collect_payment(context) {
  
    const url = new URL(context.headers.referrer).origin;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 10,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${url}/pay_success`,
            cancel_url: `${url}/pay_canceled`,

        });
        return { session: session.id };
    } catch (error) {
        console.error("Error calling Stripe", error)
        return{session:"error"}
    }

return null;

};

