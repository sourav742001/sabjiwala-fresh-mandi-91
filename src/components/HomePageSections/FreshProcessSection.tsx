
import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    number: "01",
    title: "Morning Harvest",
    description: "Vegetables are harvested early morning when they're at their nutritional peak",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    number: "02",
    title: "Quality Check",
    description: "Each vegetable undergoes strict quality inspection for freshness and appearance",
    color: "bg-blue-100 text-blue-600",
  },
  {
    number: "03",
    title: "Careful Cleaning",
    description: "Gentle cleaning to remove dirt while preserving natural protective layers",
    color: "bg-purple-100 text-purple-600",
  },
  {
    number: "04",
    title: "Eco Packaging",
    description: "Packed in biodegradable materials to maintain freshness during transit",
    color: "bg-amber-100 text-amber-600",
  },
  {
    number: "05",
    title: "Quick Delivery",
    description: "Delivered within hours of harvesting to ensure maximum freshness",
    color: "bg-red-100 text-red-600",
  },
];

const FreshProcessSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Freshness Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We follow a rigorous process to ensure that every vegetable that reaches your door is at its freshest and most nutritious
          </p>
        </motion.div>

        <div className="relative">
          {/* Process line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gray-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-24 h-24 flex items-center justify-center rounded-full ${step.color} text-3xl font-bold mx-auto mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreshProcessSection;
