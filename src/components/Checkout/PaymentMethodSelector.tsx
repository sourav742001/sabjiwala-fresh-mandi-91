
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Smartphone, Truck } from "lucide-react";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-medium mb-4">Payment Method</h2>
        
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
          <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center flex-grow cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4 text-emerald-700" />
              <div>
                <p className="font-medium">Credit/Debit Card</p>
                <p className="text-xs text-gray-500">Pay securely with your card</p>
              </div>
              <div className="ml-auto flex space-x-1">
                <div className="w-8 h-5 bg-gray-100 rounded"></div>
                <div className="w-8 h-5 bg-gray-100 rounded"></div>
                <div className="w-8 h-5 bg-gray-100 rounded"></div>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="flex items-center flex-grow cursor-pointer">
              <Smartphone className="mr-2 h-4 w-4 text-emerald-700" />
              <div>
                <p className="font-medium">UPI Payment</p>
                <p className="text-xs text-gray-500">Pay using Google Pay, PhonePe, Paytm</p>
              </div>
              <div className="ml-auto flex space-x-1">
                <div className="w-5 h-5 bg-indigo-100 rounded-full"></div>
                <div className="w-5 h-5 bg-blue-100 rounded-full"></div>
                <div className="w-5 h-5 bg-green-100 rounded-full"></div>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center flex-grow cursor-pointer">
              <Truck className="mr-2 h-4 w-4 text-emerald-700" />
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when your order arrives</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;
