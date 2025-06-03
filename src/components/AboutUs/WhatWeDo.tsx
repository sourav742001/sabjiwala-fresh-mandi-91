
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Store, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: "Farm-to-Market Delivery",
    description: "We pick up vegetables directly from farms and deliver them to your doorstep, ensuring maximum freshness."
  },
  {
    icon: Store,
    title: "Online Vegetable Mandi Access",
    description: "Experience the traditional mandi shopping experience from the comfort of your home."
  },
  {
    icon: Award,
    title: "Freshness Guarantee",
    description: "We promise only the freshest produce - harvested daily and delivered promptly."
  },
  {
    icon: Users,
    title: "Local Farmer Partnerships",
    description: "We work directly with local farmers, ensuring fair prices and supporting the agricultural community."
  }
];

const WhatWeDo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-emerald-50 mr-4">
              <feature.icon className="text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WhatWeDo;
