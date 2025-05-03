
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, CreditCard, Truck, Tag, Map, Scissors, ArrowRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';

// Form validation schema
const addressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().min(6, { message: "Please enter a valid pincode" }),
  paymentMethod: z.enum(["card", "cash"], {
    required_error: "Please select a payment method",
  }),
  saveAddress: z.boolean().default(false),
});

const availableCoupons = [
  { code: "FIRST20", discount: 20, type: "percentage", minOrder: 500 },
  { code: "FLAT100", discount: 100, type: "fixed", minOrder: 800 },
  { code: "FREESHIP", discount: 40, type: "shipping", minOrder: 300 }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ lat: 19.0760, lng: 72.8777, address: "Mumbai, Maharashtra" });
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [showCouponsList, setShowCouponsList] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast({
        title: "Please login",
        description: "You need to login to proceed with checkout",
        variant: "destructive",
      });
      navigate("/login", { state: { returnUrl: "/checkout" } });
      return;
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty",
        variant: "destructive",
      });
      navigate("/shop");
    }
  }, [cartItems.length, navigate, toast]);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      paymentMethod: "card",
      saveAddress: false,
    },
  });

  // Update address field when location is selected
  useEffect(() => {
    if (selectedLocation?.address) {
      form.setValue("address", selectedLocation.address);
    }
  }, [selectedLocation, form]);

  function onSubmit(values: z.infer<typeof addressSchema>) {
    setIsLoading(true);
    console.log("Form values:", values);

    // Store checkout data for the next step
    const checkoutData = {
      ...values,
      appliedCoupon: appliedCoupon
    };
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // If card payment, go to payment page, otherwise go to confirmation
    if (values.paymentMethod === "card") {
      navigate("/payment");
    } else {
      navigate("/order-confirmation", { 
        state: { 
          paymentMethod: "Cash on Delivery",
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
          appliedCoupon: appliedCoupon
        } 
      });
    }
    
    setIsLoading(false);
  }

  const handleOpenMap = () => {
    setMapDialogOpen(true);
  };

  const handleSelectLocation = (location: any) => {
    setSelectedLocation(location);
    setMapDialogOpen(false);
    
    // Update the form field
    form.setValue("address", location.address);
    toast({
      title: "Location selected",
      description: `${location.address} has been set as your delivery address`,
    });
  };

  const handleApplyCoupon = () => {
    const foundCoupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (!foundCoupon) {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid",
        variant: "destructive",
      });
      return;
    }

    if (cartTotal < foundCoupon.minOrder) {
      toast({
        title: "Minimum order value not met",
        description: `This coupon requires a minimum order of ₹${foundCoupon.minOrder}`,
        variant: "destructive",
      });
      return;
    }

    setAppliedCoupon(foundCoupon);
    toast({
      title: "Coupon applied",
      description: `${foundCoupon.code} has been applied to your order`,
      // Changed from "success" to "default"
      variant: "default", 
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast({
      title: "Coupon removed",
      description: "Coupon has been removed from your order",
    });
  };

  // Calculate discount amount
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === "percentage") {
      return Math.min((cartTotal * appliedCoupon.discount) / 100, 500); // Cap at 500
    } else if (appliedCoupon.type === "fixed") {
      return appliedCoupon.discount;
    } else if (appliedCoupon.type === "shipping") {
      return 40; // Free shipping
    }
    
    return 0;
  };

  const discount = calculateDiscount();
  const deliveryFee = appliedCoupon?.type === "shipping" ? 0 : (cartTotal >= 200 ? 0 : 40);
  const totalAmount = cartTotal + deliveryFee - discount;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container-custom">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-light text-gray-900 mb-8"
          >
            Checkout
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="bg-white p-6 border border-gray-100 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="text-emerald-700" />
                      <h2 className="text-xl font-medium">Delivery Address</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input placeholder="123 Main St, Apartment 4B" {...field} />
                                </FormControl>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm"
                                  className="absolute right-1 top-1 text-xs h-8 border-emerald-600 text-emerald-700"
                                  onClick={handleOpenMap}
                                >
                                  <Map size={14} className="mr-1" />
                                  Select on Map
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Maharashtra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <Input placeholder="400001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="saveAddress"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Save this address for future orders
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 border border-gray-100 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Tag className="text-emerald-700" />
                      <h2 className="text-xl font-medium">Apply Coupon</h2>
                    </div>
                    
                    {appliedCoupon ? (
                      <div className="bg-emerald-50 p-4 rounded-md border border-emerald-200 mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-emerald-700">{appliedCoupon.code}</p>
                            <p className="text-sm text-emerald-600">
                              {appliedCoupon.type === "percentage" 
                                ? `${appliedCoupon.discount}% off (up to ₹500)` 
                                : appliedCoupon.type === "fixed"
                                ? `₹${appliedCoupon.discount} off`
                                : "Free Shipping"}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-600 h-8"
                            onClick={handleRemoveCoupon}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex space-x-2 mb-4">
                          <Input
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="uppercase"
                          />
                          <Button 
                            type="button"
                            onClick={handleApplyCoupon}
                            className="bg-emerald-600 hover:bg-emerald-700"
                            disabled={!couponCode}
                          >
                            Apply
                          </Button>
                        </div>
                        <div>
                          <Button 
                            type="button" 
                            variant="link" 
                            onClick={() => setShowCouponsList(!showCouponsList)}
                            className="p-0 text-emerald-600 hover:text-emerald-700 flex items-center"
                          >
                            <Scissors size={14} className="mr-1" />
                            {showCouponsList ? "Hide available coupons" : "View available coupons"}
                          </Button>
                          
                          {showCouponsList && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                              {availableCoupons.map((coupon) => (
                                <div
                                  key={coupon.code}
                                  className="border border-dashed border-gray-200 p-3 rounded-md cursor-pointer hover:bg-gray-50"
                                  onClick={() => {
                                    setCouponCode(coupon.code);
                                    setShowCouponsList(false);
                                  }}
                                >
                                  <p className="font-medium">{coupon.code}</p>
                                  <p className="text-sm text-gray-600">
                                    {coupon.type === "percentage" 
                                      ? `${coupon.discount}% off` 
                                      : coupon.type === "fixed"
                                      ? `₹${coupon.discount} off`
                                      : "Free Shipping"}
                                  </p>
                                  <p className="text-xs text-gray-500">Min order: ₹{coupon.minOrder}</p>
                                </div>
                              ))}
                              <div className="md:col-span-2 mt-2">
                                <Link to="/coupons" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                                  View all coupons and offers <ArrowRight size={14} className="ml-1" />
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="bg-white p-6 border border-gray-100 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="text-emerald-700" />
                      <h2 className="text-xl font-medium">Payment Method</h2>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 border border-gray-200 rounded-md p-4">
                                <FormControl>
                                  <RadioGroupItem value="card" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer flex-1">
                                  Credit/Debit Card
                                </FormLabel>
                                <div className="flex gap-2">
                                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 border border-gray-200 rounded-md p-4">
                                <FormControl>
                                  <RadioGroupItem value="cash" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Cash on Delivery
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="bg-white p-6 border border-gray-100 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Truck className="text-emerald-700" />
                      <h2 className="text-xl font-medium">Delivery Options</h2>
                    </div>
                    
                    <div className="border border-emerald-100 bg-emerald-50 p-4 rounded-md text-emerald-800">
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm">Delivery within 2-3 hours</p>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800 px-8 py-6"
                    disabled={isLoading}
                  >
                    {form.watch('paymentMethod') === 'card' 
                      ? `Proceed to Payment (₹${totalAmount})` 
                      : `Place Order (₹${totalAmount})`}
                  </Button>
                </form>
              </Form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-gray-50 p-6 rounded-md shadow-sm sticky top-8">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-emerald-700">₹{totalAmount}</span>
                </div>

                <div className="mt-6">
                  <Progress value={80} className="h-2 bg-gray-200" />
                  <p className="text-xs mt-2 text-gray-500">
                    Add ₹{Math.max(0, 500 - cartTotal)} more to get free delivery
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Map Dialog */}
      <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Delivery Location</DialogTitle>
            <DialogDescription>
              Click on the map to select your delivery location
            </DialogDescription>
          </DialogHeader>
          <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <Map size={40} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">Map will load here</p>
              {/* This would be replaced with actual map component */}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setMapDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSelectLocation({ 
              lat: 19.0760, 
              lng: 72.8777, 
              address: "Mumbai Central, Mumbai, Maharashtra 400008"
            })}>
              Confirm Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
