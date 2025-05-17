
import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  type: 'pickup' | 'dropoff' | 'vehicle';
  coordinates: [number, number];
}

export function useDeliveryTracking() {
  // Locations for Delhi area (Jwalapuri Mandi to a random residential area)
  const initialLocations: Location[] = [
    {
      id: 'pickup',
      name: 'Jwalapuri Mandi',
      type: 'pickup',
      coordinates: [77.0528, 28.6377]  // Jwalapuri mandi coordinates
    },
    {
      id: 'dropoff',
      name: 'Your Home',
      type: 'dropoff',
      coordinates: [77.0980, 28.6191]  // Example residential area
    },
    {
      id: 'vehicle',
      name: 'Delivery Vehicle',
      type: 'vehicle',
      coordinates: [77.0528, 28.6377]  // Starts at pickup location
    }
  ];
  
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('30-45 min');
  
  // Function to update vehicle position along the route
  const startSimulation = () => {
    if (simulationRunning) return;
    
    setSimulationRunning(true);
    
    const pickup = locations.find(loc => loc.id === 'pickup')?.coordinates;
    const dropoff = locations.find(loc => loc.id === 'dropoff')?.coordinates;
    
    if (!pickup || !dropoff) return;
    
    // Number of steps in the simulation
    const totalSteps = 50;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      if (currentStep >= totalSteps) {
        setSimulationRunning(false);
        clearInterval(interval);
        setProgress(100);
        setEstimatedTime('Arrived');
        return;
      }
      
      // Calculate progress
      const ratio = currentStep / totalSteps;
      setProgress(Math.round(ratio * 100));
      
      // Interpolate between pickup and dropoff with some randomness
      const lng = pickup[0] + (dropoff[0] - pickup[0]) * ratio + (Math.random() - 0.5) * 0.001;
      const lat = pickup[1] + (dropoff[1] - pickup[1]) * ratio + (Math.random() - 0.5) * 0.001;
      
      // Update vehicle position
      setLocations(prevLocations => {
        const updatedLocations = [...prevLocations];
        const vehicleIndex = updatedLocations.findIndex(loc => loc.id === 'vehicle');
        if (vehicleIndex !== -1) {
          updatedLocations[vehicleIndex] = {
            ...updatedLocations[vehicleIndex],
            coordinates: [lng, lat]
          };
        }
        return updatedLocations;
      });
      
      // Update estimated time
      const remainingMinutes = Math.round(30 * (1 - ratio));
      if (remainingMinutes > 0) {
        setEstimatedTime(`~${remainingMinutes} min`);
      } else {
        setEstimatedTime('Arriving now');
      }
      
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  };
  
  const stopSimulation = () => {
    setSimulationRunning(false);
  };
  
  const resetSimulation = () => {
    stopSimulation();
    setLocations(initialLocations);
    setProgress(0);
    setEstimatedTime('30-45 min');
  };
  
  return {
    locations,
    simulationRunning,
    progress,
    estimatedTime,
    startSimulation,
    stopSimulation,
    resetSimulation
  };
}
