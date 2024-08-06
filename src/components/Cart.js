// components/Cart.js
'use client'
import React from 'react';
import { useSelector } from 'react-redux';

const Cart = ({ closeCartModal }) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="cart-modal">
      <button onClick={closeCartModal}>Close</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <h2>Your Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center mb-4">
                <img src={`/${item.mainImage}`} alt={item.name} className="h-16 w-16 object-cover mr-4" />
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-red-500">Rs {item.newPrice}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
