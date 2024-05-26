import React from 'react'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (error) {
      toast.error(error.message);
    } else {
      navigate("/thank-you")
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AddressElement options={{mode: "shipping"}}/>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements} className='btn bg-green-700 hover:bg-green-900 text-white btn-block mt-8'>
          Pagar
        </button>
      </form>
    </>
  )
}

export default CheckoutForm
