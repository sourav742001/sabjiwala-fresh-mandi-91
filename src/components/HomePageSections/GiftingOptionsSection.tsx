
import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const giftOptions = [
  {
    id: 1,
    name: "Seasonal Vegetable Box",
    image: "https://images.unsplash.com/photo-1592924357228-becb1eb9d8fe?w=500&auto=format",
    price: "₹799",
    description: "A hand-picked selection of the season's freshest vegetables",
    contents: "8-10 items",
    bestseller: true
  },
  {
    id: 2,
    name: "Exotic Fruit Basket",
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&auto=format",
    price: "₹1,199",
    description: "Premium selection of seasonal and exotic fruits",
    contents: "6-8 items",
    bestseller: false
  },
  {
    id: 3,
    name: "Fresh & Healthy Gift Box",
    image: "https://images.unsplash.com/photo-1506073881649-4e23be3e9ed0?w=500&auto=format",
    price: "₹1,499",
    description: "Curated vegetables, fruits, and health foods in a gift box",
    contents: "12-15 items",
    bestseller: false
  }
];

const GiftingOptionsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-pink-100 rounded-full mb-4">
            <Gift size={24} className="text-pink-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gift the Goodness of Nature</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share the gift of health and freshness with your loved ones through our specially curated gift boxes
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {giftOptions.map((option, index) => (
            <motion.div 
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={option.image} 
                  alt={option.name}
                  className="w-full h-56 object-cover"
                />
                {option.bestseller && (
                  <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Bestseller
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{option.name}</h3>
                  <span className="text-lg font-bold text-pink-600">{option.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Contains: {option.contents}</span>
                  <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                    Order Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-semibold mb-2">Custom Gift Solutions</h3>
              <p className="text-gray-600">
                Looking for something special? We can create custom gift boxes for corporate events, 
                festivals, or personal celebrations based on your preferences and budget.
              </p>
            </div>
            <Button 
              className="bg-pink-600 hover:bg-pink-700 whitespace-nowrap group"
              size="lg"
            >
              <span>Customize Your Gift</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftingOptionsSection;
