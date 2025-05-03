
import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tips = [
  {
    id: 1,
    title: "Store Leafy Greens Properly",
    description: "Keep spinach and other leafy greens wrapped in a damp paper towel inside an airtight container in the fridge.",
    icon: "🥬"
  },
  {
    id: 2,
    title: "Revive Wilted Vegetables",
    description: "Soak wilted vegetables in ice water for 5-10 minutes to restore their crispness.",
    icon: "🥕"
  },
  {
    id: 3,
    title: "Don't Wash Before Storage",
    description: "Only wash vegetables right before using them, as moisture can promote bacterial growth during storage.",
    icon: "💧"
  },
  {
    id: 4,
    title: "Perfect Roasted Vegetables",
    description: "Cut vegetables in similar sizes for even roasting, and don't overcrowd the pan.",
    icon: "🔥"
  }
];

const CulinaryTipsSection = () => {
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
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-4">
            <ChefHat size={24} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Culinary Tips & Tricks</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional advice to help you make the most of your fresh produce
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {tips.map((tip, index) => (
            <motion.div 
              key={tip.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-emerald-200 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 group"
            size="lg"
          >
            <span>View All Cooking Tips</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CulinaryTipsSection;
