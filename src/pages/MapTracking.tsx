
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Types for our locations
interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'pickup' | 'dropoff' | 'vehicle';
}

const MapTracking = () => {
  // Refs for the map container and map instance
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  // Map controls
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiKeySet, setApiKeySet] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const simulationRef = useRef<number | null>(null);

  // Define initial locations - Delhi area coordinates
  const [locations, setLocations] = useState<Location[]>([
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
  ]);

  // Track the route coordinates
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const vehicleRouteRef = useRef<mapboxgl.GeoJSONSource | null>(null);

  // Set the Mapbox API key from input
  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      mapboxgl.accessToken = apiKeyInput.trim();
      setApiKeySet(true);
      initializeMap();
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid Mapbox API key",
        variant: "destructive"
      });
    }
  };

  // Initialize the map once we have the API key
  const initializeMap = () => {
    if (!mapContainer.current) return;

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

      // Generate initial route between pickup and vehicle
      const initialRoute = generateRoute(
        locations.find(loc => loc.id === 'pickup')!.coordinates,
        locations.find(loc => loc.id === 'dropoff')!.coordinates,
        10 // number of points between
      );
      
      setRouteCoordinates(initialRoute);
      updateRoute(initialRoute);

      setMapLoaded(true);
    });
  };

  // Add markers for pickup, dropoff and vehicle
  const addMarkers = () => {
    locations.forEach(location => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.width = '28px';
      markerElement.style.height = '28px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.display = 'flex';
      markerElement.style.alignItems = 'center';
      markerElement.style.justifyContent = 'center';

      // Create different colored markers based on type
      switch (location.type) {
        case 'pickup':
          markerElement.style.backgroundColor = '#16a34a'; // Green
          markerElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
          break;
        case 'dropoff':
          markerElement.style.backgroundColor = '#dc2626'; // Red
          markerElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
          break;
        case 'vehicle':
          markerElement.style.backgroundColor = '#2563eb'; // Blue
          markerElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h6V6l6 6-6 6v-3H3V9z"></path><path d="M18 4v16"></path></svg>';
          break;
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

  // Generate route points between two locations
  const generateRoute = (start: [number, number], end: [number, number], numPoints: number): [number, number][] => {
    const route: [number, number][] = [start];
    
    for (let i = 1; i < numPoints; i++) {
      const fraction = i / numPoints;
      const lng = start[0] + (end[0] - start[0]) * fraction;
      const lat = start[1] + (end[1] - start[1]) * fraction;
      route.push([lng, lat]);
    }
    
    route.push(end);
    return route;
  };

  // Update the route line on the map
  const updateRoute = (coordinates: [number, number][]) => {
    if (vehicleRouteRef.current) {
      vehicleRouteRef.current.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates
        }
      });
    }
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
          variant: "success"
        });
        return;
      }

      // Update vehicle position
      currentIndex++;
      const newVehiclePosition = routeCoordinates[currentIndex];
      
      // Update vehicle marker position
      markersRef.current['vehicle'].setLngLat(newVehiclePosition);

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
      updateRoute(remainingRoute);

      // Center map on vehicle with animation
      map.current?.easeTo({
        center: newVehiclePosition,
        zoom: 13,
        duration: 1000
      });
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
    markersRef.current['vehicle'].setLngLat(pickupLocation);
    
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
    updateRoute(resetRoute);
    
    // Center map view
    map.current?.flyTo({
      center: [77.1025, 28.6139],
      zoom: 11,
      duration: 1500
    });

    toast({
      title: "Tracking Reset",
      description: "Vehicle has returned to the pickup location",
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, []);

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
          <div className="flex gap-2">
            <Button 
              onClick={startSimulation} 
              disabled={!mapLoaded || simulationRunning}
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              Start Tracking
            </Button>
            <Button 
              onClick={stopSimulation}
              disabled={!simulationRunning}
              variant="outline"
              className="border-emerald-700 text-emerald-700"
            >
              Pause
            </Button>
            <Button 
              onClick={resetSimulation}
              disabled={!mapLoaded}
              variant="outline"
              className="border-gray-300"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {!apiKeySet ? (
            <div className="p-8 flex flex-col items-center">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Enter Mapbox API Key</h2>
                <p className="text-gray-600">
                  To use the map tracking feature, please enter your Mapbox public token.
                  You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">mapbox.com</a> dashboard.
                </p>
              </div>
              
              <form onSubmit={handleApiKeySubmit} className="w-full max-w-lg">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="pk.eyJ1Ijoic2FianJ..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800">
                    Load Map
                  </Button>
                </div>
              </form>
            </div>
          ) : (
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
              </div>
            </div>
          )}
        </div>

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
      </main>
      <Footer />
    </div>
  );
};

export default MapTracking;
