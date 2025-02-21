import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F8F5F1] py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-[#B5A69C] text-2xl font-light mb-6 tracking-wide">Studio Location</h3>
            <p className="text-[#8A7F76] font-light leading-relaxed">
              123 Serenity Avenue<br />
              Wellness District<br />
              Barcelona, Spain
            </p>
          </div>
          <div>
            <h3 className="text-[#B5A69C] text-2xl font-light mb-6 tracking-wide">Contact</h3>
            <p className="text-[#8A7F76] font-light leading-relaxed">
              hello@reformerpilates.com<br />
              +34 123 456 789
            </p>
          </div>
          <div>
            <h3 className="text-[#B5A69C] text-2xl font-light mb-6 tracking-wide">Hours</h3>
            <p className="text-[#8A7F76] font-light leading-relaxed">
              Monday — Friday<br />
              7:00 AM — 9:00 PM<br />
              Weekends by appointment
            </p>
          </div>
        </div>
        <div className="border-t border-[#B5A69C]/20 mt-16 pt-8 text-center">
          <p className="text-[#8A7F76] font-light tracking-wide">
            © 2024 Reformer Pilates Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 