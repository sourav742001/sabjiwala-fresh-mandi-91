
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/hooks/use-toast';
import { Navigation, Clock } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  type: 'pickup' | 'dropoff' | 'vehicle';
  coordinates: [number, number];
}

interface DeliveryMapProps {
  locations: Location[];
  simulationRunning: boolean;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({ 
  locations, 
  simulationRunning
}) => {
  // Refs for the map container and map instance
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const vehicleRouteRef = useRef<mapboxgl.GeoJSONSource | null>(null);
  
  // Initialize the map on component mount
  useEffect(() => {
    if (!mapContainer.current) return;

    // Set a default public token for demonstration purposes
    // Note: This is a restricted demo token and should be replaced with a real one in production
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNrZHZna2lnMzB1aWgycXA5bTdjeGNwbTAifQ.bKP94TbjF_FMGzimNOJ43g';
    
    // Create a new map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.1025, 28.6139], // Center on Delhi
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Wait for map to load
    map.current.on('load', () => {
      // Add route source and layer
      map.current?.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      });

      map.current?.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#16a34a', // Emerald green
          'line-width': 5,
          'line-opacity': 0.8
        }
      });

      // Get the vehicle route source for later updates
      vehicleRouteRef.current = map.current?.getSource('route') as mapboxgl.GeoJSONSource;

      // Add markers for all locations
      addMarkers();

      // Generate initial route
      updateRoute();

      toast({
        title: "Map loaded successfully",
        description: "Your delivery route has been calculated",
      });
    });
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Add markers for pickup, dropoff and vehicle
  const addMarkers = () => {
    locations.forEach(location => {
      let markerElement = document.createElement('div');

      // Style based on marker type
      if (location.type === 'pickup') {
        markerElement.className = 'w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center border-2 border-white';
        markerElement.innerHTML = '<span class="text-white text-xs font-bold">P</span>';
      } else if (location.type === 'dropoff') {
        markerElement.className = 'w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-white';
        markerElement.innerHTML = '<span class="text-white text-xs font-bold">D</span>';
      } else {
        markerElement.className = 'w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white';
        markerElement.innerHTML = '<span class="text-white text-xs font-bold">V</span>';
      }

      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'center'
      })
        .setLngLat(location.coordinates)
        .addTo(map.current!);

      // Add popup with location name
      marker.setPopup(new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25
      }).setHTML(`<p class="font-medium text-sm">${location.name}</p>`));

      // Store the marker reference
      markersRef.current[location.id] = marker;
    });
  };

  // Generate a route between two points with some randomness
  const generateRoute = (start: [number, number], end: [number, number], numPoints: number) => {
    const route: [number, number][] = [start];
    
    // Linear interpolation with random offsets
    for (let i = 1; i < numPoints - 1; i++) {
      const ratio = i / numPoints;
      const lng = start[0] + (end[0] - start[0]) * ratio + (Math.random() - 0.5) * 0.01;
      const lat = start[1] + (end[1] - start[1]) * ratio + (Math.random() - 0.5) * 0.01;
      route.push([lng, lat]);
    }
    
    route.push(end);
    return route;
  };
  
  // Update the route displayed on the map
  const updateRoute = () => {
    const pickup = locations.find(loc => loc.id === 'pickup')?.coordinates;
    const dropoff = locations.find(loc => loc.id === 'dropoff')?.coordinates;
    
    if (pickup && dropoff && vehicleRouteRef.current) {
      const route = generateRoute(pickup, dropoff, 10);
      
      vehicleRouteRef.current.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      });
    }
  };

  // This effect updates the vehicle marker position and centers the map
  useEffect(() => {
    const vehicleLocation = locations.find(loc => loc.id === 'vehicle');
    if (vehicleLocation && markersRef.current['vehicle']) {
      markersRef.current['vehicle'].setLngLat(vehicleLocation.coordinates);
      
      if (simulationRunning) {
        // Center map on vehicle with animation when simulation is running
        map.current?.easeTo({
          center: vehicleLocation.coordinates,
          zoom: 13,
          duration: 1000
        });
      }
    }

    // Update the route if needed
    if (vehicleRouteRef.current) {
      updateRoute();
    }
  }, [locations, simulationRunning]);

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[500px] rounded-md overflow-hidden" />
      
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
        <h3 className="font-semibold text-sm mb-2">Order Details</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
            <span>Pickup: Jwalapuri Mandi</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span>Dropoff: Your Home</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>Delivery Vehicle</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md flex items-center gap-2">
        <Navigation className="w-4 h-4 text-emerald-700" />
        <span className="text-xs font-medium">
          {simulationRunning ? 'Delivering your fresh vegetables' : 'Ready for delivery'}
        </span>
      </div>
      
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md flex items-center gap-2">
        <Clock className="w-4 h-4 text-emerald-700" />
        <span className="text-xs font-medium">
          Est. delivery time: 30-45 min
        </span>
      </div>
    </div>
  );
};

export default DeliveryMap;
