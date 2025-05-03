
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Leaf, Tractor } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunitySupportSection = () => {
  return (
    <section className="py-16 bg-emerald-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-emerald-500"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-emerald-500"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center bg-emerald-700 px-4 py-2 rounded-full mb-6">
              <Heart size={16} className="mr-2 text-white" />
              <span className="text-sm font-medium text-white">Giving Back</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Supporting Farmer Communities</h2>
            
            <p className="text-emerald-100 mb-8 text-lg">
              We're committed to making a positive impact on the lives of farmers and their communities. 
              With every purchase, you help support sustainable farming practices and fair compensation 
              for the hardworking farmers behind your food.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="bg-emerald-700 p-2 rounded-lg mr-3">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Farmer Welfare</h3>
                  <p className="text-emerald-100 text-sm">Supporting 500+ farmer families with fair prices</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-emerald-700 p-2 rounded-lg mr-3">
                  <Leaf size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sustainable Farming</h3>
                  <p className="text-emerald-100 text-sm">Promoting organic and eco-friendly farming methods</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-emerald-700 p-2 rounded-lg mr-3">
                  <Tractor size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Education & Training</h3>
                  <p className="text-emerald-100 text-sm">Providing farming techniques and knowledge sharing</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-emerald-700 p-2 rounded-lg mr-3">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Community Development</h3>
                  <p className="text-emerald-100 text-sm">Investing in rural infrastructure and education</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-700">
              Learn More About Our Impact
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-emerald-700 rounded-lg p-1">
              <div className="bg-emerald-600 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format" 
                  alt="Farmer community"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-emerald-800 rounded-lg p-6 shadow-xl max-w-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Our Impact</h3>
                <Heart size={20} className="text-red-500 fill-red-500" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Farmers Supported</span>
                    <span>500+</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Sustainable Farms</span>
                    <span>320+</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '70%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Villages Reached</span>
                    <span>45+</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.9 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySupportSection;
