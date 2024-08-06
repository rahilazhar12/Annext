'use client';
import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosLogIn } from "react-icons/io";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CartModal from '@/components/CartModal/CartModal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const searchRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    // Calculate the total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cartItems]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleIconClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="bg-gray-200 w-full h-10 flex justify-center items-center text-xs text-black font-semibold">
        <p>FREE SHIPPING over Rs.3499</p>
      </div>
      <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600 sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Logo
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          <div className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex md:items-center md:w-auto`}>
            <div className="md:flex-grow md:flex md:justify-center space-y-4 md:space-y-0 md:space-x-4 p-5 md:p-0">
              <Link href="/" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 block md:inline-block" onClick={handleIconClick}>
                Home
              </Link>
              <Link href="/bags" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 block md:inline-block" onClick={handleIconClick}>
                Bags
              </Link>
              <Link href="/glasses" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 block md:inline-block" onClick={handleIconClick}>
                Glasses
              </Link>
              <Link href="/watches" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 block md:inline-block" onClick={handleIconClick}>
                Watches
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Search">
              <IoSearchOutline className="h-6 w-6" />
            </button>

            <button onClick={toggleModal} className="relative text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Shopping cart">
              <HiOutlineShoppingBag className="h-6 w-6" />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </button>

            <Link href={'/login'} className="relative text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white max-sm:hidden" aria-label="Login">
              <IoIosLogIn className="h-6 w-6" onClick={handleIconClick} />
            </Link>
          </div>
        </div>

        <div ref={searchRef} className={`fixed top-16 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 p-4 shadow-lg transition-transform ${isSearchOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
          />
        </div>

        <CartModal isOpen={isModalOpen} closeModal={closeModal} />
      </nav>
    </>
  );
};

export default Navbar;
