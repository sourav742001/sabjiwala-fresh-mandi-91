
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, ShoppingBag, Truck, Navigation, Check, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Type definition for order
interface Order {
  id: string;
  date: string;
  status: string;
  paymentMethod: string;
  estimatedDelivery: string;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}

const TrackOrder = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  useEffect(() => {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    
    if (foundOrder) {
      // Add mock current location
      foundOrder.currentLocation = {
        lat: 19.076,
        lng: 72.877,
        address: "Mumbai Mandi, Sector 18, Mumbai"
      };
      
      setOrder(foundOrder);
      
      // Determine current step based on status
      switch(foundOrder.status) {
        case "Processing":
          setCurrentStep(1);
          break;
        case "Shipped":
          setCurrentStep(2);
          break;
        case "Out for Delivery":
          setCurrentStep(3);
          break;
        case "Delivered":
          setCurrentStep(4);
          break;
        default:
          setCurrentStep(1);
      }
      
      // Simulate order progress
      const timer = setTimeout(() => {
        const updatedOrders = orders.map((o: Order) => {
          if (o.id === orderId) {
            // Update status based on current step
            let newStatus;
            switch(currentStep) {
              case 1:
                newStatus = "Shipped";
                setCurrentStep(2);
                toast({
                  title: "Order Update",
                  description: "Your order has been shipped!",
                });
                break;
              case 2:
                newStatus = "Out for Delivery";
                setCurrentStep(3);
                toast({
                  title: "Order Update",
                  description: "Your order is out for delivery!",
                });
                break;
              case 3:
                newStatus = "Delivered";
                setCurrentStep(4);
                toast({
                  title: "Order Update",
                  description: "Your order has been delivered!",
                });
                break;
              default:
                newStatus = o.status;
            }
            
            return {
              ...o,
              status: newStatus
            };
          }
          return o;
        });
        
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setOrder((prev) => prev ? { ...prev, status: updatedOrders.find((o: Order) => o.id === orderId).status } : null);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [orderId, currentStep, toast]);
  
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Order not found</h1>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/orders">View All Orders</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl md:text-3xl font-light text-gray-900"
            >
              Track Order
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm"
            >
              <span className="text-gray-500">Order ID:</span>
              <span className="ml-2 font-medium">{order.id}</span>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-md overflow-hidden"
          >
            {/* Order Status Stepper */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-emerald-700 -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${(currentStep - 1) * 33.33}%` }}
                ></div>
                
                <div className="relative z-10 flex justify-between">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 1 ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <ShoppingBag size={18} />
                    </div>
                    <span className="text-xs font-medium">Processed</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 2 ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Truck size={18} />
                    </div>
                    <span className="text-xs font-medium">Shipped</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 3 ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Navigation size={18} />
                    </div>
                    <span className="text-xs font-medium">Out for Delivery</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= 4 ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Check size={18} />
                    </div>
                    <span className="text-xs font-medium">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Details */}
            <div className="p-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-md p-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-700" size={20} />
                  <div>
                    <p className="font-medium">Your order is {order.status.toLowerCase()}</p>
                    <p className="text-sm text-gray-600">
                      Estimated delivery by {new Date(order.estimatedDelivery).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              {currentStep >= 2 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Current Location</h3>
                  <div className="bg-gray-100 h-48 rounded-md mb-3 flex items-center justify-center">
                    <div className="text-center">
                      {/* In a real app, this would be a Google Map */}
                      <MapPin size={24} className="mx-auto text-emerald-700 mb-2" />
                      <p className="text-gray-600">Map View</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className="text-emerald-700 shrink-0" />
                    <p>{order.currentLocation?.address}</p>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium mb-4">Order Timeline</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
                        <ShoppingBag size={14} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Order Processed</p>
                      <p className="text-sm text-gray-600">Your order has been received and is being processed</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(order.date).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {currentStep >= 2 && (
                    <div className="flex">
                      <div className="shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
                          <Truck size={14} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Order Shipped</p>
                        <p className="text-sm text-gray-600">Your order has been shipped</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {currentStep >= 3 && (
                    <div className="flex">
                      <div className="shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
                          <Navigation size={14} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Out for Delivery</p>
                        <p className="text-sm text-gray-600">Your order is out for delivery</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {currentStep >= 4 && (
                    <div className="flex">
                      <div className="shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Order Delivered</p>
                        <p className="text-sm text-gray-600">Your order has been delivered successfully</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              variant="outline" 
              asChild
              className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
            >
              <Link to="/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
