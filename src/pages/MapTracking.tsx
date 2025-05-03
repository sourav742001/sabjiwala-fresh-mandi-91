
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapboxMap from "@/components/MapboxMap";
import { motion } from "framer-motion";

const MapTracking = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600">
              See the real-time location of your delivery on the map below
            </p>
          </motion.div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
            <MapboxMap />
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Delivery Status</h2>
            
            <div className="flex items-center space-x-2 text-emerald-600 font-medium mb-6">
              <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Order in transit - Expected delivery in 25 minutes</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <p className="font-medium">Estimated Time of Arrival</p>
                  <p className="text-gray-500">Today, 6:30 PM</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Order Number</p>
                  <p className="text-gray-500">#SBW2023051</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-gray-500">123 Karol Bagh, New Delhi, 110005</p>
              </div>
              
              <div className="pt-3 border-t">
                <p className="font-medium mb-2">Delivery Agent</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold mr-3">
                    RK
                  </div>
                  <div>
                    <p>Rahul Kumar</p>
                    <p className="text-sm text-gray-500">+91 98765-43210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MapTracking;
