
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Truck, CreditCard, ShieldCheck, Leaf, RotateCcw, 
  Mail, MapPin, Phone, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Same Day Delivery",
    description: "Order before 2 PM for delivery on the same day within city limits"
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "100% Fresh Guarantee",
    description: "We guarantee the freshness of all produce or your money back"
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Free Shipping",
    description: "Free delivery on all orders above ₹500 within city limits"
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Secure Payments",
    description: "Multiple secure payment options including COD available"
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Quality Assurance",
    description: "Every vegetable passes our strict 3-step quality check"
  },
  {
    icon: <RotateCcw className="h-6 w-6" />,
    title: "Easy Returns",
    description: "Not satisfied? We'll pick up and refund, no questions asked"
  }
];

const ValuePropositionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TheSabjiWala?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We strive to provide the best shopping experience with premium quality produce and exceptional service
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="bg-emerald-100 p-3 rounded-lg inline-flex items-center justify-center text-emerald-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-emerald-800 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Experience the TheSabjiWala Difference
              </h3>
              <p className="text-emerald-100 mb-6">
                Join thousands of satisfied customers who trust us for their daily vegetable needs.
                From farm to your doorstep, we ensure quality at every step.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-emerald-700/50 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">20+</span>
                    </div>
                    <span className="text-white">Mandi Partners</span>
                  </div>
                </div>
                
                <div className="bg-emerald-700/50 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">500+</span>
                    </div>
                    <span className="text-white">Farmers Network</span>
                  </div>
                </div>
                
                <div className="bg-emerald-700/50 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">98%</span>
                    </div>
                    <span className="text-white">Satisfaction Rate</span>
                  </div>
                </div>
              </div>
              
              <Button size="lg" variant="default" className="bg-white text-emerald-800 hover:bg-gray-100">
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
            
            <div className="lg:col-span-2 bg-emerald-700 p-8 md:p-12 flex flex-col justify-center">
              <h4 className="text-xl font-semibold text-white mb-6">Get in Touch</h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1">
                    <MapPin size={18} className="text-emerald-300 mr-3" />
                  </div>
                  <div>
                    <p className="text-white">
                      Bhim Nagar, JJ Colony No 3, <br />
                      Nangloi, Delhi, 110087, <br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone size={18} className="text-emerald-300 mr-3" />
                  <a href="tel:+919871574228" className="text-white hover:text-emerald-200 transition-colors">
                    +91 9871574228
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail size={18} className="text-emerald-300 mr-3" />
                  <a href="mailto:developermishra18@gmail.com" className="text-white hover:text-emerald-200 transition-colors">
                    developermishra18@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <MessageCircle size={18} className="text-emerald-300 mr-3" />
                  <a 
                    href="https://wa.me/919871574228" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-emerald-200 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-emerald-600 w-full">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
