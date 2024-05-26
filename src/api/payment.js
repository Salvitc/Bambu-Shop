const stripe = require('stripe')(import.meta.env.VITE_SECRET_KEY);

export const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'eur',
    payment_method_types: ['card'],
  });

  return { client_secret: paymentIntent.client_secret };
}
