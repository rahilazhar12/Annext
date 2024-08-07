'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AnLuxuriesLoader from '@/components/Loader/Anloader';
import ScrollToTop from '@/components/Scrolltotop/ScrollToTop';


const Allwatches = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bags = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/watches-get`
        ).then((res) => res.json());
        setProducts(bags);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const navigateHandler = (id) => {
    router.push(`/detailpage/${id}`);
  };

  if (loading) {
    return <AnLuxuriesLoader />;
  }

  return (
    <div className="flex flex-wrap mx-auto container">
      <ScrollToTop/>
      {products.map((product) => (
        <div key={product._id} className="w-full sm:w-1/2 lg:w-1/3 p-4" data-aos="fade-up">
          <div className="hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-300">
            <figure className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${product.mainImage}`}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
                onLoad={() => setLoading(false)}
                width={500}
                height={400}
                className="cursor-pointer"
                onClick={() => navigateHandler(product._id)}
              />
            </figure>
            <div className="p-4">
              <h2 className="text-sm text-gray-800 text-center">{product.name}</h2>
              <div className="flex items-center mt-2 justify-center">
                {product.oldPrice && (
                  <span className="text-sm line-through text-gray-500 mr-2">
                    Rs {product.oldPrice}
                  </span>
                )}
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
      ))}
    </div>
  );
};

export default Allwatches;
