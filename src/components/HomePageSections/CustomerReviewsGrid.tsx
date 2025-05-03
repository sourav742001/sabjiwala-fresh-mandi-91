
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    comment: "The vegetables are always fresh and delivered on time. TheSabjiWala has become my go-to for all produce needs!",
    date: "2 days ago"
  },
  {
    name: "Rahul Gupta",
    location: "Noida",
    rating: 4,
    comment: "I've been ordering from them for 3 months now. The quality is consistently good and prices are reasonable.",
    date: "1 week ago"
  },
  {
    name: "Ananya Patel",
    location: "Gurgaon",
    rating: 5,
    comment: "Love their organic range! You can really taste the difference compared to supermarket vegetables.",
    date: "2 weeks ago"
  },
  {
    name: "Vikram Singh",
    location: "Delhi",
    rating: 5,
    comment: "Very impressed with the same-day delivery service. Everything arrives fresh and well packaged.",
    date: "3 weeks ago"
  },
  {
    name: "Meera Khanna",
    location: "Faridabad",
    rating: 4,
    comment: "Great quality produce and excellent customer service. They promptly replaced items that weren't up to standard.",
    date: "1 month ago"
  },
  {
    name: "Arjun Malhotra",
    location: "Delhi",
    rating: 5,
    comment: "My family loves the freshness! We've completely switched to TheSabjiWala for our weekly vegetable shopping.",
    date: "1 month ago"
  }
];

const CustomerReviewsGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real reviews from people who trust us for their daily vegetable needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16} 
                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-3">"{review.comment}"</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsGrid;
