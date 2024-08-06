'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { clearCart } from '@/store/cartSlice';
import Image from 'next/image';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        state: '',
        zip: '',
        shippingMethod: 'Cash on Delivery',
    });
    const [showConfetti, setShowConfetti] = useState(false);

    const shippingCost = 300; // Define the shipping cost

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        const orderData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            billingAddress: {
                street: formData.street,
                state: formData.state,
                zip: formData.zip,
            },
            cartItems,
            totalAmount: totalAmount + shippingCost, // Add shipping cost to total amount
            shippingMethod: formData.shippingMethod,
        };

        console.log('Order Data:', orderData);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;
            console.log('API URL:', apiUrl);

            const response = await axios.post(apiUrl, orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Order placed successfully:', response.data);
            toast.success('Order placed successfully!');
            // Clear the cart after a successful order
            dispatch(clearCart());
            setShowConfetti(true);
            setTimeout(() => {
                router.push('/complete');
            }, 3000); // Navigate after showing confetti for a few seconds
        } catch (error) {
            console.error('Error placing order:', error.response ? error.response.data : error.message);
            toast.error('Error placing order. Please try again.');
        }
    };

    console.log(cartItems, 'cart');
    console.log(totalAmount);

    return (
        <div>
            {showConfetti && <Confetti />}
            <div className='mb-10 p-5'>
                <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                    <div className='text-gray-900 font-bold text-2xl'>Checkout</div>
                    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                        <div className="relative">
                            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
                                    <span className="font-semibold text-gray-900">Shop</span>
                                </li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                                    <span className="font-semibold text-gray-900">Shipping</span>
                                </li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                                    <span className="font-semibold text-gray-500">Payment</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                    <div className="px-4 pt-8">
                        <p className="text-xl font-medium">Order Summary</p>
                        <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            {cartItems.length > 0 ? (
                                cartItems.map((product) => (
                                    <div key={product._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <Image className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_URL}/${product.mainImage}`} alt={product.name} 
                                        width={100} height={100}/>
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold">{product.name}</span>
                                            <span className="float-right text-gray-400">{product.color || 'Color'}</span>
                                            <p className="text-lg font-bold">Rs{product.totalPrice.toFixed(0)}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">Your cart is empty</p>
                            )}
                        </div>
                        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                        <form className="mt-5 grid gap-6">
                            <div className="relative">
                                <input className="peer hidden" id="radio_1" type="radio" name="shippingMethod" value="Cash on Delivery" checked={formData.shippingMethod === 'Cash on Delivery'} onChange={handleChange} />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Cash on Delivery </span>
                                        <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <p className="text-xl font-medium">Payment Details</p>
                        <p className="text-gray-400">Complete your order by providing your payment details.</p>
                        <div>
                            <label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Name</label>
                            <div className="relative">
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Write your name here" />
                            </div>

                            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                            <div className="relative">
                                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                            </div>

                            <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
                            <div className="relative">
                                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Write your Phone Number here" />
                            </div>

                            <label htmlFor="street" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative flex-shrink-0 sm:w-7/12">
                                    <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                                </div>
                                <select type="text" name="state" value={formData.state} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                                    <option value="State">State</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Sindh">Sindh</option>
                                    <option value="Balochistan">Balochistan</option>
                                    <option value="KPK">KPK</option>
                                </select>
                                <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
                            </div>

                            {/* Total */}
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                    <p className="font-semibold text-gray-900">Rs{totalAmount.toFixed(0)}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                                    <p className="font-semibold text-gray-900">Rs{shippingCost}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-2xl font-semibold text-gray-900">Rs{(totalAmount + shippingCost).toFixed(0)}</p>
                            </div>
                        </div>
                        <button onClick={handlePlaceOrder} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
