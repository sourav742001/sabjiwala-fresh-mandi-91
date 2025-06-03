
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const nutritionalItems = [
  {
    vegetable: "Spinach",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format",
    benefits: ["High in iron", "Rich in vitamins A & C", "Good source of antioxidants"],
    color: "bg-green-500"
  },
  {
    vegetable: "Carrots",
    image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=500&auto=format",
    benefits: ["Rich in beta-carotene", "Supports eye health", "High in fiber"],
    color: "bg-orange-500"
  },
  {
    vegetable: "Broccoli",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format",
    benefits: ["High in vitamin K", "Good source of folate", "Cancer-fighting properties"],
    color: "bg-green-600"
  },
  {
    vegetable: "Bell Peppers",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format",
    benefits: ["Rich in vitamin C", "Good source of vitamin E", "Anti-inflammatory"],
    color: "bg-red-500"
  }
];

const NutritionalInfoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nutritional Benefits</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the health benefits of our fresh vegetables and make informed choices for your diet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nutritionalItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full border-0 shadow-md">
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.vegetable}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-0 right-0 ${item.color} text-white px-3 py-1 text-sm font-medium`}>
                    {item.vegetable}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-xl mb-3">Health Benefits</h3>
                  <ul className="space-y-2">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NutritionalInfoSection;
