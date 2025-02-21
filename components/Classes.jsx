import React from 'react';
import Image from 'next/image';

const Classes = () => {
  const classes = [
    {
      title: 'Private Sessions',
      description: 'Personalized attention for your unique journey',
      image: '/images/image2.png'
    },
    {
      title: 'Reformer Flow',
      description: 'Dynamic movements for strength and grace',
      image: '/images/image3.png'
    },
    {
      title: 'Advanced Practice',
      description: 'Challenge your body and mind',
      image: '/images/image4.png'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-[#B5A69C] text-5xl font-extralight mb-20 text-center tracking-wider">
          Our Practice
        </h2>
        <div className="grid md:grid-cols-3 gap-16">
          {classes.map((clase, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-[400px] mb-6 overflow-hidden">
                <Image
                  src={clase.image}
                  alt={clase.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-[#8A7F76] text-2xl font-light mb-3 tracking-wide">
                {clase.title}
              </h3>
              <p className="text-[#B5A69C] font-light tracking-wide">
                {clase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes; 