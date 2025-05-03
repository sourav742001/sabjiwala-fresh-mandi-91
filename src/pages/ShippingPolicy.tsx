
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ShippingPolicy = () => {
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
              <h1 className="text-4xl font-light text-gray-900 mb-4">Shipping Policy</h1>
              <p className="text-lg text-gray-600">
                Learn about our shipping procedures, timelines, and delivery details
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Policy Content */}
        <section className="py-16">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-emerald max-w-none">
              <h2 className="text-2xl mb-6">Delivery Areas</h2>
              <p>
                TheSabjiWala currently services all major areas in Delhi NCR. We're constantly expanding our delivery network to reach more locations. You can check if we deliver to your area by entering your pincode on our website or during checkout.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Delivery Timeframes</h2>
              <p>
                We offer same-day delivery for all orders placed before 11:00 AM. Orders placed after this time will be delivered the next day. During checkout, you can select from available delivery time slots:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li>Morning: 8:00 AM - 12:00 PM</li>
                <li>Afternoon: 12:00 PM - 4:00 PM</li>
                <li>Evening: 4:00 PM - 8:00 PM</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">Shipping Charges</h2>
              <p>
                For orders above ₹300, we offer free delivery. Orders below this amount will incur a delivery charge of ₹30. Special delivery requirements or express delivery options may have additional charges.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Order Tracking</h2>
              <p>
                Once your order is confirmed, you'll receive an order confirmation via email and SMS. On the day of delivery, you'll receive updates about your order status, including when it's out for delivery. You can track your order in real-time through our website or app.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Contactless Delivery</h2>
              <p>
                We offer contactless delivery options. If you prefer this service, please select the "Contactless Delivery" option during checkout and provide any specific instructions for our delivery partner.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Failed Deliveries</h2>
              <p>
                If we're unable to deliver your order due to unavailability or incorrect address information, our delivery partner will try to contact you. If contact cannot be established, the order will be returned to our facility. We may attempt redelivery the next day, or you can contact our customer support to arrange for an alternative delivery time.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Delivery of Perishable Items</h2>
              <p>
                As we deal primarily with fresh produce, our delivery partners are trained to handle perishable items with care. All vegetables and fruits are packed in eco-friendly packaging that helps maintain freshness during transit.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
