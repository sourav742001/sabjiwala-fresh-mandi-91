
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, Clock, ShoppingCart, Truck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Type definition for order
interface Order {
  id: string;
  date: string;
  status: string;
  paymentMethod: string;
  estimatedDelivery: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast({
        title: "Not logged in",
        description: "Please login to view your orders",
        variant: "destructive",
      });
      navigate("/login", { state: { returnUrl: "/orders" } });
      return;
    }
    
    // Get orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, [navigate, toast]);

  // Function to get badge color based on status
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-yellow-100 text-yellow-800";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Processing":
        return <Clock size={14} />;
      case "Shipped":
        return <Truck size={14} />;
      case "Out for Delivery":
        return <Truck size={14} />;
      case "Delivered":
        return <Check size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl md:text-3xl font-light text-gray-900"
            >
              Your Orders
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button 
                variant="outline" 
                className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                onClick={() => navigate('/shop')}
              >
                <ShoppingCart size={16} className="mr-2" />
                Continue Shopping
              </Button>
            </motion.div>
          </div>
          
          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-4">
                <ShoppingCart size={64} className="text-emerald-700 opacity-50" />
              </div>
              <h2 className="text-2xl font-light text-gray-700 mb-4">No Orders Yet</h2>
              <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
              <Button asChild>
                <Link to="/shop" className="bg-emerald-700 hover:bg-emerald-800">
                  Start Shopping
                </Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-md overflow-hidden"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Estimated Delivery</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={`flex items-center gap-1 ${getBadgeVariant(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell>
                          {new Date(order.estimatedDelivery).toLocaleDateString()} at {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/track-order/${order.id}`)}
                          >
                            Track Order
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
