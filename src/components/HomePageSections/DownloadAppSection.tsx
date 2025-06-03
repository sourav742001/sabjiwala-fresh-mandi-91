
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const DownloadAppSection = () => {
  return (
    <section className="py-16 bg-emerald-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Fresh Vegetables Delivered Faster!</h2>
            <p className="text-emerald-100 mb-6 text-lg">
              Download our mobile app to shop for fresh vegetables anytime, anywhere. 
              Enjoy exclusive app-only offers and track your deliveries in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white py-6 px-4 flex items-center justify-center">
                <div className="mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 7.39905C17.3559 7.47993 15.648 8.48513 15.648 10.3695C15.648 12.5615 17.7744 13.4476 17.8698 13.4744C17.8539 13.5548 17.5387 14.5336 16.8069 15.5339C16.1713 16.4167 15.5038 17.2995 14.4576 17.2995C13.4114 17.2995 13.1439 16.7271 11.9337 16.7271C10.7519 16.7271 10.2645 17.3158 9.30223 17.3158C8.33999 17.3158 7.6884 16.499 6.98978 15.6321C6.12386 14.5389 5.41733 12.8042 5.41733 11.1605C5.41733 8.52708 7.26255 7.12409 9.07603 7.12409C10.1062 7.12409 10.9561 7.76481 11.5917 7.76481C12.1953 7.76481 13.1439 7.07173 14.3097 7.07173C14.7704 7.07173 16.3261 7.10931 17.5227 7.39905ZM14.0895 5.04755C14.5502 4.49773 14.8654 3.73864 14.8654 2.97956C14.8654 2.8725 14.8495 2.76545 14.8177 2.67499C14.0736 2.69777 13.1917 3.1114 12.6994 3.7092C12.287 4.22258 11.9019 4.98167 11.9019 5.75634C11.9019 5.8634 11.9337 5.97045 11.9496 6.01285C12.0132 6.02803 12.1087 6.04322 12.2041 6.04322C12.8715 6.04322 13.5866 5.65959 14.0895 5.04755Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </Button>
              
              <Button className="bg-black hover:bg-gray-800 text-white py-6 px-4 flex items-center justify-center">
                <div className="mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 8.39905L6.3773 2.76988C5.95217 2.53509 5.45217 2.57072 5.06451 2.84114L12 12.0026L17.5227 8.39905Z" />
                    <path d="M5.06176 2.84377C4.96848 2.90689 4.88292 2.98438 4.80792 3.0762C4.49572 3.47779 4.49572 4.05823 4.80792 4.45981L12.0002 12.0023L5.06176 2.84377Z" />
                    <path d="M19.2278 7.27737C18.9024 6.94642 18.4307 6.8418 17.9999 6.96705C17.9751 6.97436 17.9507 6.98261 17.9268 6.99174L17.5225 7.17268L12 10.7762L4.80792 18.3188C5.01733 18.5861 5.33724 18.7721 5.70966 18.7997C5.77328 18.8077 5.83724 18.8077 5.90085 18.7997H5.91147L17.8886 14.1311C17.9909 14.0824 18.08 14.0126 18.1499 13.9274C18.4621 13.5258 18.4621 12.9453 18.1499 12.5438L19.2278 7.27737Z" />
                    <path d="M4.80792 18.3188C4.49572 17.9172 4.49572 17.3368 4.80792 16.9352L12.0002 9.22852L4.80792 18.3188Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-5/12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&auto=format" 
                alt="Mobile App Screenshot" 
                className="rounded-2xl shadow-2xl mx-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-emerald-500 rounded-full px-4 py-2 shadow-lg">
                <span className="text-lg font-bold">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
