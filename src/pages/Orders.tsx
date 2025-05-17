
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, MapPin, Calendar, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckoutData } from '@/types/checkout';
import { Vegetable } from '@/types/vegetable';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Extended order type with more details for displaying
interface OrderItem {
  name: string;
  quantity: string;
  price: string;
  id: number;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  total: string;
  items: OrderItem[];
  deliveryAddress: string;
  paymentMethod: string;
  estimatedDelivery?: string;
  deliveredOn?: string;
  tracking?: {
    lastUpdated: string;
    location: string;
    status: string;
  };
}

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Get orders from localStorage
    const fetchOrders = () => {
      setLoading(true);
      try {
        const savedOrders = localStorage.getItem('orders');
        let parsedOrders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
        
        // If no saved orders, use our mock data
        if (!parsedOrders || parsedOrders.length === 0) {
          parsedOrders = [
            {
              id: 'ORD-2023-001',
              date: 'May 15, 2023',
              status: 'Delivered',
              total: '₹456.00',
              deliveryAddress: '123 Green Avenue, Delhi NCR',
              paymentMethod: 'Card',
              deliveredOn: 'May 16, 2023',
              items: [
                { name: 'Fresh Tomatoes', quantity: '1 kg', price: '₹60.00', id: 1 },
                { name: 'Green Capsicum', quantity: '500 g', price: '₹45.00', id: 2 },
                { name: 'Red Onions', quantity: '2 kg', price: '₹80.00', id: 3 },
              ]
            },
            {
              id: 'ORD-2023-002',
              date: 'May 25, 2023',
              status: 'In Transit',
              total: '₹325.00',
              deliveryAddress: '456 Vegetable Lane, Delhi NCR',
              paymentMethod: 'UPI',
              estimatedDelivery: 'Tomorrow',
              tracking: {
                lastUpdated: '1 hour ago',
                location: 'Local Distribution Center',
                status: 'Out for delivery'
              },
              items: [
                { name: 'Organic Carrots', quantity: '1 kg', price: '₹75.00', id: 4 },
                { name: 'Fresh Spinach', quantity: '500 g', price: '₹40.00', id: 5 },
                { name: 'Cucumber', quantity: '1 kg', price: '₹55.00', id: 6 },
              ]
            },
            {
              id: 'ORD-2023-003',
              date: 'May 30, 2023',
              status: 'Processing',
              total: '₹510.00',
              deliveryAddress: '789 Farm Road, Delhi NCR',
              paymentMethod: 'Cash on Delivery',
              estimatedDelivery: 'June 1, 2023',
              items: [
                { name: 'Seasonal Fruits Combo', quantity: '1 pack', price: '₹299.00', id: 7 },
                { name: 'Daily Essentials Basket', quantity: '1 pack', price: '₹211.00', id: 8 },
              ]
            }
          ];
          // Save the mock data for future use
          localStorage.setItem('orders', JSON.stringify(parsedOrders));
        }
        
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your orders',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status.toLowerCase() === filter.toLowerCase());
  };

  const reorder = (orderId: string) => {
    // Find the order
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Show success message
    toast({
      title: "Items added to cart",
      description: `${order.items.length} items from order ${orderId} have been added to your cart.`,
    });
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">My Orders</h1>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              className="text-sm"
              onClick={() => setFilter('all')}
            >
              All Orders
            </Button>
            <Button 
              variant={filter === 'in transit' ? 'default' : 'outline'}
              className="text-sm"
              onClick={() => setFilter('in transit')}
            >
              In Transit
            </Button>
            <Button 
              variant={filter === 'delivered' ? 'default' : 'outline'}
              className="text-sm"
              onClick={() => setFilter('delivered')}
            >
              Delivered
            </Button>
            <Button 
              variant={filter === 'processing' ? 'default' : 'outline'}
              className="text-sm"
              onClick={() => setFilter('processing')}
            >
              Processing
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-32 bg-gray-100 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">{filter === 'all' ? 'All Orders' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Orders`}</h2>
              <p className="text-gray-600 text-sm mt-1">Track your orders and view order history</p>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge variant={
                          order.status === 'Delivered' ? 'success' : 
                          order.status === 'In Transit' ? 'info' :
                          order.status === 'Processing' ? 'warning' :
                          'destructive'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>Ordered on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{order.deliveryAddress}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck size={16} />
                          <span>
                            {order.status === 'Delivered'
                              ? `Delivered on ${order.deliveredOn}`
                              : `Estimated Delivery: ${order.estimatedDelivery || 'Processing'}`
                            }
                          </span>
                        </div>
                      </div>
                      {order.status === 'In Transit' && order.tracking && (
                        <div className="mt-2 text-sm text-emerald-700 font-medium">
                          Last update: {order.tracking.lastUpdated} - {order.tracking.status}
                        </div>
                      )}
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <div className="font-semibold text-lg">{order.total}</div>
                      <div className="text-sm text-gray-600">{order.items.length} Items</div>
                      <div className="text-xs text-gray-500">Paid via {order.paymentMethod}</div>
                    </div>
                  </div>

                  <div className="mt-4 pl-4 border-l-4 border-gray-200">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm py-1">
                        <div>{item.name} ({item.quantity})</div>
                        <div>{item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {order.status === 'In Transit' && (
                      <Link to="/map-tracking">
                        <Button variant="outline" className="text-sm border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                          <MapPin size={16} className="mr-1" />
                          Track on Map
                        </Button>
                      </Link>
                    )}
                    
                    <Link to={`/track-order/${order.id}`}>
                      <Button variant="secondary" size="sm" className="text-sm">
                        Track Order
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </Link>
                    
                    <Button variant="ghost" size="sm" className="text-sm">
                      View Details
                    </Button>
                    
                    {order.status === 'Delivered' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sm"
                        onClick={() => reorder(order.id)}
                      >
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}

        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Shipping</h3>
              <p className="text-sm text-gray-600">
                We deliver all across Delhi NCR. For orders above ₹300, delivery is free.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Returns</h3>
              <p className="text-sm text-gray-600">
                Not satisfied with the quality? We offer a 100% refund or replacement.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Questions?</h3>
              <p className="text-sm text-gray-600">
                Contact our customer support team at support@thesabjiwala.com
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
