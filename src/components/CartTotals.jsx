import React from 'react'

const CartTotals = ({ total }) => {
  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Subtotal</span>
          <span className='font-medium'>{((total - 5.99) * 0.79).toFixed(2)}</span>
        </p>
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Impuestos</span>
          <span className='font-medium'>{(((total - 5.99) * 0.79) * 0.21).toFixed(2)}</span>
        </p>
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Gastos de envío</span>
          <span className='font-medium'>5.99 €</span>
        </p>
        <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
          <span>Order Total</span>
          <span className='font-medium'>{total.toFixed(2)} €</span>
        </p>
      </div>
    </div>
  )
}

export default CartTotals
