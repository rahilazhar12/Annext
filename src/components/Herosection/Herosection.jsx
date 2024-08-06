import React from 'react';
import Image from 'next/image';

const Herosection = () => {
  return (
    <>
      <div className="hero md:min-h-screen relative">
        <Image
          src="/assets/Images/cover.webp"
          alt="Hero Background"
          layout="fill"
          quality={100}
          className="object-cover md:object-cover"
        />
        <div className="hero-overlay bg-opacity-60 absolute inset-0 z-10"></div>
        <div className="hero-content text-neutral-content text-center relative z-20">
          <div className="md:max-w-md">
            <h1 className="md:mb-5 text-sm   md:text-5xl font-bold">Welcome to ANLuxuries</h1>
            <p className="text-xs md:text-xl">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Herosection;
