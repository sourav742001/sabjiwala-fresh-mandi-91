
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerDetails } from '@/types/checkout';

interface CustomerDetailsFormProps {
  customerDetails: CustomerDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomerDetailsForm = ({ customerDetails, handleInputChange }: CustomerDetailsFormProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-medium mb-4">Customer Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="firstName" className="text-gray-700">First Name*</Label>
            <Input 
              id="firstName" 
              name="firstName"
              value={customerDetails.firstName}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
            <Input 
              id="lastName" 
              name="lastName"
              value={customerDetails.lastName}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="email" className="text-gray-700">Email*</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700">Phone Number*</Label>
            <Input 
              id="phone" 
              name="phone"
              value={customerDetails.phone}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsForm;
