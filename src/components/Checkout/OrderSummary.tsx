
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Add the CartItem interface since we need to import it from CartContext
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
}

const OrderSummary = ({ cart, subtotal, deliveryFee, total }: OrderSummaryProps) => {
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
  );
};

export default OrderSummary;
