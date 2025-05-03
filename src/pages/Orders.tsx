
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: 'ORD-2023-001',
      date: 'May 2, 2023',
      status: 'Delivered',
      total: '₹456.00',
      items: [
        { name: 'Fresh Tomatoes', quantity: '1 kg', price: '₹60.00' },
        { name: 'Green Capsicum', quantity: '500 g', price: '₹45.00' },
        { name: 'Red Onions', quantity: '2 kg', price: '₹80.00' },
      ]
    },
    {
      id: 'ORD-2023-002',
      date: 'May 12, 2023',
      status: 'In Transit',
      total: '₹325.00',
      items: [
        { name: 'Organic Carrots', quantity: '1 kg', price: '₹75.00' },
        { name: 'Fresh Spinach', quantity: '500 g', price: '₹40.00' },
        { name: 'Cucumber', quantity: '1 kg', price: '₹55.00' },
      ]
    },
    {
      id: 'ORD-2023-003',
      date: 'May 15, 2023',
      status: 'Processing',
      total: '₹510.00',
      items: [
        { name: 'Seasonal Fruits Combo', quantity: '1 pack', price: '₹299.00' },
        { name: 'Daily Essentials Basket', quantity: '1 pack', price: '₹211.00' },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Orders</h1>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Active Orders</h2>
            <p className="text-gray-600 text-sm mt-1">Track your current orders and view past orders history</p>
          </div>

          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'In Transit' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-orange-100 text-orange-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Ordered on {order.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>Delhi NCR</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck size={16} />
                        <span>{order.status === 'Delivered' ? 'Delivered on ' + order.date : 'Estimated Delivery: Tomorrow'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="font-semibold text-lg">{order.total}</div>
                    <div className="text-sm text-gray-600">{order.items.length} Items</div>
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
                    <Button variant="ghost" size="sm" className="text-sm">
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

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
