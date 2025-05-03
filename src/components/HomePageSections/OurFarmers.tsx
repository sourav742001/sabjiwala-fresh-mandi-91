
import React from 'react';
import { motion } from 'framer-motion';

const farmers = [
  {
    name: "Ramesh Kumar",
    location: "Haryana",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format",
    quote: "I've been growing organic vegetables for over 20 years. Working with TheSabjiWala has helped me reach more customers who appreciate quality produce."
  },
  {
    name: "Sunita Devi",
    location: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1509506489701-dfe23b067808?w=500&auto=format",
    quote: "TheSabjiWala provides fair prices for our hard work. My vegetables go directly to homes without middlemen taking profits."
  },
  {
    name: "Mahendra Singh",
    location: "Punjab",
    image: "https://images.unsplash.com/photo-1598880942562-98ba508b4064?w=500&auto=format",
    quote: "I'm proud that my vegetables reach urban homes within hours of harvest. The freshness makes all the difference."
  }
];

const OurFarmers = () => {
  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-800">Meet Our Farmers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work directly with local farmers who are passionate about growing the best quality produce using sustainable practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {farmers.map((farmer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={farmer.image} 
                  alt={farmer.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{farmer.name}</h3>
                <p className="text-emerald-600 mb-4">{farmer.location}</p>
                <blockquote className="italic text-gray-600 border-l-4 border-emerald-300 pl-4">
                  "{farmer.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFarmers;
