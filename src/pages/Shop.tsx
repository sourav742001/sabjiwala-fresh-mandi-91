
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Filter, ArrowRight } from 'lucide-react';
import { vegetables } from '@/data/vegetables';

const Shop = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-emerald-50"
        >
          <div className="container-custom py-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="w-16 h-1 bg-emerald-700 mb-6"></div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Our <span className="text-emerald-700 font-medium">Collection</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-light">
                  Discover our carefully curated selection of premium fresh produce
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Shop Content */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-64 shrink-0"
              >
                <div className="p-6 border border-emerald-100 rounded-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter size={18} className="text-emerald-700" />
                    <h2 className="text-xl font-medium">Filters</h2>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="vegetables" className="mr-2 accent-emerald-700" />
                        <label htmlFor="vegetables" className="text-gray-700">Vegetables</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="fruits" className="mr-2 accent-emerald-700" />
                        <label htmlFor="fruits" className="text-gray-700">Fruits</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="combos" className="mr-2 accent-emerald-700" />
                        <label htmlFor="combos" className="text-gray-700">Daily Combos</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="exotics" className="mr-2 accent-emerald-700" />
                        <label htmlFor="exotics" className="text-gray-700">Exotic Collection</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Price Range</h3>
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      className="w-full accent-emerald-700" 
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>₹0</span>
                      <span>₹500</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Products grid */}
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-between items-center mb-8"
                >
                  <h2 className="text-xl font-medium">All Products <span className="text-gray-500 text-sm">({vegetables.length} items)</span></h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select className="border border-gray-200 rounded-sm p-1 text-sm focus:outline-none focus:border-emerald-700">
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest First</option>
                    </select>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {vegetables.map((vegetable) => (
                    <motion.div
                      key={vegetable.id}
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                      className="border border-gray-100 group"
                    >
                      <Link to={`/vegetable/${vegetable.id}`} className="block">
                        <div className="w-full h-64 overflow-hidden bg-emerald-50">
                          <motion.img 
                            src={vegetable.images[0].url}
                            alt={vegetable.images[0].alt}
                            className="w-full h-full object-cover transition-transform"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        
                        <div className="p-6 border-t border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-light text-gray-800">{vegetable.name}</h3>
                            {vegetable.isOrganic && (
                              <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-sm">Organic</span>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <span className="text-lg font-medium text-emerald-700">
                              ₹{vegetable.price}/{vegetable.unit}
                            </span>
                          </div>
                          
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-emerald-700 text-white flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors rounded-sm"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-12 flex justify-center"
                >
                  <button className="flex items-center gap-2 px-6 py-3 border border-emerald-700 text-emerald-700 hover:bg-emerald-50 transition-colors rounded-sm">
                    Load More <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
