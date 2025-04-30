
import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-20 h-1 bg-emerald-700 mx-auto mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">Join Our Community</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light mb-10">
            Subscribe to receive updates on seasonal specials, exclusive offers, and curated recipes using the freshest produce.
          </p>
        
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-emerald-700 text-gray-800"
                required
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-emerald-700 text-white hover:bg-emerald-800 transition-colors rounded-sm sm:whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-center text-sm mt-5 text-gray-500 font-light">
              By subscribing, you agree to our Privacy Policy and consent to receive our promotional emails.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
