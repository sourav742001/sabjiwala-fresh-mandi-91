
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, MapPin, ShoppingBag, CreditCard, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    addresses: [
      {
        id: 1,
        type: 'Home',
        address: '123 Green Street, Model Town',
        city: 'Delhi',
        pincode: '110033',
        isDefault: true
      },
      {
        id: 2,
        type: 'Office',
        address: '456 Business Avenue, Connaught Place',
        city: 'New Delhi',
        pincode: '110001',
        isDefault: false
      }
    ],
    orders: [
      {
        id: 'ORD12345',
        date: '2025-05-01',
        total: 650,
        status: 'Delivered',
        items: 8
      },
      {
        id: 'ORD12346',
        date: '2025-04-25',
        total: 420,
        status: 'Delivered',
        items: 5
      },
      {
        id: 'ORD12347',
        date: '2025-04-19',
        total: 890,
        status: 'Delivered',
        items: 12
      }
    ]
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-emerald-700 text-white py-12"
        >
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-emerald-800 flex items-center justify-center text-white text-4xl font-light overflow-hidden">
                {profileData.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-medium mb-2">{profileData.name}</h1>
                <p className="text-emerald-100">{profileData.email} • {profileData.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Profile Content */}
        <section className="py-16">
          <div className="container-custom">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="personal" className="data-[state=active]:bg-emerald-50">
                  <User className="mr-2 h-4 w-4" /> Personal
                </TabsTrigger>
                <TabsTrigger value="addresses" className="data-[state=active]:bg-emerald-50">
                  <MapPin className="mr-2 h-4 w-4" /> Addresses
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-emerald-50">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Orders
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-emerald-50">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>
              
              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-medium mb-6">Personal Information</h2>
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-medium">Saved Addresses</h2>
                      <Button className="bg-emerald-700 hover:bg-emerald-800">
                        Add New Address
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {profileData.addresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-2">
                                <span className="font-medium">{address.type}</span>
                                {address.isDefault && (
                                  <span className="ml-3 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700">{address.address}</p>
                              <p className="text-gray-700">{address.city} - {address.pincode}</p>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              {!address.isDefault && (
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                  Remove
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-medium mb-6">Order History</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Items
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {profileData.orders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-700">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {new Date(order.date).toLocaleDateString('en-IN')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {order.items} items
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ₹{order.total}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <Button variant="link" className="text-emerald-700">View Details</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-medium mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Password</h3>
                        <Button variant="outline" className="w-full justify-start">Change Password</Button>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-4">Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="email-notifications"
                              className="mt-1 mr-3 h-4 w-4 accent-emerald-700"
                              defaultChecked
                            />
                            <div>
                              <label htmlFor="email-notifications" className="font-medium block">
                                Email Notifications
                              </label>
                              <p className="text-sm text-gray-500">
                                Receive order updates and promotional offers via email
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="sms-notifications"
                              className="mt-1 mr-3 h-4 w-4 accent-emerald-700"
                              defaultChecked
                            />
                            <div>
                              <label htmlFor="sms-notifications" className="font-medium block">
                                SMS Notifications
                              </label>
                              <p className="text-sm text-gray-500">
                                Receive order updates and delivery alerts via SMS
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                        <div className="space-y-4">
                          <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
