
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from '@/types/map';
import { createMarkerElement, generateRoute, updateRoute } from '@/utils/mapUtils';
import { useToast } from '@/hooks/use-toast';
import { Navigation, Clock } from 'lucide-react';

interface DeliveryMapProps {
  locations: Location[];
  onRouteGenerated: (route: [number, number][]) => void;
  simulationRunning: boolean;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({ 
  locations, 
  onRouteGenerated,
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

      // Generate initial route between pickup and dropoff
      const pickupLocation = locations.find(loc => loc.id === 'pickup')!.coordinates;
      const dropoffLocation = locations.find(loc => loc.id === 'dropoff')!.coordinates;
      const initialRoute = generateRoute(pickupLocation, dropoffLocation, 10);
      
      updateRoute(vehicleRouteRef, initialRoute);
      onRouteGenerated(initialRoute);

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
      const markerElement = createMarkerElement(location.type);

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
  }, [locations, simulationRunning]);

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[500px]" />
      
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
