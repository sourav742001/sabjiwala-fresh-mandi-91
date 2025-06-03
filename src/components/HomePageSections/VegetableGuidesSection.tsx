
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const guides = [
  {
    id: 1,
    title: "How to Choose the Perfect Tomatoes",
    image: "https://images.unsplash.com/photo-1582284540017-9c3dfa318a08?w=500&auto=format",
    excerpt: "Learn to identify ripe tomatoes by color, firmness, and aroma for the best flavor in your dishes.",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Seasonal Guide to Indian Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format",
    excerpt: "Discover which vegetables are in season each month for the freshest, most flavorful options.",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Storing Vegetables for Maximum Freshness",
    image: "https://images.unsplash.com/photo-1449175334484-66563eebb7ff?w=500&auto=format",
    excerpt: "Proper storage techniques to extend the shelf life of your vegetables and reduce food waste.",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "Nutrient Guide: Colors of Vegetables",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format",
    excerpt: "Understanding what the different colors of vegetables tell you about their nutritional benefits.",
    readTime: "6 min read"
  }
];

const VegetableGuidesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-full mr-3">
                <BookOpen size={24} className="text-purple-600" />
              </div>
              <span className="text-sm uppercase tracking-wider font-medium text-purple-600">Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Vegetable Guides</h2>
            <p className="text-gray-600 max-w-lg">
              Expert advice to help you select, store, and prepare vegetables for maximum flavor and nutrition
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button className="bg-purple-600 hover:bg-purple-700">
              <span>View All Guides</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-xs text-purple-600 font-medium mb-2">{guide.readTime}</div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{guide.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guide.excerpt}</p>
                  <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0">
                    Read Guide
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VegetableGuidesSection;
