
import { useState, useRef, useEffect } from 'react';
import { Location } from '@/types/map';
import { useToast } from '@/hooks/use-toast';
import { generateRoute, updateRoute } from '@/utils/mapUtils';
import mapboxgl from 'mapbox-gl';

export interface UseMapTrackingProps {
  initialLocations: Location[];
  onResetMap?: () => void;
}

export const useMapTracking = ({ initialLocations }: UseMapTrackingProps) => {
  // Map controls
  const [mapLoaded, setMapLoaded] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const simulationRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Track locations and route
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const vehicleRouteRef = useRef<mapboxgl.GeoJSONSource | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  // Handle route generation
  const handleRouteGenerated = (route: [number, number][]) => {
    setRouteCoordinates(route);
  };

  // Start vehicle movement simulation
  const startSimulation = () => {
    if (simulationRunning) return;
    
    setSimulationRunning(true);
    toast({
      title: "Delivery Started",
      description: "Your vehicle is on the way to delivery!",
    });

    let currentIndex = 0;
    const totalPoints = routeCoordinates.length;

    simulationRef.current = window.setInterval(() => {
      if (currentIndex >= totalPoints - 1) {
        // End of route reached
        clearInterval(simulationRef.current!);
        setSimulationRunning(false);
        toast({
          title: "Delivery Complete",
          description: "Your order has been delivered!",
          variant: "default"
        });
        return;
      }

      // Update vehicle position
      currentIndex++;
      const newVehiclePosition = routeCoordinates[currentIndex];
      
      // Update locations state with new vehicle position
      setLocations(prevLocations => 
        prevLocations.map(loc => 
          loc.id === 'vehicle' 
            ? { ...loc, coordinates: newVehiclePosition } 
            : loc
        )
      );

      // Update the displayed route (shrink as vehicle progresses)
      const remainingRoute = routeCoordinates.slice(currentIndex);
      if (vehicleRouteRef.current) {
        updateRoute(vehicleRouteRef, remainingRoute);
      }
    }, 2000); // Update every 2 seconds
  };

  // Stop the simulation
  const stopSimulation = () => {
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
      setSimulationRunning(false);
      
      toast({
        title: "Delivery Paused",
        description: "Vehicle tracking has been paused",
      });
    }
  };

  // Reset the simulation
  const resetSimulation = () => {
    stopSimulation();
    
    // Reset vehicle to pickup location
    const pickupLocation = locations.find(loc => loc.id === 'pickup')!.coordinates;
    
    // Update locations state
    setLocations(prevLocations => 
      prevLocations.map(loc => 
        loc.id === 'vehicle' 
          ? { ...loc, coordinates: pickupLocation } 
          : loc
      )
    );

    // Reset route to original
    const resetRoute = generateRoute(
      locations.find(loc => loc.id === 'pickup')!.coordinates,
      locations.find(loc => loc.id === 'dropoff')!.coordinates,
      10
    );
    setRouteCoordinates(resetRoute);
    if (vehicleRouteRef.current) {
      updateRoute(vehicleRouteRef, resetRoute);
    }
    
    toast({
      title: "Tracking Reset",
      description: "Vehicle has returned to the pickup location",
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, []);

  return {
    locations,
    setLocations,
    mapLoaded,
    setMapLoaded,
    simulationRunning,
    routeCoordinates,
    handleRouteGenerated,
    startSimulation,
    stopSimulation,
    resetSimulation,
    vehicleRouteRef,
    markersRef
  };
};
