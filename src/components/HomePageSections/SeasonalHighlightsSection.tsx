
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const seasonalItems = [
  {
    id: 1,
    name: "Alphonso Mangoes",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&auto=format",
    season: "Summer",
    price: "₹350/kg",
    rating: 4.9,
    reviews: 128,
    limited: true
  },
  {
    id: 2,
    name: "Strawberries",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600&auto=format",
    season: "Winter",
    price: "₹200/box",
    rating: 4.7,
    reviews: 94,
    limited: true
  },
  {
    id: 3,
    name: "Sweet Corn",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format",
    season: "Monsoon",
    price: "₹40/piece",
    rating: 4.5,
    reviews: 72,
    limited: false
  }
];

const SeasonalHighlightsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-4">
            <Calendar size={24} className="text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seasonal Highlights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the freshest and most flavorful produce that this season has to offer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {seasonalItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md relative h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full font-medium text-sm text-amber-700">
                  {item.season} Special
                </div>
                {item.limited && (
                  <div className="absolute bottom-4 right-4 bg-red-600 py-1 px-3 rounded-full text-white text-xs font-medium uppercase">
                    Limited Availability
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        size={14}
                        className={`${
                          i < Math.floor(item.rating) 
                            ? "text-amber-400 fill-amber-400" 
                            : i < item.rating 
                              ? "text-amber-400 fill-amber-400 opacity-50" 
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{item.rating} ({item.reviews})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-700">{item.price}</span>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="outline" size="lg" className="border-amber-500 text-amber-700 hover:bg-amber-50">
            View All Seasonal Produce
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonalHighlightsSection;
