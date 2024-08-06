'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Detailcards = ({ product }) => {
  const router = useRouter();

  const navigateHandler = (id) => {
    router.push(`/detailpage/${id}`);
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4" data-aos="fade-up">
      <div className="hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-300">
        <figure className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product.mainImage}`}
            alt={product.name}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            width={400}
            height={400}
            className="cursor-pointer"
            onClick={() => navigateHandler(product._id)}
          />
          <div className="absolute top-0 left-0 bg-gray-100 text-black text-xs px-2 py-1">
            New
          </div>
          <div className="absolute top-7 left-0 bg-red-500 text-white text-xs px-2 py-1">
            Sale
          </div>
        </figure>
        <div className="p-4">
          <h2 className="text-sm text-gray-800 text-center">{product.name}</h2>
          <div className="flex items-center mt-2 justify-center">
            <span className="text-sm line-through text-gray-500 mr-2">
              Rs {product.oldPrice}
            </span>
            <span className="text-sm font-semibold text-red-500">
              Rs {product.newPrice}
            </span>
          </div>
          <div className="flex justify-end mt-4">
            {/* Order Now button can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailcards;
