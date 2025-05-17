
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck, Clock } from "lucide-react";

interface DeliveryMethodSelectorProps {
  shippingMethod: string;
  setShippingMethod: (value: string) => void;
}

const DeliveryMethodSelector = ({ shippingMethod, setShippingMethod }: DeliveryMethodSelectorProps) => {
  return (
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
  );
};

export default DeliveryMethodSelector;
