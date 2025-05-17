
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { CustomerDetails } from '@/types/checkout';

interface ShippingAddressFormProps {
  customerDetails: CustomerDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleMapModalOpen: () => void;
  customerLocation: [number, number] | null;
}

const ShippingAddressForm = ({ 
  customerDetails, 
  handleInputChange, 
  handleMapModalOpen,
  customerLocation
}: ShippingAddressFormProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
        
        <div className="mb-4">
          <Label htmlFor="address" className="text-gray-700">Address*</Label>
          <div className="flex items-center mt-1">
            <Input 
              id="address" 
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              className="flex-1"
              required
              readOnly={!!customerLocation}
            />
            <Button 
              type="button"
              variant="outline" 
              onClick={handleMapModalOpen}
              className="ml-2 whitespace-nowrap"
            >
              <MapPin className="mr-1 h-4 w-4" /> Select on Map
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="col-span-2">
            <Label htmlFor="city" className="text-gray-700">City*</Label>
            <Input 
              id="city" 
              name="city"
              value={customerDetails.city}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-gray-700">State*</Label>
            <Input 
              id="state" 
              name="state"
              value={customerDetails.state}
              onChange={handleInputChange}
              className="mt-1"
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="pincode" className="text-gray-700">PIN Code*</Label>
            <Input 
              id="pincode" 
              name="pincode"
              value={customerDetails.pincode}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="notes" className="text-gray-700">Order Notes</Label>
          <Textarea 
            id="notes" 
            name="notes"
            value={customerDetails.notes}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="Special instructions for delivery"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressForm;
