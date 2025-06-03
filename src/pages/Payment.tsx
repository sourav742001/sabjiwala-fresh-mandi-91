
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard, Calendar, FileText, CheckCircle, Tag, DollarSign, Smartphone } from 'lucide-react';
import { CheckoutData } from '@/types/checkout';

// Card payment validation schema
const cardPaymentSchema = z.object({
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

// UPI payment validation schema
const upiPaymentSchema = z.object({
  upiId: z.string()
    .min(5, { message: "UPI ID is required" })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/, "Enter a valid UPI ID (e.g. name@upi)")
});

const Payment = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [showCardIcons, setShowCardIcons] = useState(true);
  const [paymentTab, setPaymentTab] = useState('card');
  
  // Get checkout data from session storage
  const checkoutDataStr = sessionStorage.getItem('checkoutData');
  const checkoutData: CheckoutData = checkoutDataStr ? JSON.parse(checkoutDataStr) : {};
  
  const subtotal = checkoutData.subtotal || 0;
  const deliveryFee = checkoutData.deliveryFee || 0;
  const appliedCoupon = checkoutData.appliedCoupon;
  
  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === "percentage") {
      return Math.min((subtotal * appliedCoupon.discount) / 100, 500); // Cap at 500
    } else if (appliedCoupon.type === "fixed") {
      return appliedCoupon.discount;
    } else if (appliedCoupon.type === "shipping") {
      return deliveryFee;
    }
    
    return 0;
  };
  
  const discount = calculateDiscount();
  const totalAmount = checkoutData.total || (subtotal + deliveryFee - discount);

  useEffect(() => {
    if (!checkoutData.fullName) {
      toast({
        title: "Checkout information missing",
        description: "Please complete checkout first",
        variant: "destructive",
      });
      navigate("/checkout");
    }
    
    // Auto-select the payment tab based on the selected payment method
    if (checkoutData.paymentMethod) {
      setPaymentTab(checkoutData.paymentMethod);
    }
  }, [checkoutData, navigate, toast]);

  // Form for credit card payment
  const cardForm = useForm<z.infer<typeof cardPaymentSchema>>({
    resolver: zodResolver(cardPaymentSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Form for UPI payment
  const upiForm = useForm<z.infer<typeof upiPaymentSchema>>({
    resolver: zodResolver(upiPaymentSchema),
    defaultValues: {
      upiId: "",
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

  // Process card payment
  function onCardSubmit(values: z.infer<typeof cardPaymentSchema>) {
    console.log("Card Payment values:", values);
    processPayment('card');
  }

  // Process UPI payment
  function onUpiSubmit(values: z.infer<typeof upiPaymentSchema>) {
    console.log("UPI Payment values:", values);
    processPayment('upi');
  }

  // Process cash payment
  function onCashPayment() {
    processPayment('cash');
  }

  // Common payment processing function
  function processPayment(method: string) {
    setIsProcessing(true);
    
    // Show payment processing toast
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment...",
    });
    
    // Simulate payment processing
    setTimeout(() => {
      console.log(`${method} payment processed successfully`);
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
          paymentMethod: method === 'card' ? "Credit Card" : method === 'upi' ? "UPI Payment" : "Cash on Delivery",
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
                  <Tabs value={paymentTab} onValueChange={setPaymentTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="card" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="upi" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                        <Smartphone className="mr-2 h-4 w-4" />
                        UPI
                      </TabsTrigger>
                      <TabsTrigger value="cash" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
                        Cash
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="bg-emerald-50 p-4 mb-6 rounded-md border border-emerald-100">
                      <p className="text-sm text-emerald-700 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>This is a demo checkout. For card payment, use "4242424242424242" with any future date and CVV.</span>
                      </p>
                    </div>
                    
                    <TabsContent value="card">
                      <Form {...cardForm}>
                        <form onSubmit={cardForm.handleSubmit(onCardSubmit)} className="space-y-6">
                          <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="text-emerald-700" />
                            <h2 className="text-xl font-medium">Card Information</h2>
                          </div>

                          <FormField
                            control={cardForm.control}
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
                            control={cardForm.control}
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
                              control={cardForm.control}
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
                              control={cardForm.control}
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
                    </TabsContent>
                    
                    <TabsContent value="upi">
                      <Form {...upiForm}>
                        <form onSubmit={upiForm.handleSubmit(onUpiSubmit)} className="space-y-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Smartphone className="text-emerald-700" />
                            <h2 className="text-xl font-medium">UPI Payment</h2>
                          </div>

                          <div className="flex justify-center space-x-4 mb-6">
                            <div className="p-3 border rounded-md text-center w-24 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200">
                              <div className="h-10 w-10 bg-green-100 rounded-full mx-auto mb-2"></div>
                              <p className="text-xs">PhonePe</p>
                            </div>
                            <div className="p-3 border rounded-md text-center w-24 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200">
                              <div className="h-10 w-10 bg-blue-100 rounded-full mx-auto mb-2"></div>
                              <p className="text-xs">Google Pay</p>
                            </div>
                            <div className="p-3 border rounded-md text-center w-24 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200">
                              <div className="h-10 w-10 bg-indigo-100 rounded-full mx-auto mb-2"></div>
                              <p className="text-xs">Paytm</p>
                            </div>
                          </div>

                          <FormField
                            control={upiForm.control}
                            name="upiId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>UPI ID</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="yourname@upi"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
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
                    </TabsContent>
                    
                    <TabsContent value="cash">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <DollarSign className="text-emerald-700" />
                          <h2 className="text-xl font-medium">Cash on Delivery</h2>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 mb-4">You will pay ₹{totalAmount} in cash when your order is delivered.</p>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-emerald-700 mr-2 mt-0.5" />
                              <span>Our delivery person will carry change</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-emerald-700 mr-2 mt-0.5" />
                              <span>Digital payment options also available at time of delivery</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-emerald-700 mr-2 mt-0.5" />
                              <span>Contactless delivery available on request</span>
                            </li>
                          </ul>
                        </div>
                        
                        <Button 
                          type="button"
                          onClick={onCashPayment}
                          className="w-full bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center gap-2"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <span className="animate-pulse">Processing...</span>
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </>
                          ) : (
                            <>Place Order (₹{totalAmount})</>
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
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
                    <span>₹{subtotal}</span>
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
