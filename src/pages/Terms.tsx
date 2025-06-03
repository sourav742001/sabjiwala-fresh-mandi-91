
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
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
              <h1 className="text-4xl font-light text-gray-900 mb-4">Terms & Conditions</h1>
              <p className="text-lg text-gray-600">
                Please read these terms carefully before using our services
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Terms Content */}
        <section className="py-16">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-emerald max-w-none">
              <p>
                Last updated: May 01, 2025
              </p>
              
              <h2 className="text-2xl mt-8 mb-6">1. Introduction</h2>
              <p>
                Welcome to TheSabjiWala. These Terms & Conditions govern your use of our website, mobile application, and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our services.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">2. Definitions</h2>
              <ul className="list-disc ml-6 my-4">
                <li><strong>"Service"</strong> refers to the website, mobile application, and delivery services operated by TheSabjiWala.</li>
                <li><strong>"User"</strong> refers to any individual who accesses or uses the Service.</li>
                <li><strong>"Products"</strong> refers to the items available for purchase through our Service.</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">3. Account Registration</h2>
              <p>
                To use certain features of our Service, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password. We encourage you to use a strong password and to keep it secure.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">4. Orders and Payments</h2>
              <p>
                By placing an order through our Service, you confirm that you intend to purchase the selected Products at the prices indicated, plus any applicable delivery charges and taxes.
              </p>
              <p>
                We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in the description or price of Products, or errors in your order.
              </p>
              <p>
                Payment can be made through various methods we make available. By making a payment, you warrant that you are authorized to use the payment method you have selected.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">5. Delivery</h2>
              <p>
                We will deliver Products to the address provided during the order process, subject to our delivery coverage area. Delivery times are estimates and not guaranteed. Factors outside our control, such as weather or traffic conditions, may affect delivery times.
              </p>
              <p>
                You agree to ensure that someone is present at the delivery address to receive the Products, or to make appropriate arrangements for delivery if no one will be present.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">6. Product Quality</h2>
              <p>
                We strive to provide fresh, high-quality Products. If you are not satisfied with the quality of any Product, please refer to our Returns & Refunds Policy.
              </p>
              <p>
                Product images on our Service are for illustrative purposes only. Actual Products may vary slightly from the images displayed.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">7. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of TheSabjiWala. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p>
                You may not duplicate, copy, or reuse any portion of the HTML/CSS, JavaScript, or visual design elements without express written permission from us.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, TheSabjiWala shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at legal@thesabjiwala.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
