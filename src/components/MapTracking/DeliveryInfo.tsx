
import React from 'react';

interface DeliveryInfoProps {
  simulationRunning: boolean;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ simulationRunning }) => {
  return (
    <div className="mt-6 p-5 bg-emerald-50 rounded-lg border border-emerald-100">
      <h3 className="font-semibold text-lg mb-3">About Our Tracking</h3>
      <p className="text-gray-700">
        With TheSabjiWala's real-time tracking, you can monitor your vegetable delivery from the mandi directly to your doorstep. Know exactly when your farm-fresh produce will arrive!
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium">Pickup Location</h4>
          <p className="text-sm text-gray-600">Jwalapuri Vegetable Mandi, Delhi</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium">Estimated Delivery Time</h4>
          <p className="text-sm text-gray-600">30-45 minutes</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium">Order Status</h4>
          <p className="text-sm text-emerald-600 font-medium">
            {simulationRunning ? 'In Transit' : 'Ready for Delivery'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
