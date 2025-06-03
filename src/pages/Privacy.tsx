
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
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
              <h1 className="text-4xl font-light text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-lg text-gray-600">
                How we collect, use, and protect your personal information
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Policy Content */}
        <section className="py-16">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-emerald max-w-none">
              <p>
                Last updated: May 01, 2025
              </p>
              
              <h2 className="text-2xl mt-8 mb-6">Introduction</h2>
              <p>
                At TheSabjiWala, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our services and tell you about your privacy rights and how the law protects you.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Information We Collect</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our service to you:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address, and billing information.</li>
                <li><strong>Usage Data:</strong> Information on how you use our website and services, including browsing history, products viewed, and purchase history.</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                <li><strong>Location Data:</strong> General location information based on IP address and precise location if you allow us to access your device's location for delivery purposes.</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">How We Use Your Information</h2>
              <p>
                We use the collected data for various purposes:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li>To provide and maintain our service</li>
                <li>To process and deliver your orders</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To send you marketing and promotional communications (which you can opt out of at any time)</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">Data Security</h2>
              <p>
                The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              
              <h2 className="text-2xl mt-10 mb-6">Sharing Your Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li><strong>Service Providers:</strong> Third-party companies who help us deliver our services, such as payment processors, delivery partners, and analytics providers.</li>
                <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or subpoena.</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc ml-6 my-4">
                <li>Access the personal data we hold about you</li>
                <li>Request the correction of inaccurate personal data</li>
                <li>Request the deletion of your personal data</li>
                <li>Object to the processing of your personal data</li>
                <li>Request restriction of processing of your personal data</li>
                <li>Request the transfer of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>
              
              <h2 className="text-2xl mt-10 mb-6">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@thesabjiwala.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
