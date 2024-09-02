import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
       
        <footer className="bg-gray-900 text-white py-10 px-5">
            <div className="container mx-auto grid grid-cols-1  lg:grid-cols-3 gap-8">
                <div>
                    <h5 className="text-lg font-bold mb-4">SHOP</h5>
                    <ul>
                        <li className="mb-2"><Link href="/bags" className="hover:underline hover:text-gray-300">Bags</Link></li>
                        <li className="mb-2"><Link href="/glasses" className="hover:underline hover:text-gray-300">Glasses</Link></li>
                        <li className="mb-2"><Link href="/watches" className="hover:underline hover:text-gray-300">Watches</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-lg font-bold mb-4">THE COMPANY</h5>
                    <ul>
                        <li className="mb-2"><Link href="#" className="hover:underline hover:text-gray-300">Contact Us</Link></li>
                        <li className="mb-2"><Link href="#" className="hover:underline hover:text-gray-300">Return/Exchange Policy</Link></li>
                        <li className="mb-2"><Link href="#" className="hover:underline hover:text-gray-300">Refund Policy</Link></li>
                        <li className="mb-2"><Link href="#" className="hover:underline hover:text-gray-300">Shipping Policy</Link></li>
                        <li className="mb-2"><Link href="/privacy-policy" className="hover:underline hover:text-gray-300">Privacy Policy</Link></li>
                        <li className="mb-2"><Link href="#" className="hover:underline hover:text-gray-300">Terms Of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-lg font-bold mb-4">NEWSLETTER SIGN UP</h5>
                    <p className="mb-4">Sign up for exclusive updates, new arrivals & insider-only discounts</p>
                    <form className="flex flex-col md:flex-row">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-2 rounded-t md:rounded-t-none md:rounded-l bg-gray-800 text-white border-none focus:outline-none mb-2 md:mb-0 md:mr-2"
                        />
                        <button className="p-2 rounded-b md:rounded-b-none md:rounded-r bg-white text-gray-900 font-bold hover:bg-gray-700 hover:text-white">SUBMIT</button>
                    </form>
                </div>
                {/* <div>
                    <h5 className="text-lg font-bold mb-4">CONNECT WITH US</h5>
                    <div className="flex space-x-4">
                        <a href="#z" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div> */}
            </div>
            <div className="mt-10 text-center text-gray-500 text-sm">
                &copy; 2024 Anluxuries All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
