
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShippingSlot } from '@/types/checkout';

interface DeliveryTimeSlotsProps {
  shippingSlots: ShippingSlot[];
  selectedSlot: string | null;
  handleSlotSelect: (slotId: string) => void;
}

const DeliveryTimeSlots = ({ shippingSlots, selectedSlot, handleSlotSelect }: DeliveryTimeSlotsProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-medium mb-4">Delivery Time</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {shippingSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => handleSlotSelect(slot.id)}
              disabled={!slot.available}
              className={`
                p-4 border rounded-md text-left transition-colors
                ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                ${selectedSlot === slot.id ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}
              `}
            >
              <p className="font-medium">{slot.time}</p>
              <p className="text-sm text-gray-500">{slot.day}</p>
              {!slot.available && <p className="text-xs text-red-500 mt-1">Not Available</p>}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryTimeSlots;
