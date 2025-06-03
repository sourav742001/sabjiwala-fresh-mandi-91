
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 1,
    name: "Leafy Greens",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format",
    count: "24 items",
    color: "bg-emerald-200"
  },
  {
    id: 2,
    name: "Root Vegetables",
    image: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=500&auto=format",
    count: "18 items",
    color: "bg-amber-200"
  },
  {
    id: 3,
    name: "Herbs & Spices",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&auto=format",
    count: "32 items",
    color: "bg-green-200"
  },
  {
    id: 4,
    name: "Seasonal Fruits",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500&auto=format",
    count: "15 items",
    color: "bg-orange-200"
  },
  {
    id: 5,
    name: "Exotic Vegetables",
    image: "https://images.unsplash.com/photo-1566451122843-2a334d6473d2?w=500&auto=format",
    count: "12 items",
    color: "bg-purple-200"
  },
  {
    id: 6,
    name: "Organic Selection",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format",
    count: "20 items",
    color: "bg-teal-200"
  }
];

const FeaturedCategoriesSection = () => {
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
              <div className="p-2 bg-indigo-100 rounded-full mr-3">
                <LayoutGrid size={24} className="text-indigo-600" />
              </div>
              <span className="text-sm uppercase tracking-wider font-medium text-indigo-600">Browse by Category</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Categories</h2>
            <p className="text-gray-600 max-w-lg">
              Explore our wide selection of fresh produce organized by categories for easy shopping
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button className="bg-indigo-600 hover:bg-indigo-700 group">
              <span>All Categories</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className={`rounded-xl overflow-hidden relative ${category.color} h-64`}>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count}</p>
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 z-10 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;
