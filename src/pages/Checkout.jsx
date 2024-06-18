import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../api/payment';
import { useEffect, useState } from 'react';
import { SectionTitle } from '../components';
import { CartTotals } from '../components';
import { CheckoutForm } from '../components';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)

  const { total } = useSelector((state) => state.cart);

  useEffect(() => {
    setLoading(true);
    const fetchPaymentIntent = async () => {
      const response = await createPaymentIntent((total + 5.99).toFixed(2) * 100);
      const { client_secret } = response;
      setClientSecret(client_secret);
    }
    fetchPaymentIntent().then(() => {
      setLoading(false);
    })
  }, [])

  return (
    <>
      <SectionTitle title="Checkout" path="Carrito | Checkout" />
      {
        loading ? <p>Loading...</p> :
          <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
            <div className='lg:col-span-8'>
              <Elements stripe={stripePromise} options={{ clientSecret: clientSecret, appearance: { theme: "stripe" } }}>
                <CheckoutForm />
              </Elements>
            </div>
            <div className='lg:col-span-4 lg:pl-4'>
              <CartTotals total={total} />
            </div>
          </div>
      }
    </>
  )
}

export default Checkout
