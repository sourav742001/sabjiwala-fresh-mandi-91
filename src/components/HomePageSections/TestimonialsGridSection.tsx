
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    title: "Home Cook",
    message: "I've never had such fresh vegetables delivered to my home. The spinach stays fresh for days, unlike what I used to get at regular stores.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    title: "Restaurant Owner",
    message: "As a restaurant owner, quality is everything. TheSabjiWala has been consistently delivering premium produce that my chefs love working with.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format"
  },
  {
    id: 3,
    name: "Anita Desai",
    title: "Health Enthusiast",
    message: "I appreciate the organic options and the transparency about where the vegetables come from. It makes me confident about what I'm feeding my family.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format"
  },
  {
    id: 4,
    name: "Vikram Singh",
    title: "Busy Professional",
    message: "The subscription service is a game-changer! I no longer have to worry about running out of fresh vegetables in the middle of the week.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=150&auto=format"
  },
  {
    id: 5,
    name: "Meera Patel",
    title: "Food Blogger",
    message: "The quality of produce from TheSabjiWala significantly elevates my recipes. My followers have noticed the difference in my food photography too!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format"
  },
  {
    id: 6,
    name: "Suresh Reddy",
    title: "Family Man",
    message: "The delivery is always on time, and the vegetables are exactly as shown in the app. No surprises, just consistently good quality.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format"
  }
];

const TestimonialsGridSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-full mb-4">
            <Star size={24} className="text-yellow-600 fill-yellow-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from customers who have made TheSabjiWala part of their healthy lifestyle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative"
            >
              <div className="absolute top-6 right-6 text-yellow-500">
                <Quote size={24} />
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">"{testimonial.message}"</p>
              
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">{testimonial.rating}.0</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-yellow-50 p-6 rounded-lg inline-block">
            <div className="flex items-center justify-center mb-2">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="ml-2 font-bold text-yellow-800">4.8/5</span>
            </div>
            <p className="text-gray-700">Based on 5000+ verified customer reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsGridSection;
