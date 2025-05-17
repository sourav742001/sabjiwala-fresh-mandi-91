
import React from 'react';
import { Check } from 'lucide-react';

const CheckoutSteps = () => {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center text-emerald-700">
        <div className="bg-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-white mr-2">
          <Check size={14} />
        </div>
        <span>Cart</span>
      </div>
      <div className="h-0.5 w-8 bg-emerald-700"></div>
      <div className="flex items-center text-emerald-700 font-medium">
        <div className="bg-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-white mr-2">
          2
        </div>
        <span>Checkout</span>
      </div>
      <div className="h-0.5 w-8 bg-gray-300"></div>
      <div className="flex items-center text-gray-400">
        <div className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-gray-500 mr-2">
          3
        </div>
        <span>Payment</span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
