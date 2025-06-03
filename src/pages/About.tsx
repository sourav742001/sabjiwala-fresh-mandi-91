
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NewsletterForm from '@/components/AboutUs/NewsletterForm';
import ImageGallery from '@/components/AboutUs/ImageGallery';
import MandiMap from '@/components/AboutUs/MandiMap';
import WhatWeDo from '@/components/AboutUs/WhatWeDo';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/80 z-10" />
          <div 
            className="w-full h-[50vh] bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070')" }}
          />
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl text-white"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                  Fresh from Farm to Mandi – Now Online!
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  At TheSabjiWala.in, we bring you fresh vegetables directly from the farms to the renowned 
                  Jwalapuri Vegetable Market, now just a click away.
                </p>
                <Button className="btn-primary text-lg px-8 py-6">Explore Our Story</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Location & Legacy Section */}
        <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-light mb-6 text-emerald-800">
                  Rooted in <span className="font-medium">Jwalapuri Mandi</span>
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Based out of the bustling Jwalapuri Vegetable Market in Delhi, 
                  TheSabjiWala connects farmers and buyers without middlemen, ensuring 
                  transparency, freshness, and affordability.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Our roots go deep into the traditional mandi system, but our vision 
                  extends to the digital future of vegetable trading in India.
                </p>
                <div className="flex items-center">
                  <MapPin className="text-emerald-700 mr-2" />
                  <a 
                    href="https://maps.google.com/?q=Jwalapuri+Vegetable+Market+Delhi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline hover:text-emerald-800 transition-colors"
                  >
                    View on Google Maps
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <MandiMap />
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20 bg-sabjiwala-cream">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-emerald-800">
                What We <span className="font-medium">Do</span>
              </h2>
              <p className="text-gray-700">
                We're revolutionizing the traditional mandi experience, bringing convenience without 
                compromising on the quality and authenticity that the mandi is known for.
              </p>
            </motion.div>
            
            <WhatWeDo />
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-emerald-800">
                The Mandi <span className="font-medium">Experience</span>
              </h2>
              <p className="text-gray-700">
                Experience the vibrant atmosphere and fresh produce of Jwalapuri Vegetable Market through our gallery.
              </p>
            </motion.div>
            
            <ImageGallery />
          </div>
        </section>

        {/* Online Launch Section */}
        <section className="py-20 bg-emerald-700 text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-light mb-6">
                  TheSabjiWala.in – your online mandi experience 
                  <span className="font-medium block mt-2">is launching soon!</span>
                </h2>
                <p className="opacity-90 mb-8 leading-relaxed">
                  Be the first to experience the convenience of online vegetable shopping with the 
                  authenticity of traditional mandi prices and quality.
                </p>
                <Button className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-8 py-6">
                  Notify Me
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <NewsletterForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Us Footer Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-emerald-800">
                Our <span className="font-medium">Mission</span>
              </h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                We're a passionate team working to digitize India's traditional mandi ecosystem, 
                supporting farmers and delighting customers with quality and convenience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-emerald-50">
                        <Users className="text-emerald-700 h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-emerald-800 mb-2">Our Team</h3>
                    <p className="text-gray-600 text-sm">
                      A diverse team of experts in agriculture, technology, and logistics
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-emerald-50">
                        <Clock className="text-emerald-700 h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-emerald-800 mb-2">Our Journey</h3>
                    <p className="text-gray-600 text-sm">
                      Started in 2023, evolving the age-old mandi system for the digital era
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-emerald-50">
                        <Mail className="text-emerald-700 h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-emerald-800 mb-2">Contact Us</h3>
                    <p className="text-gray-600 text-sm">
                      Have questions? Reach out to us at 
                      <a href="mailto:info@thesabjiwala.in" className="text-emerald-700"> info@thesabjiwala.in</a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
