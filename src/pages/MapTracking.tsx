
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Clock, Truck, CheckCircle, PhoneCall, MapPin } from "lucide-react";
import DeliveryMap from "@/components/MapTracking/DeliveryMap";
import { useDeliveryTracking } from "@/hooks/useDeliveryTracking";

const MapTracking = () => {
  const { 
    locations, 
    simulationRunning, 
    progress, 
    estimatedTime,
    startSimulation, 
    stopSimulation, 
    resetSimulation 
  } = useDeliveryTracking();

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <DeliveryMap 
                  locations={locations} 
                  simulationRunning={simulationRunning} 
                />
              </Card>
              
              <div className="flex space-x-4 mt-4">
                <Button 
                  onClick={startSimulation} 
                  disabled={simulationRunning}
                  className="bg-emerald-700 hover:bg-emerald-800"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Start Tracking
                </Button>
                <Button 
                  onClick={resetSimulation} 
                  variant="outline"
                  className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-2 text-emerald-700 font-medium mb-4">
                  <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span>{simulationRunning ? 'Order in transit' : 'Preparing your order'}</span>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Delivery Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-100" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <p className="font-medium">Estimated Time of Arrival</p>
                      <div className="flex items-center mt-1 text-emerald-700">
                        <Clock className="h-4 w-4 mr-1" />
                        <p>{estimatedTime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Order Number</p>
                      <p className="text-gray-500">#SBW2023051</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">Delivery Address</p>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-emerald-700 mr-1 mt-0.5 shrink-0" />
                      <p className="text-gray-500">123 Karol Bagh, New Delhi, 110005</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <p className="font-medium mb-4">Delivery Agent</p>
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold mr-3">
                    RK
                  </div>
                  <div>
                    <p className="font-medium">Rahul Kumar</p>
                    <div className="text-sm text-gray-500 flex items-center">
                      <svg 
                        className="h-4 w-4 fill-current text-yellow-500 mr-1" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <p>4.8 Rating</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Call Agent
                </Button>
              </Card>

              <Card className="p-6">
                <p className="font-medium mb-3">Order Status</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-emerald-700 flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Placed</p>
                      <p className="text-xs text-gray-500">Today, 4:30 PM</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className={`h-5 w-5 rounded-full ${progress > 0 ? 'bg-emerald-700' : 'bg-gray-200'} flex items-center justify-center`}>
                        {progress > 0 ? (
                          <CheckCircle size={12} className="text-white" />
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${progress > 0 ? '' : 'text-gray-500'}`}>Order Processing</p>
                      <p className="text-xs text-gray-500">{progress > 0 ? 'Today, 4:35 PM' : 'Pending'}</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className={`h-5 w-5 rounded-full ${progress > 50 ? 'bg-emerald-700' : 'bg-gray-200'} flex items-center justify-center`}>
                        {progress > 50 ? (
                          <CheckCircle size={12} className="text-white" />
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${progress > 50 ? '' : 'text-gray-500'}`}>On the Way</p>
                      <p className="text-xs text-gray-500">{progress > 50 ? 'Today, 5:05 PM' : 'Pending'}</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className={`h-5 w-5 rounded-full ${progress === 100 ? 'bg-emerald-700' : 'bg-gray-200'} flex items-center justify-center`}>
                        {progress === 100 ? (
                          <CheckCircle size={12} className="text-white" />
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${progress === 100 ? '' : 'text-gray-500'}`}>Delivered</p>
                      <p className="text-xs text-gray-500">{progress === 100 ? 'Today, 5:45 PM' : 'Pending'}</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MapTracking;
