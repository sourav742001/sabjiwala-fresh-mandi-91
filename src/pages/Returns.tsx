
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Returns = () => {
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
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-light text-gray-900 mb-4">Returns & Refunds</h1>
              <p className="text-lg text-gray-600">
                Our policies to ensure your satisfaction with every purchase
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Policy Content */}
        <section className="py-16">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-emerald max-w-none">
              <h2 className="text-2xl mb-6">Quality Guarantee</h2>
              <p>
                At TheSabjiWala, we guarantee the quality and freshness of all our products. If you're not completely satisfied with the quality of any item you receive, we're committed to making it right.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Return Policy</h2>
              <p>
                We have a no-questions-asked return policy for all our products. If you find any issues with the freshness, quality, or condition of your items, please notify us within 24 hours of delivery. You can do this through:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li>Our customer support helpline: +91 98765 43210</li>
                <li>Email: returns@thesabjiwala.com</li>
                <li>The "My Orders" section of our website or app</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">Refund Process</h2>
              <p>
                Once your return request is approved, you can choose from the following options:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li>Replacement: We'll deliver a replacement for the item in your next order or arrange for an immediate replacement delivery.</li>
                <li>Store Credit: The amount will be added to your TheSabjiWala wallet, which can be used for future purchases.</li>
                <li>Refund: The amount will be refunded to the original payment method used for the purchase.</li>
              </ul>
              <p>
                For returns, the refund process typically takes 5-7 business days to reflect in your account, depending on your bank's policies.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Conditions for Returns</h2>
              <p>
                While we have a flexible return policy, please note the following conditions:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li>Return requests must be made within 24 hours of delivery.</li>
                <li>The product should be in the same condition as delivered, if applicable.</li>
                <li>For items sold by weight (e.g., vegetables, fruits), if the actual weight is found to be less than what was charged, we will refund the difference.</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">Non-Returnable Items</h2>
              <p>
                For hygiene and safety reasons, certain items cannot be returned once delivered, unless they're damaged or defective. These include:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li>Cut or processed fruits and vegetables</li>
                <li>Custom-prepared items</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">Cancellation Policy</h2>
              <p>
                You can cancel your order for a full refund if the order has not yet been processed or dispatched. Once an order is out for delivery, cancellation may not be possible. In such cases, you can refuse to accept the delivery, and a refund will be processed.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
