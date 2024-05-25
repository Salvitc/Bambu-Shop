import React from 'react'
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cart = () => {
  
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);

  const isCartEmpty = () => {
    if(cartItems.length === 0){
      toast.error("Tu carrito está vacío");
    }else{
      navigate("/thank-you");
    }
  }

  return (
    <>
    <SectionTitle title="Carrito" path="Inicio | Carrito" />
    <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {loginState ? (
            <button onClick={isCartEmpty} className='btn bg-green-700 hover:bg-green-900 text-white btn-block mt-8'>
              Procede al pago
            </button>
          ) : (
            <Link to='/login' className='btn bg-green-700 hover:bg-green-900 btn-block text-white mt-8'>
              Por favor, inicia sesión
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
