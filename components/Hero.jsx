import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#F8F5F1] flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left z-10">
          <h1 className="text-[#B5A69C] text-7xl font-extralight mb-8 tracking-wider">
            Reformer Pilates
          </h1>
          <p className="text-[#8A7F76] text-lg font-light leading-relaxed mb-12 tracking-wide max-w-xl">
            Reformer Pilates isn't your standard Pilates session, it's an invigorating evolution of the traditional practice. Harnessing the power of the reformer machine, this modality infuses classic Pilates movements with increased resistance and a wider range of motion.
          </p>
          <button className="border border-[#B5A69C] text-[#B5A69C] px-8 py-3 tracking-widest text-sm hover:bg-[#B5A69C] hover:text-white transition-all duration-300">
            LEARN MORE ABOUT REFORMER PILATES
          </button>
        </div>
        <div className="relative h-[600px] w-full">
          <Image
            src="/images/image1.png"
            alt="Reformer Pilates Studio"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero; 