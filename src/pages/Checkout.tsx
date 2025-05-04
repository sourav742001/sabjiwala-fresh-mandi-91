
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { ChevronRight, MapPin, CreditCard, Truck, Clock, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Setup dummy Stripe
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="h-5 w-5 text-gray-500" /> },
  { id: 'upi', name: 'UPI Payment', icon: 
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.8333 2.00012L6.50004 14.8334H11.8334L11.1667 22.0001L17.5 9.16679H12.1667L12.8333 2.00012Z" fill="#097bed"/>
      </svg>
  },
  { id: 'cod', name: 'Cash on Delivery', icon: 
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
  },
];

const deliverySlots = [
  { id: 'morning', name: 'Morning', time: '7:00 AM - 10:00 AM', available: true },
  { id: 'afternoon', name: 'Afternoon', time: '11:00 AM - 2:00 PM', available: true },
  { id: 'evening', name: 'Evening', time: '4:00 PM - 7:00 PM', available: true },
  { id: 'night', name: 'Night Delivery', time: '8:00 PM - 10:00 PM', available: false },
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Delhi',
    state: 'Delhi NCR',
    pincode: '',
    landmark: '',
  });
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>([77.1734, 28.7078]);
  const [deliveryDate, setDeliveryDate] = useState<string>(getTomorrowDate());
  const [deliverySlot, setDeliverySlot] = useState<string>('morning');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);
  const { cartItems, clearCart, calculateTotalPrice } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const steps = [
    { id: 'address', title: 'Shipping Address' },
    { id: 'delivery', title: 'Delivery Options' },
    { id: 'payment', title: 'Payment' },
    { id: 'confirm', title: 'Confirmation' },
  ];

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  useEffect(() => {
    if (activeStep === 0) {
      initializeMap();
    }
  }, [activeStep]);

  const initializeMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pdHNpbmdoMjAyMyIsImEiOiJjbGdlN2RidnAwNzVxM2dxbjVlbGNuazdzIn0.Uz5taxJmHj7I2l5R8SH4iQ';
    
    const map = new mapboxgl.Map({
      container: 'delivery-map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: selectedLocation,
      zoom: 14,
    });
    
    // Add marker that user can drag
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: '#10b981'
    })
      .setLngLat(selectedLocation)
      .addTo(map);
      
    // Update location when marker is dragged
    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      setSelectedLocation([lngLat.lng, lngLat.lat]);
      
      // Reverse geocode to get address
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            const placeName = data.features[0].place_name;
            setShippingAddress(prev => ({
              ...prev,
              address: placeName,
            }));
          }
        });
    });
    
    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl());
    
    // Search box functionality
    const geocoder = new mapboxgl.Geocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Search for your location'
    });
    
    map.addControl(geocoder);
    
    geocoder.on('result', (e) => {
      // Update marker position
      marker.setLngLat(e.result.center);
      
      // Update state
      setSelectedLocation(e.result.center);
      setShippingAddress(prev => ({
        ...prev,
        address: e.result.place_name,
      }));
    });
    
    // Clean up
    return () => map.remove();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryDate(e.target.value);
  };

  const validateAddressForm = () => {
    const { fullName, phone, address, pincode } = shippingAddress;
    return fullName && phone && address && pincode;
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      if (paymentMethod === 'card') {
        // Load Stripe.js
        const stripe = await stripePromise;
        
        if (stripe) {
          // Create a payment intent (in a real app, this would be done on your server)
          const dummyPaymentIntentId = 'pi_' + Math.random().toString(36).substring(2, 15);
          
          // Redirect to confirmation page
          setActiveStep(3);
        }
      } else {
        // For other payment methods
        setActiveStep(3);
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  const handlePlaceOrder = () => {
    // Place order logic
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been confirmed and will be delivered soon.",
    });
    
    // Redirect to confirmation page
    navigate('/order-confirmation');
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-gray-900">Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="mt-1"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="mt-1"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="mt-1"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input 
                    id="pincode"
                    name="pincode"
                    value={shippingAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter your pincode"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input 
                  id="landmark"
                  name="landmark"
                  value={shippingAddress.landmark}
                  onChange={handleInputChange}
                  placeholder="Any nearby landmark"
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="save-address"
                  checked={saveAddress}
                  onCheckedChange={(checked) => setSaveAddress(!!checked)}
                  className="mr-2"
                />
                <Label htmlFor="save-address" className="text-sm text-gray-600">Save this address for future orders</Label>
              </div>
            </div>
            
            <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
              <div id="delivery-map" className="w-full h-full"></div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-medium text-gray-900">Delivery Options</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="delivery-date" className="block mb-2">Delivery Date</Label>
                <Input 
                  id="delivery-date"
                  type="date"
                  value={deliveryDate}
                  onChange={handleDateChange}
                  min={getTomorrowDate()}
                  className="w-full md:w-64"
                />
              </div>
              
              <div>
                <Label className="block mb-3">Delivery Time Slot</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {deliverySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        deliverySlot === slot.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-200'
                      } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => slot.available && setDeliverySlot(slot.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{slot.name}</span>
                        {deliverySlot === slot.id && (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{slot.time}</span>
                      </div>
                      {!slot.available && (
                        <p className="text-xs text-red-500 mt-1">Currently unavailable</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="block mb-3">Delivery Instructions (Optional)</Label>
                <textarea
                  className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Any special instructions for delivery"
                ></textarea>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-medium text-gray-900">Payment Method</h2>
            
            <div className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <RadioGroupItem value={method.id} id={method.id} className="mr-4" />
                    <div className="flex items-center">
                      <div className="mr-3">
                        {method.icon}
                      </div>
                      <Label htmlFor={method.id} className="font-medium cursor-pointer">{method.name}</Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              
              {paymentMethod === 'card' && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input
                      id="name-on-card"
                      placeholder="Enter name as on card"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'upi' && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input
                      id="upi-id"
                      placeholder="yourname@upi"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'cod' && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">Please keep exact change ready at the time of delivery.</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-8 text-center py-10">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">Your order has been placed successfully.</p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">Order Details</p>
                <p className="text-sm text-gray-600 mt-1">Your order will be delivered on {new Date(deliveryDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} between {deliverySlots.find(slot => slot.id === deliverySlot)?.time}.</p>
              </div>
            </div>
            
            <div className="pt-6">
              <Button 
                onClick={handlePlaceOrder}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-8"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateAddressForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill all required address fields",
        variant: "destructive"
      });
      return;
    }
    
    if (activeStep === 2) {
      handlePaymentSubmit();
      return;
    }
    
    setActiveStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow mt-20">
        {/* Checkout steps */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= activeStep 
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index < activeStep ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-xs mt-1 ${
                      index <= activeStep ? 'text-emerald-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-full max-w-[80px] ${
                      index < activeStep ? 'bg-emerald-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {getStepContent(activeStep)}
              
              {activeStep !== 3 && (
                <div className="mt-8 flex justify-between">
                  {activeStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={isProcessing}
                    >
                      Back
                    </Button>
                  )}
                  
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 ml-auto"
                    onClick={handleNext}
                    disabled={isProcessing}
                  >
                    {activeStep === 2 ? (
                      isProcessing ? (
                        <span className="flex items-center">
                          Processing
                          <svg className="animate-spin ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      ) : (
                        'Place Order'
                      )
                    ) : (
                      'Continue'
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-24">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="text-sm">
                          {item.name} <span className="text-gray-500">x {item.quantity}</span>
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{calculateTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className="font-medium">₹40.00</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span className="font-medium">₹{(calculateTotalPrice() * 0.05).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium mb-6">
                  <span>Total</span>
                  <span className="text-emerald-700">₹{(calculateTotalPrice() + 40 + calculateTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
                
                {activeStep === 0 && (
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-emerald-800">
                        We currently deliver in Delhi NCR regions only. Please verify your delivery location.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeStep === 1 && (
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="flex items-start">
                      <Truck className="h-5 w-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-emerald-800">
                        Orders placed before 8 PM will be eligible for next-day delivery.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-emerald-800">
                        All payments are secure and encrypted. We do not store your card details.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
