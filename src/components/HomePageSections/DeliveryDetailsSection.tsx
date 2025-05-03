
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const DeliveryDetailsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-800">Fast & Reliable Delivery</h2>
            <p className="text-gray-600 mb-6 text-lg">
              We understand the importance of timely delivery when it comes to fresh vegetables. Our efficient delivery network ensures your vegetables reach you at their freshest.
            </p>
            
            <div className="space-y-4 mb-8">
              <Card className="border-l-4 border-l-emerald-500 shadow-sm">
                <CardContent className="py-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Same Day Delivery</h3>
                      <p className="text-sm text-gray-500">Order before 11 AM for same-day delivery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500 shadow-sm">
                <CardContent className="py-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Contactless Payment</h3>
                      <p className="text-sm text-gray-500">Safe and secure payment options</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-purple-500 shadow-sm">
                <CardContent className="py-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Live Order Tracking</h3>
                      <p className="text-sm text-gray-500">Track your order in real-time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Check Delivery Areas
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-emerald-50 rounded-xl p-8 relative">
              <div className="absolute top-4 left-4 bg-emerald-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mt-12 mb-6">Delivery Time Slots</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <div>
                    <span className="block font-medium">Morning</span>
                    <span className="text-sm text-gray-500">8:00 AM - 12:00 PM</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">Popular</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <div>
                    <span className="block font-medium">Afternoon</span>
                    <span className="text-sm text-gray-500">12:00 PM - 4:00 PM</span>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Available</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block font-medium">Evening</span>
                    <span className="text-sm text-gray-500">4:00 PM - 8:00 PM</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">Popular</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Delivery Fee</h4>
                <div className="flex justify-between">
                  <span>Orders above ₹300</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Orders below ₹300</span>
                  <span>₹30</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-emerald-500 rounded-full w-16 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryDetailsSection;
