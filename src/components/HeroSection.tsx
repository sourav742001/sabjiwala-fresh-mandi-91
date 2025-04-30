
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-sabjiwala-cream to-white py-12 md:py-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Hero Content */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Fresh Sabji, Straight From 
              <span className="text-sabjiwala-green"> Mandi </span> 
              to Your 
              <span className="text-sabjiwala-orange"> Rasoi</span>
            </h1>
            <p className="mt-4 md:mt-6 text-lg text-gray-700 max-w-lg">
              Get farm-fresh vegetables and fruits delivered to your doorstep. Handpicked daily from Delhi's best sabji mandi.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
              <button className="btn-primary px-8 py-3 text-lg flex items-center gap-2">
                Shop Now <ArrowRight size={20} />
              </button>
              <button className="btn-secondary px-8 py-3 text-lg">
                Special Offers
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-semibold">100%</span>
                <span className="text-sm text-gray-600">Fresh Daily</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Free</span>
                <span className="text-sm text-gray-600">Delivery</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Quality</span>
                <span className="text-sm text-gray-600">Guaranteed</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-sabjiwala-green/20 animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-sabjiwala-orange/20 animate-float" style={{ animationDelay: '1s' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Fresh vegetables and fruits" 
                className="rounded-2xl shadow-2xl object-cover w-full h-[400px] relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
