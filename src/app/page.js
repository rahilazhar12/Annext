"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Detailcards from "@/components/Bags/Detailcards";
import Link from "next/link";
import Hero from "@/components/Herosection/Herosection";
import Anloader from "@/components/Loader/Anloader";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bags = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bags-get`).then(res => res.json());
        const glasses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/glasses-get`).then(res => res.json());
        const watches = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/watches-get`).then(res => res.json());

        setProducts(bags);
        setGlasses(glasses);
        setWatches(watches);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);



  return (
    <>
      {loading ? (
        <>
          <Anloader />
        </>
      ) : (
        <>
          <Hero />
          {/* Bags */}

          <div className="container mx-auto p-3 md:mt-2">
            <h2 className="md:text-2xl font-bold text-center bg-gray-100 w-52 md:w-80 mx-auto text-gray-900 p-1">
              Crossbody Bags
            </h2>
            <div className="flex flex-wrap ">
              {products.slice(-4).map((product, index) => (
                <Detailcards key={index} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/bags">
                <button className="btn bg-slate-700 text-white rounded hover:bg-slate-800 transition-colors">
                  View All
                </button>
              </Link>
            </div>
          </div>

          {/* Glasses */}
          
            <div className="bg-gray-100 p-8">
              <div className="container mx-auto">
                <h2 className="md:text-2xl font-bold text-center bg-gray-300 w-52 md:w-80 mx-auto mb-12 text-gray-900 p-1">
                  Glasses
                </h2>
                <div className="flex flex-wrap -mx-4">
                  {glasses.slice(-4).map((product, index) => (
                    <Detailcards key={index} product={product} />
                  ))}
                </div>
                <div className="text-center">
                  <Link href="/glasses">
                    <button className="btn bg-slate-700 text-white rounded hover:bg-slate-800 transition-colors">
                      View All
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          


          {/* Watches */}
          <div className="container mx-auto p-3 md:mt-2">
            <h2 className="md:text-2xl font-bold text-center bg-gray-100 w-52 md:w-80 mx-auto text-gray-900 p-1">
              Watches
            </h2>
            <div className="flex flex-wrap ">
              {watches.slice(-4).map((product, index) => (
                <Detailcards key={index} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/watches">
                <button className="btn bg-slate-700 text-white rounded hover:bg-slate-800 transition-colors">
                  View All
                </button>
              </Link>
            </div>
          </div>


        </>
      )}
    </>
  );
};

export default Home;
