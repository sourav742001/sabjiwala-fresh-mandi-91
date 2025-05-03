
import React from 'react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import our new components
import DeliveryMap from '@/components/MapTracking/DeliveryMap';
import DeliveryInfo from '@/components/MapTracking/DeliveryInfo';
import MapControls from '@/components/MapTracking/MapControls';
import { Location } from '@/types/map';
import { useMapTracking } from '@/hooks/useMapTracking';

const MapTracking = () => {
  // Define initial locations - Delhi area coordinates
  const initialLocations: Location[] = [
    {
      id: 'pickup',
      name: 'Pickup: Jwalapuri Mandi',
      coordinates: [77.0798, 28.6786],
      type: 'pickup'
    },
    {
      id: 'dropoff',
      name: 'Dropoff: Your Home',
      coordinates: [77.1978, 28.6129],
      type: 'dropoff'
    },
    {
      id: 'vehicle',
      name: 'Delivery Vehicle',
      coordinates: [77.0798, 28.6786], // Start at pickup location
      type: 'vehicle'
    }
  ];

  // Use our custom hook for tracking logic
  const {
    locations,
    mapLoaded,
    setMapLoaded,
    simulationRunning,
    handleRouteGenerated,
    startSimulation,
    stopSimulation,
    resetSimulation
  } = useMapTracking({ initialLocations });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container-custom py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/orders" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-semibold">Track Your Order</h1>
          </div>
          <MapControls 
            mapLoaded={mapLoaded}
            simulationRunning={simulationRunning}
            onStartTracking={startSimulation}
            onStopTracking={stopSimulation}
            onResetTracking={resetSimulation}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div>
            <div className="bg-emerald-700 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Live Vehicle Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-600 py-1 px-2 rounded-full">
                  {simulationRunning ? 'Vehicle Moving' : 'Ready to Track'}
                </span>
              </div>
            </div>
            
            <DeliveryMap 
              locations={locations}
              onRouteGenerated={handleRouteGenerated}
              simulationRunning={simulationRunning}
            />
          </div>
        </div>

        <DeliveryInfo simulationRunning={simulationRunning} />
      </main>
      <Footer />
    </div>
  );
};

export default MapTracking;
