
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const SustainabilitySection = () => {
  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-800">Our Commitment to Sustainability</h2>
            <p className="text-gray-700 mb-6 text-lg">
              At TheSabjiWala, we believe in responsible farming and sustainable practices. We're committed to reducing food miles, minimizing plastic waste, and supporting local farmers who follow eco-friendly cultivation methods.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Reduced Carbon Footprint</h3>
                  <p className="text-gray-600">By sourcing locally and optimizing our delivery routes, we reduce emissions associated with transporting food.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Eco-Friendly Packaging</h3>
                  <p className="text-gray-600">We use biodegradable and compostable packaging materials to minimize our environmental impact.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Supporting Sustainable Farming</h3>
                  <p className="text-gray-600">We partner with farmers who practice sustainable agriculture methods and avoid harmful pesticides.</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Learn More About Our Practices
            </Button>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&auto=format" 
                alt="Sustainable farm" 
                className="rounded-lg h-48 w-full object-cover mb-4"
              />
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&auto=format" 
                alt="Eco friendly packaging" 
                className="rounded-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format" 
                alt="Local sourcing" 
                className="rounded-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&auto=format" 
                alt="Organic farming" 
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
