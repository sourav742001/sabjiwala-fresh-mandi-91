
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Award, Heart, Star } from 'lucide-react';

const partners = [
  {
    id: 1,
    name: "Organic Farmers Association",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Organic+Farmers",
    description: "Supporting sustainable farming practices across India",
    established: 2005,
  },
  {
    id: 2,
    name: "Farm Fresh Cooperative",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Farm+Fresh",
    description: "A network of 500+ local farmers providing quality produce",
    established: 2010,
  },
  {
    id: 3,
    name: "Green Planet Initiative",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Green+Planet",
    description: "Promoting eco-friendly agriculture and sustainable development",
    established: 2012,
  },
  {
    id: 4,
    name: "Delhi Food Council",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Food+Council",
    description: "Working to improve food safety and quality standards",
    established: 2008,
  },
  {
    id: 5,
    name: "Sustainable Agriculture Network",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Sustainable+Ag",
    description: "Research and advocacy for sustainable farming methods",
    established: 2007,
  },
  {
    id: 6,
    name: "Eco Packaging Solutions",
    logo: "https://placehold.co/200x80/e2e8f0/64748b?text=Eco+Packaging",
    description: "Providing biodegradable packaging for farm produce",
    established: 2015,
  },
];

const PartnershipSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div 
              className="bg-emerald-100 p-2 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Building size={24} className="text-emerald-600" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners & Affiliations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with trusted organizations that share our vision for quality, sustainability, and community support. These partnerships help us deliver the best produce to your doorstep.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div 
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-10 w-auto"
                    />
                  </div>
                  <div className="flex items-center text-emerald-600 text-sm font-medium">
                    <Building size={16} className="mr-1" />
                    <span>Est. {partner.established}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center text-emerald-700 text-sm font-medium">
                  <Award size={16} className="mr-1" />
                  <span>Certified Partner</span>
                </div>
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6 space-x-1">
            {Array(3).fill(0).map((_, i) => (
              <motion.div 
                key={i}
                className={`h-2 rounded-full ${i === 1 ? 'w-10 bg-emerald-600' : 'w-3 bg-emerald-300'}`}
                initial={{ width: 0 }}
                whileInView={{ width: i === 1 ? 40 : 12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              />
            ))}
          </div>
          <p className="text-emerald-800 font-medium">
            Together, we grow stronger and more sustainable
          </p>
          <div className="flex items-center justify-center mt-4">
            <Heart size={16} className="text-emerald-600 mr-1" />
            <span className="text-sm text-gray-500">Supporting 1500+ farmers across India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
