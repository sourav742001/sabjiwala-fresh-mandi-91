
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const seasonalItems = [
  {
    name: "Fresh Strawberries",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=500&auto=format",
    price: "₹149/kg",
    discount: "25% off",
  },
  {
    name: "Green Peas",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format",
    price: "₹89/kg",
    discount: "15% off",
  },
  {
    name: "Watermelon",
    image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=500&auto=format",
    price: "₹29/kg",
    discount: "20% off",
  },
  {
    name: "Mangoes",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format",
    price: "₹249/kg",
    discount: "10% off",
  }
];

const SeasonalSection = () => {
  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-emerald-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Seasonal Specials
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take advantage of the freshest produce this season has to offer, picked at the peak of ripeness
            and delivered straight to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {item.discount}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                  <p className="text-emerald-600 font-bold">{item.price}</p>
                  <Button variant="outline" className="w-full mt-3 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/seasonal-items">
            <Button 
              variant="default" 
              className="bg-emerald-600 hover:bg-emerald-700 group"
            >
              View All Seasonal Items <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeasonalSection;
