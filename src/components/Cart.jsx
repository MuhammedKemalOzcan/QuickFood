import React, { useEffect, useState } from 'react'
import remove from "../assets/images/icon-remove-item.svg"

function Cart({ cartItems, onRemoveFromCart }) {
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = () => {
    //,0 ile acc'yi 'dan başlatıyoruz reduce fonksiyonu ile her bir adımda item.price * item.quantity ile acc yi toplayarak toplam tutarı buluyoruz.
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotal();
    //calculateTotal fonksiyonunu cartItems her değiştiğinde render ediyoruz.
  }, [cartItems]);

  return (
    <div className='cart'>
      <div>
        <h1 className='flex items-center text-3xl font-bold text-orange-500 mb-8'>Your Cart</h1>
      </div>
      {cartItems.map((item) => (
        <div key={item.name} className='flex flex-col mb-8'>
          <div className='text-left'>
            <p>{item.name}</p>
          </div>
          <div className='flex border-b mb-4'>
            <p className='text-orange-600 mr-4'>{item.quantity}x</p>
            <p className='mr-4'>@{item.price}</p>
            <p>${item.price * item.quantity}</p>
            <button className='relative left-48' onClick={() => onRemoveFromCart(item.name)}>
              <img src={remove} />
            </button>
          </div>
        </div>
      ))}
      <div className='flex justify-between items-center mb-1'>
        <p>Order Total</p>
        <h1 className='font-bold text-3xl'>${totalAmount}</h1>
      </div>
    </div>
  )
}

export default Cart
