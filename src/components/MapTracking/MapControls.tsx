
import React from 'react';
import { Button } from '@/components/ui/button';

interface MapControlsProps {
  mapLoaded: boolean;
  simulationRunning: boolean;
  onStartTracking: () => void;
  onStopTracking: () => void;
  onResetTracking: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  mapLoaded,
  simulationRunning,
  onStartTracking,
  onStopTracking,
  onResetTracking
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onStartTracking} 
        disabled={!mapLoaded || simulationRunning}
        className="bg-emerald-700 hover:bg-emerald-800"
      >
        Start Tracking
      </Button>
      <Button 
        onClick={onStopTracking}
        disabled={!simulationRunning}
        variant="outline"
        className="border-emerald-700 text-emerald-700"
      >
        Pause
      </Button>
      <Button 
        onClick={onResetTracking}
        disabled={!mapLoaded}
        variant="outline"
        className="border-gray-300"
      >
        Reset
      </Button>
    </div>
  );
};

export default MapControls;
