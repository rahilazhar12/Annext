// pages/product/[slug].js
'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '@/store/cartSlice';
import CartModal from '@/components/CartModal/CartModal';
import { FaTruckFast } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import Anloader from '@/components/Loader/Anloader';
import ScrollToTop from '@/components/Scrolltotop/ScrollToTop';

const Product = ({ params }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const [, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getglassesonid/${params.slug}`);
        const data = await response.json();
        setProduct(data);
        setImages([data.mainImage, ...data.additionalImages]);
        setMainImage(data.mainImage);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [params.slug]);

  useEffect(() => {
    if (product) {
      const itemInCart = cartItems.find((item) => item._id === product._id);
      setAddedToCart(!!itemInCart);
    }
  }, [cartItems, product]);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    setAddedToCart(true);
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  if (!product) {
    return <Anloader />;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <ScrollToTop />
      <div className="mx-auto overflow-hidden">
        <div className="flex flex-wrap">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${mainImage}`}
              alt={product.name}
              width={500}
              height={600}
              className="w-[500px] h-auto rounded-lg shadow-sm"
            />
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((img, index) => (
                <div key={index} className="w-1/5">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={120}
                    className="w-auto h-auto cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setMainImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">{product.name}</h1>
            <div className="mb-2 flex gap-2">
              <p className="text-xl text-gray-400 line-through">Rs. {product.oldPrice}</p>
              <p className="text-xl font-bold text-red-600">Rs. {product.newPrice}</p>
            </div>
           
            <ul className="list-disc list-inside text-gray-600 mb-4">

                <div className='flex items-center gap-3'>
                <FaTruckFast />
                <p>FREE delivery over Rs. 3499!</p>
                </div>
                <div className='md:ml-5 text-xs text-gray-400 p-3'>
                  <p>Rs.200 delivery charges nationwide.</p>
                  <p>Delivery within 2-5 days.</p>
                </div>



                <div className='flex items-center gap-3'>
                <FaShieldAlt />
                <p>FREE returns and exchanges!</p>
                </div>
                <div className='md:ml-5 text-sm text-gray-400 p-3'>
                  <p><span className='text-gray-500 font-bold'>100%</span> <span className='text-xs'>customer satisfaction guaranteed.</span></p>
                  <p><span className='text-gray-500 font-bold'>FREE LIFETIME</span> <span className='text-xs'>returns and exchanges.</span></p>
                </div>
            </ul>
            <div className='mx-auto flex'>
            <button
              className="w-full  bg-gray-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-900 transition-colors duration-300"
              onClick={() => handleAddToCart(product)}
            >
              Buy Now
            </button>
            </div>
          </div>
        </div>
      </div>
      {isCartModalOpen && <CartModal isOpen={isCartModalOpen} closeModal={closeCartModal} />}
    </div>
  );
};

export default Product;
