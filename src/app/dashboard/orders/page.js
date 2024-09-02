'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../page';
import Image from 'next/image';

const SummaryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-allorders`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <DashboardLayout>
            <div>
                <section className="py-2 relative">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                        {orders.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No orders available</p>
                            </div>
                        ) : (
                            <div className="overflow-y-auto max-h-[700px]">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="w-full bg-gray-100">
                                            <th className="py-4 px-6 border-b">#</th>
                                            <th className="py-4 px-6 border-b">Order Id</th>
                                            <th className="py-4 px-6 border-b">Order Payment Date</th>
                                            <th className="py-4 px-6 border-b">User Information</th>
                                            <th className="py-4 px-6 border-b">Billing Address</th>
                                            <th className="py-4 px-6 border-b">Items</th>
                                            <th className="py-4 px-6 border-b">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={order._id} className="border-b">
                                                <td className="py-4 px-6 border-r">{index + 1}</td>
                                                <td className="py-4 px-2 border-r">{order._id}</td>
                                                <td className="py-4 px-6 border-r">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td className="py-4 px-6 border-r">
                                                    <p>Name: {order.user.name}</p>
                                                    <p>Email:{order.user.email}</p>
                                                    <p>Phone: {order.user.phone}</p>
                                                </td>
                                                <td className="py-4 px-6 border-r">
                                                    <p>Street: {order.user.billingAddress.street}</p>
                                                    <p>State: {order.user.billingAddress.state}</p>
                                                    <p>Zip: {order.user.billingAddress.zip}</p>
                                                </td>
                                                <td className="py-4 px-6 border-r">
                                                    {order.cartItems.map(item => (
                                                        <div key={item._id} className="flex items-center mb-4">
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${item.mainImage}`}
                                                                alt={item.name}
                                                                className="w-16 h-16 mr-4 object-scale-down"
                                                                width={100}
                                                                height={100}
                                                            />
                                                            <div>
                                                                <p>Name: {item.name}</p>
                                                                <p>Qty: {item.quantity}</p>
                                                                <p>Price: Rs {item.totalPrice}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="py-4 px-6">Rs {order.totalAmount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default SummaryPage;
