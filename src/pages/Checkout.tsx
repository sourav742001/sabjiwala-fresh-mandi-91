
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
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, CreditCard, Truck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

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

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  function onSubmit(values: z.infer<typeof addressSchema>) {
    setIsLoading(true);
    console.log("Form values:", values);

    // Store checkout data for the next step
    sessionStorage.setItem('checkoutData', JSON.stringify(values));
    
    // If card payment, go to payment page, otherwise go to confirmation
    if (values.paymentMethod === "card") {
      navigate("/payment");
    } else {
      navigate("/order-confirmation", { 
        state: { 
          paymentMethod: "Cash on Delivery",
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}` 
        } 
      });
    }
    
    setIsLoading(false);
  }

  const deliveryFee = cartTotal >= 200 ? 0 : 40;
  const totalAmount = cartTotal + deliveryFee;

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
                  <div className="bg-white p-6 border border-gray-100 rounded-md">
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
                              <FormControl>
                                <Input placeholder="123 Main St, Apartment 4B" {...field} />
                              </FormControl>
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
                  
                  <div className="bg-white p-6 border border-gray-100 rounded-md">
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
                  
                  <div className="bg-white p-6 border border-gray-100 rounded-md">
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
              <div className="bg-gray-50 p-6 rounded-md sticky top-8">
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
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-emerald-700">₹{totalAmount}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
