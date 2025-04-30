
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="w-20 h-1 bg-emerald-700 mb-8"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
              Fresh Produce,<br />
              <span className="text-emerald-700 font-medium">Elevated</span> 
            </h1>
            <p className="mt-8 text-lg text-gray-600 max-w-lg font-light leading-relaxed">
              Experience nature's finest bounty, curated and delivered with the elegance it deserves. Farm-fresh vegetables and fruits, from source to your table.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-6"
            >
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-emerald-700 text-white flex items-center gap-2 hover:bg-emerald-800 transition-colors rounded-sm"
              >
                Explore Collection <ArrowRight size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-gray-300 text-gray-800 hover:border-emerald-700 hover:text-emerald-800 transition-colors rounded-sm"
              >
                Our Philosophy
              </motion.button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex items-center gap-12"
            >
              <div className="flex flex-col">
                <span className="font-light text-2xl text-emerald-800">100%</span>
                <span className="text-sm text-gray-500 mt-1">Fresh Daily</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="font-light text-2xl text-emerald-800">Luxury</span>
                <span className="text-sm text-gray-500 mt-1">Experience</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="font-light text-2xl text-emerald-800">Quality</span>
                <span className="text-sm text-gray-500 mt-1">Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute -top-10 -left-10 w-32 h-32 border border-emerald-200 rounded-sm"
              ></motion.div>
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Fresh vegetables and fruits" 
                className="rounded-sm object-cover w-full h-[500px] relative z-10"
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="absolute -bottom-10 -right-10 w-32 h-32 border border-emerald-200 rounded-sm"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
