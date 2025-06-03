
import React from 'react';
import { Package, Truck, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Package className="w-12 h-12 text-emerald-700" />,
      title: 'We Source Fresh',
      description: "Every morning, we select the best produce from Delhi's sabji mandis.",
      number: '01',
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-emerald-700" />,
      title: 'You Order Online',
      description: 'Browse and order from our wide selection of fresh vegetables and fruits.',
      number: '02',
    },
    {
      icon: <Truck className="w-12 h-12 text-emerald-700" />,
      title: 'Fast Delivery',
      description: 'We deliver your order to your doorstep within the same day.',
      number: '03',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">How It Works</h2>
          <div className="w-20 h-1 bg-emerald-700 mx-auto mb-6"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light">
            From the mandi to your doorstep in three simple steps
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-12 rounded-sm shadow-sm relative border-b-2 border-emerald-700"
            >
              <div className="absolute top-6 right-6 opacity-30 text-4xl font-light text-emerald-800">
                {step.number}
              </div>
              <div className="mb-8">{step.icon}</div>
              <h3 className="text-xl font-medium mb-4 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 font-light">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
