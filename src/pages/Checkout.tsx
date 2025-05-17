
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CustomerDetails, ShippingSlot, CouponType, CheckoutData } from '@/types/checkout';
import CustomerDetailsForm from '@/components/Checkout/CustomerDetailsForm';
import ShippingAddressForm from '@/components/Checkout/ShippingAddressForm';
import DeliveryMethodSelector from '@/components/Checkout/DeliveryMethodSelector';
import DeliveryTimeSlots from '@/components/Checkout/DeliveryTimeSlots';
import PaymentMethodSelector from '@/components/Checkout/PaymentMethodSelector';
import OrderSummary from '@/components/Checkout/OrderSummary';
import LocationMapDialog from '@/components/Checkout/LocationMapDialog';
import CheckoutSteps from '@/components/Checkout/CheckoutSteps';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, calculateTotalPrice } = useCart();
  const { toast } = useToast();
  
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [customerLocation, setCustomerLocation] = useState<[number, number] | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponType | undefined>(undefined);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
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
  
  // Calculate delivery fee based on shipping method and applied coupon
  const baseDeliveryFee = shippingMethod === 'express' ? 60 : 30;
  const deliveryFee = appliedCoupon?.type === 'shipping' ? 0 : baseDeliveryFee;
  
  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === "percentage") {
      return Math.floor((subtotal * appliedCoupon.discount) / 100);
    } else if (appliedCoupon.type === "fixed") {
      return appliedCoupon.discount;
    } else if (appliedCoupon.type === "shipping") {
      return baseDeliveryFee;
    }
    
    return 0;
  };
  
  const discount = calculateDiscount();
  
  // Calculate total
  const total = subtotal + deliveryFee - (appliedCoupon ? discount : 0);

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

    // Store checkout data in session storage for payment page
    const selectedSlotObj = shippingSlots.find(s => s.id === selectedSlot);
    const checkoutData: CheckoutData = {
      fullName: `${customerDetails.firstName} ${customerDetails.lastName}`,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: customerDetails.address,
      city: customerDetails.city,
      state: customerDetails.state,
      pincode: customerDetails.pincode,
      notes: customerDetails.notes,
      selectedSlot: selectedSlot,
      slotTime: selectedSlotObj ? `${selectedSlotObj.day}, ${selectedSlotObj.time}` : '',
      shippingMethod: shippingMethod,
      paymentMethod: paymentMethod,
      deliveryFee: deliveryFee,
      subtotal: subtotal,
      total: total,
      appliedCoupon: appliedCoupon
    };
    
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Proceed to payment
    navigate('/payment');
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
            <CheckoutSteps />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side - Form */}
              <div className="lg:col-span-8">
                {/* Customer Details */}
                <CustomerDetailsForm 
                  customerDetails={customerDetails} 
                  handleInputChange={handleInputChange} 
                />
                
                {/* Shipping Address */}
                <ShippingAddressForm 
                  customerDetails={customerDetails} 
                  handleInputChange={handleInputChange}
                  handleMapModalOpen={handleMapModalOpen}
                  customerLocation={customerLocation}
                />
                
                {/* Shipping Method */}
                <DeliveryMethodSelector 
                  shippingMethod={shippingMethod}
                  setShippingMethod={setShippingMethod}
                />
                
                {/* Delivery Time Slots */}
                <DeliveryTimeSlots 
                  shippingSlots={shippingSlots}
                  selectedSlot={selectedSlot}
                  handleSlotSelect={handleSlotSelect}
                />
                
                {/* Payment Method */}
                <PaymentMethodSelector 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </div>
              
              {/* Right Side - Order Summary */}
              <div className="lg:col-span-4">
                <OrderSummary
                  cart={cart}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  total={total}
                  appliedCoupon={appliedCoupon}
                  setAppliedCoupon={setAppliedCoupon}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Map Dialog */}
      <LocationMapDialog
        isMapDialogOpen={isMapDialogOpen}
        setIsMapDialogOpen={setIsMapDialogOpen}
        customerLocation={customerLocation}
        deliveryAddress={deliveryAddress}
        handleMapModalClose={handleMapModalClose}
        setCustomerLocation={setCustomerLocation}
        setDeliveryAddress={setDeliveryAddress}
        setCustomerDetails={setCustomerDetails}
      />

      <Footer />
    </div>
  );
};

export default Checkout;
