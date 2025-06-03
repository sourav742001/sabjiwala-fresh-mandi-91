
import React from 'react';
import { ArrowRight, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 30,
      unit: 'kg',
      discount: 0,
    },
    {
      id: 2,
      name: 'Green Capsicum',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 60,
      unit: 'kg',
      discount: 0,
    },
    {
      id: 3,
      name: 'Red Onions',
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 40,
      unit: 'kg',
      discount: 0,
    },
    {
      id: 4,
      name: 'Green Peas',
      image: 'https://images.unsplash.com/photo-1501286353178-1ec871814838?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 80,
      unit: 'kg',
      discount: 0,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
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
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-1 bg-emerald-700 mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">Featured Collection</h2>
            <p className="mt-3 text-lg text-gray-600 font-light">
              Curated selections, exceptional quality
            </p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ x: 5 }}
            className="mt-6 md:mt-0 flex items-center gap-2 text-emerald-700 font-medium"
          >
            View All Products <ArrowRight size={18} />
          </motion.button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white border border-gray-100 group"
            >
              {/* Product Image */}
              <div className="w-full h-64 overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-lg font-light mb-2 text-gray-800">{product.name}</h3>
                
                <div className="mb-4">
                  <span className="text-lg font-medium text-emerald-700">
                    ₹{product.price}/{product.unit}
                  </span>
                </div>
                
                {/* Add to Cart Button */}
                <div className="flex gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-emerald-700 text-white flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors rounded-sm"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border border-gray-200 hover:border-emerald-700 rounded-sm"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
