
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin, CreditCard, Truck, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Define a shipping slot type
interface ShippingSlot {
  id: string;
  time: string;
  day: string;
  available: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, calculateTotalPrice } = useCart();
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [customerLocation, setCustomerLocation] = useState<[number, number] | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '',
    notes: ''
  });
  const { toast } = useToast();
  
  // Shipping time slots
  const shippingSlots: ShippingSlot[] = [
    { id: 'morning-today', time: '9 AM - 12 PM', day: 'Today', available: true },
    { id: 'afternoon-today', time: '1 PM - 4 PM', day: 'Today', available: false },
    { id: 'evening-today', time: '5 PM - 8 PM', day: 'Today', available: true },
    { id: 'morning-tomorrow', time: '9 AM - 12 PM', day: 'Tomorrow', available: true },
    { id: 'afternoon-tomorrow', time: '1 PM - 4 PM', day: 'Tomorrow', available: true },
    { id: 'evening-tomorrow', time: '5 PM - 8 PM', day: 'Tomorrow', available: true },
  ];
  
  // Calculate subtotal
  const subtotal = calculateTotalPrice();
  
  // Calculate delivery fee based on shipping method
  const deliveryFee = shippingMethod === 'express' ? 60 : 30;
  
  // Calculate total
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleMapModalOpen = () => {
    setIsMapDialogOpen(true);
  };

  const handleMapModalClose = () => {
    setIsMapDialogOpen(false);
  };
  
  // Initialize map when modal is opened
  useEffect(() => {
    if (!isMapDialogOpen || !mapRef.current) return;
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pdHNpbmdoMjAyMyIsImEiOiJjbGdlN2RidnAwNzVxM2dxbjVlbGNuazdzIn0.Uz5taxJmHj7I2l5R8SH4iQ';
    
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: customerLocation || [77.1025, 28.7041], // Default to Delhi
      zoom: 12
    });
    
    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());
    
    // Add a marker that can be dragged
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(customerLocation || [77.1025, 28.7041])
      .addTo(map);
    
    // Get address when marker is dragged
    marker.on('dragend', async () => {
      const lngLat = marker.getLngLat();
      setCustomerLocation([lngLat.lng, lngLat.lat]);
      
      try {
        // Try to reverse geocode the location
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
        );
        
        const data = await response.json();
        if (data?.features?.length > 0) {
          setDeliveryAddress(data.features[0].place_name);
          setCustomerDetails(prev => ({
            ...prev,
            address: data.features[0].place_name
          }));
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    });
    
    mapInstanceRef.current = map;
    markerRef.current = marker;
    
    // Cleanup function
    return () => {
      map.remove();
    };
  }, [isMapDialogOpen, customerLocation]);
  
  const handleSlotSelect = (slotId: string) => {
    const slot = shippingSlots.find(s => s.id === slotId);
    if (slot && slot.available) {
      setSelectedSlot(slotId);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!customerDetails.firstName || !customerDetails.email || !customerDetails.phone || !customerDetails.address || !customerDetails.pincode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedSlot) {
      toast({
        title: "Delivery time not selected",
        description: "Please select a delivery time slot.",
        variant: "destructive"
      });
      return;
    }
    
    // Proceed to payment
    navigate('/payment', { 
      state: { 
        customerDetails,
        selectedSlot,
        paymentMethod,
        shippingMethod,
        deliveryFee,
        subtotal,
        total
      } 
    });
  };
  
  // If cart is empty, redirect to cart page
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-grow">
        <div className="container-custom py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-gray-900 mb-2">Checkout</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-emerald-700">
                <div className="bg-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-white mr-2">
                  <Check size={14} />
                </div>
                <span>Cart</span>
              </div>
              <div className="h-0.5 w-8 bg-emerald-700"></div>
              <div className="flex items-center text-emerald-700 font-medium">
                <div className="bg-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-white mr-2">
                  2
                </div>
                <span>Checkout</span>
              </div>
              <div className="h-0.5 w-8 bg-gray-300"></div>
              <div className="flex items-center text-gray-400">
                <div className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-gray-500 mr-2">
                  3
                </div>
                <span>Payment</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side - Form */}
              <div className="lg:col-span-8">
                {/* Customer Details */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Customer Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700">First Name*</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={customerDetails.firstName}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          value={customerDetails.lastName}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-700">Email*</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={customerDetails.email}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-700">Phone Number*</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Shipping Address */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                    
                    <div className="mb-4">
                      <Label htmlFor="address" className="text-gray-700">Address*</Label>
                      <div className="flex items-center mt-1">
                        <Input 
                          id="address" 
                          name="address"
                          value={customerDetails.address}
                          onChange={handleInputChange}
                          className="flex-1"
                          required
                          readOnly={!!customerLocation}
                        />
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={handleMapModalOpen}
                          className="ml-2 whitespace-nowrap"
                        >
                          <MapPin className="mr-1 h-4 w-4" /> Select on Map
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="col-span-2">
                        <Label htmlFor="city" className="text-gray-700">City*</Label>
                        <Input 
                          id="city" 
                          name="city"
                          value={customerDetails.city}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-gray-700">State*</Label>
                        <Input 
                          id="state" 
                          name="state"
                          value={customerDetails.state}
                          onChange={handleInputChange}
                          className="mt-1"
                          readOnly
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode" className="text-gray-700">PIN Code*</Label>
                        <Input 
                          id="pincode" 
                          name="pincode"
                          value={customerDetails.pincode}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes" className="text-gray-700">Order Notes</Label>
                      <Textarea 
                        id="notes" 
                        name="notes"
                        value={customerDetails.notes}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Special instructions for delivery"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Shipping Method */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Delivery Method</h2>
                    
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex items-center">
                          <Truck className="mr-2 h-4 w-4 text-emerald-700" />
                          <div>
                            <p className="font-medium">Standard Delivery (₹30)</p>
                            <p className="text-sm text-gray-500">Delivery within 24 hours</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-emerald-700" />
                          <div>
                            <p className="font-medium">Express Delivery (₹60)</p>
                            <p className="text-sm text-gray-500">Delivery within 2 hours</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
                
                {/* Delivery Time Slots */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Delivery Time</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {shippingSlots.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => handleSlotSelect(slot.id)}
                          disabled={!slot.available}
                          className={`
                            p-4 border rounded-md text-left transition-colors
                            ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                            ${selectedSlot === slot.id ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}
                          `}
                        >
                          <p className="font-medium">{slot.time}</p>
                          <p className="text-sm text-gray-500">{slot.day}</p>
                          {!slot.available && <p className="text-xs text-red-500 mt-1">Not Available</p>}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Method */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Side - Order Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                      
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div key={item.vegetable.id} className="flex items-start">
                            <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden flex-shrink-0 mr-3">
                              <img 
                                src={item.vegetable.images[0].url} 
                                alt={item.vegetable.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm">{item.vegetable.name} <span className="text-gray-500">× {item.quantity}</span></p>
                              <p className="font-medium">₹{item.vegetable.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Delivery Fee</span>
                          <span>₹{deliveryFee}</span>
                        </div>
                        
                        <Separator className="my-2" />
                        
                        <div className="flex justify-between font-medium text-base">
                          <span>Total</span>
                          <span>₹{total}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800" type="submit">
                        Proceed to Payment
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Map Dialog */}
      <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Your Delivery Location</DialogTitle>
            <DialogDescription>
              Drag the pin to mark your exact delivery location on the map
            </DialogDescription>
          </DialogHeader>

          <div className="h-[400px] w-full relative" ref={mapRef}>
            {/* Map will be rendered here */}
          </div>

          {customerLocation && (
            <div>
              <p className="text-sm mb-2"><strong>Selected Location:</strong> {deliveryAddress || 'Address not available'}</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleMapModalClose}>Cancel</Button>
                <Button onClick={handleMapModalClose}>Confirm Location</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Checkout;
