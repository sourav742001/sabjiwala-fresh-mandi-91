
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, ShoppingBag, Truck, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get data from location state
  const { orderId, paymentMethod } = location.state || {};
  
  useEffect(() => {
    if (!orderId) {
      navigate('/shop');
      return;
    }
    
    // Show success toast
    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${orderId} has been placed.`,
      variant: "default",
    });
    
    // Store order in local storage for tracking and history
    const orderData = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      paymentMethod: paymentMethod || "Unknown",
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    };
    
    // Get existing orders from localStorage or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));
    
  }, [orderId, navigate, paymentMethod, toast]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container-custom max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 border border-gray-100 rounded-md shadow-sm"
          >
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check size={32} className="text-emerald-700" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-light text-gray-900">Thank You for Your Order!</h1>
              <p className="text-gray-600 mt-2">Your order has been received and is now being processed.</p>
            </div>
            
            <div className="border border-gray-100 rounded-md p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Order Information</h2>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-gray-500">Order Number</p>
                  <p className="font-medium">{orderId}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium">{paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500">Order Status</p>
                  <p className="bg-emerald-50 text-emerald-700 inline-block px-2 py-1 rounded-sm text-xs font-medium">
                    Processing
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-3 h-full border-l-2 border-dashed border-gray-200"></div>
                <div className="space-y-8">
                  <div className="flex items-start relative">
                    <div className="shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center">
                        <ShoppingBag size={18} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Order Received</p>
                      <p className="text-sm text-gray-600">Your order has been received and is now being processed</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start relative">
                    <div className="shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Truck size={18} className="text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Order Shipped</p>
                      <p className="text-sm text-gray-600">Your order will be packed and shipped soon</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start relative">
                    <div className="shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Check size={18} className="text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Order Delivered</p>
                      <p className="text-sm text-gray-600">Estimated delivery: {new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString()} today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
              <Button
                variant="outline"
                className="w-full md:w-auto border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                onClick={() => navigate(`/track-order/${orderId}`)}
              >
                <Clock size={16} className="mr-2" />
                Track Order
              </Button>
              <Button
                className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
