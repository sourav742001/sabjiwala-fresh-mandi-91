
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Package, Store } from 'lucide-react';

const benefitsData = [
  {
    icon: <Store size={32} />,
    title: "Farm Fresh",
    description: "Our vegetables come directly from farms, ensuring maximum freshness and flavor in every bite."
  },
  {
    icon: <Calendar size={32} />,
    title: "Daily Harvests",
    description: "We source vegetables that are harvested daily, so you get the freshest produce possible."
  },
  {
    icon: <Package size={32} />,
    title: "Eco-Friendly Packaging",
    description: "All our vegetables are packed in biodegradable materials, reducing environmental impact."
  },
  {
    icon: <Heart size={32} />,
    title: "Health & Nutrition",
    description: "Our vegetables retain more nutrients due to our quick farm-to-table process."
  }
];

const BenefitsSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Vegetables?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At TheSabjiWala, we ensure quality at every step - from the farm to your table.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsData.map((benefit, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
