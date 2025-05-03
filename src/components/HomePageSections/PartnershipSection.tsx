
import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  {
    id: 1,
    name: "Organic Farmers Association",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Organic+Farmers",
  },
  {
    id: 2,
    name: "Farm Fresh Cooperative",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Farm+Fresh",
  },
  {
    id: 3,
    name: "Green Planet Initiative",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Green+Planet",
  },
  {
    id: 4,
    name: "Delhi Food Council",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Food+Council",
  },
  {
    id: 5,
    name: "Sustainable Agriculture Network",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Sustainable+Ag",
  },
  {
    id: 6,
    name: "Eco Packaging Solutions",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Eco+Packaging",
  },
];

const PartnershipSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners & Affiliations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with trusted organizations that share our vision for quality, sustainability, and community support
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div 
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gray-50 p-4 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow duration-300"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-h-12 w-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
