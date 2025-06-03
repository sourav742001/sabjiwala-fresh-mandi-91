
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { CouponType } from '@/types/checkout';

interface CartItem {
  vegetable: {
    id: number;
    name: string;
    price: number;
    images: { url: string }[];
  };
  quantity: number;
}

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  appliedCoupon?: CouponType;
  setAppliedCoupon?: (coupon: CouponType | undefined) => void;
}

const OrderSummary = ({ 
  cart, 
  subtotal, 
  deliveryFee, 
  total, 
  appliedCoupon, 
  setAppliedCoupon 
}: OrderSummaryProps) => {
  const [couponCode, setCouponCode] = useState('');
  const { toast } = useToast();
  
  // Dummy coupons for demonstration
  const availableCoupons = [
    { code: "FRESH20", discount: 20, type: "percentage" as const },
    { code: "WELCOME50", discount: 50, type: "fixed" as const },
    { code: "FREESHIP", discount: 0, type: "shipping" as const }
  ];
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Enter a coupon code",
        description: "Please enter a coupon code to apply",
        variant: "destructive",
      });
      return;
    }
    
    const foundCoupon = availableCoupons.find(c => 
      c.code.toLowerCase() === couponCode.trim().toLowerCase()
    );
    
    if (foundCoupon && setAppliedCoupon) {
      setAppliedCoupon(foundCoupon);
      toast({
        title: "Coupon applied!",
        description: `${foundCoupon.code} has been applied to your order.`,
      });
      setCouponCode('');
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      });
    }
  };
  
  const handleRemoveCoupon = () => {
    if (setAppliedCoupon) {
      setAppliedCoupon(undefined);
      toast({
        title: "Coupon removed",
        description: "The coupon has been removed from your order.",
      });
    }
  };
  
  return (
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
          
          {setAppliedCoupon && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Have a Coupon?</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={handleApplyCoupon}
                  className="whitespace-nowrap"
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
          
          {appliedCoupon && (
            <div className="bg-emerald-50 p-3 rounded-md border border-emerald-100 mb-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-emerald-700" />
                <div>
                  <p className="font-medium text-emerald-700 text-sm">{appliedCoupon.code}</p>
                  <p className="text-xs text-emerald-600">
                    {appliedCoupon.type === "percentage" 
                      ? `${appliedCoupon.discount}% off` 
                      : appliedCoupon.type === "fixed"
                        ? `₹${appliedCoupon.discount} off`
                        : "Free shipping"}
                  </p>
                </div>
              </div>
              {setAppliedCoupon && (
                <Button 
                  variant="ghost" 
                  className="h-7 text-xs px-2 hover:text-red-500"
                  onClick={handleRemoveCoupon}
                >
                  Remove
                </Button>
              )}
            </div>
          )}
          
          <Separator className="my-4" />
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span>{deliveryFee > 0 ? `₹${deliveryFee}` : 'Free'}</span>
            </div>
            
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span>
                  - ₹{appliedCoupon.type === "percentage"
                      ? Math.floor((subtotal * appliedCoupon.discount) / 100)
                      : appliedCoupon.type === "fixed"
                        ? appliedCoupon.discount
                        : deliveryFee}
                </span>
              </div>
            )}
            
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
  );
};

export default OrderSummary;
