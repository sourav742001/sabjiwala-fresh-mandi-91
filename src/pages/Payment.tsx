import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard, Calendar, FileText, CheckCircle, Tag, DollarSign } from 'lucide-react';

// Form validation schema
const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(16)
    .regex(/^\d+$/, "Card number must contain only digits"),
  cardName: z.string().min(2, { message: "Name on card is required" }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string()
    .min(3, { message: "CVV must be 3 digits" })
    .max(3)
    .regex(/^\d+$/, "CVV must contain only digits"),
});

const Payment = () => {
  const navigate = useNavigate();
  const { cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [showCardIcons, setShowCardIcons] = useState(true);
  
  // Get checkout data from session storage
  const checkoutData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
  const appliedCoupon = checkoutData.appliedCoupon;
  
  // Calculate discount
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

  useEffect(() => {
    if (!checkoutData.fullName) {
      toast({
        title: "Checkout information missing",
        description: "Please complete checkout first",
        variant: "destructive",
      });
      navigate("/checkout");
    }
  }, [checkoutData, navigate, toast]);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Handle expiry date input formatting (MM/YY)
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    let formattedValue = '';
    
    if (value.length <= 2) {
      formattedValue = value;
    } else {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    onChange(formattedValue);
  };

  // Handle card number input with formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove any non-digits
    onChange(value.substring(0, 16)); // Limit to 16 digits
    
    // Show card icon based on first digit
    setShowCardIcons(true);
  };

  // Determine credit card type based on number
  const getCardType = (cardNumber: string) => {
    const first = cardNumber.charAt(0);
    if (!first) return null;
    
    if (first === '4') return 'visa';
    if (first === '5') return 'mastercard';
    if (first === '3') return 'amex';
    if (first === '6') return 'discover';
    return 'generic';
  };

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    console.log("Payment values:", values);
    setIsProcessing(true);
    
    // Show payment processing toast
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment...",
    });
    
    // Simulate Stripe payment processing
    setTimeout(() => {
      console.log("Payment processed successfully");
      setIsProcessing(false);
      
      // Generate a random order ID
      const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      
      // Success toast
      toast({
        title: "Payment successful",
        description: `Your payment of ₹${totalAmount} has been processed.`,
        variant: "default",
      });
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to order confirmation
      navigate("/order-confirmation", { 
        state: { 
          paymentMethod: "Credit Card",
          orderId: orderId,
          appliedCoupon: appliedCoupon
        } 
      });
    }, 2000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-light text-gray-900 mb-8"
          >
            Payment Details
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-2"
            >
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="text-emerald-700" />
                        <h2 className="text-xl font-medium">Card Information</h2>
                      </div>

                      <div className="bg-emerald-50 p-4 mb-4 rounded-md border border-emerald-100">
                        <p className="text-sm text-emerald-700 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>This is a demo checkout. Use any valid-format card details (e.g., "4242424242424242" for card number).</span>
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center justify-between">
                              <span>Card Number</span>
                              {showCardIcons && (
                                <div className="flex gap-2">
                                  <div className={`w-10 h-6 rounded flex items-center justify-center ${getCardType(field.value) === 'visa' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                    {getCardType(field.value) === 'visa' && <span className="text-white text-xs font-bold">VISA</span>}
                                  </div>
                                  <div className={`w-10 h-6 rounded flex items-center justify-center ${getCardType(field.value) === 'mastercard' ? 'bg-red-500' : 'bg-gray-200'}`}>
                                    {getCardType(field.value) === 'mastercard' && <span className="text-white text-xs font-bold">MC</span>}
                                  </div>
                                </div>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234 5678 9012 3456" 
                                maxLength={16}
                                {...field}
                                onChange={(e) => handleCardNumberChange(e, field.onChange)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    {...field}
                                    onChange={(e) => handleExpiryDateChange(e, field.onChange)}
                                  />
                                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    placeholder="123"
                                    maxLength={3}
                                    type="password"
                                    {...field}
                                  />
                                  <FileText className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center gap-2"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="animate-pulse">Processing...</span>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </>
                        ) : (
                          <>Pay ₹{totalAmount}</>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <div className="mt-6 text-center">
                <div className="flex justify-center space-x-4">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Your payment information is secure and encrypted</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-gray-50 p-6 rounded-md shadow-sm">
                <h3 className="font-medium mb-4">Order Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  
                  <div className="border-t my-2 pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-emerald-700">₹{totalAmount}</span>
                  </div>
                </div>
                
                {appliedCoupon && (
                  <div className="mt-3 bg-emerald-50 p-3 rounded-md border border-emerald-100 text-xs">
                    <div className="flex items-center mb-1">
                      <Tag size={12} className="text-emerald-600 mr-1" />
                      <span className="font-medium text-emerald-700">
                        {appliedCoupon.code}
                      </span>
                    </div>
                    <p className="text-emerald-600">
                      {appliedCoupon.type === "percentage" 
                        ? `${appliedCoupon.discount}% off (up to ₹500)` 
                        : appliedCoupon.type === "fixed"
                        ? `₹${appliedCoupon.discount} off`
                        : "Free Shipping"}
                    </p>
                  </div>
                )}
                
                <div className="mt-6 bg-emerald-50 p-3 rounded-md text-xs text-emerald-800">
                  <div className="flex items-start">
                    <CheckCircle size={14} className="text-emerald-600 mt-0.5 mr-1" />
                    <p>Your payment is secure and encrypted</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-2">Delivery Address</h4>
                  <p className="text-xs text-gray-600">{checkoutData.fullName}</p>
                  <p className="text-xs text-gray-600">{checkoutData.address}</p>
                  <p className="text-xs text-gray-600">{checkoutData.city}, {checkoutData.state} {checkoutData.pincode}</p>
                  <p className="text-xs text-gray-600">Phone: {checkoutData.phone}</p>
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

export default Payment;
