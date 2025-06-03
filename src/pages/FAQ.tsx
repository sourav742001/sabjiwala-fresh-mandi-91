
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-emerald-50 py-16"
        >
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-light text-gray-900 mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600">
                Find answers to common questions about TheSabjiWala services
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* FAQ Content */}
        <section className="py-16">
          <div className="container-custom max-w-3xl">
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="item-1" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  How do you ensure the freshness of vegetables?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  We source our vegetables directly from local farms every morning. All products are carefully inspected for quality and freshness before being delivered to your doorstep. We guarantee same-day harvest to delivery for maximum freshness.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  What are your delivery hours?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  We deliver from 8:00 AM to 8:00 PM daily. During checkout, you can select your preferred delivery time slot, and we'll ensure your order arrives within that window.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  Do you have a minimum order value?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  Yes, we have a minimum order value of ₹150. Orders below this amount will incur a small delivery fee of ₹30.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  How do I return items that aren't fresh?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  We have a no-questions-asked return policy. If you're not satisfied with the quality of any item, simply notify our customer service within 24 hours of delivery, and we'll arrange for a replacement or refund.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  We accept all major credit/debit cards, UPI payments, net banking, and cash on delivery. All online payments are processed through secure payment gateways.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  Do you offer subscriptions or regular deliveries?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  Yes, we offer weekly and monthly subscription plans for regular essentials. Subscribers enjoy additional benefits like priority delivery and special discounts.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  What areas do you currently service?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  We currently deliver to all major areas in Delhi NCR. You can check if your location is serviceable by entering your pincode on our checkout page.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="border border-emerald-100 rounded-md overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50">
                  How can I track my order?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  Once your order is confirmed, you'll receive real-time updates via SMS and email. You can also track your delivery in real-time through our app or website's order tracking section.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
