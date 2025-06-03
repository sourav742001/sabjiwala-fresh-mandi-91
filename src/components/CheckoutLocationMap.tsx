import React, { useState, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

interface CheckoutLocationMapProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const CheckoutLocationMap: React.FC<CheckoutLocationMapProps> = ({ onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any | null>(null);
  const marker = useRef<any | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [showTokenInput, setShowTokenInput] = useState<boolean>(!mapboxToken);
  const [error, setError] = useState<string | null>(null);
  const [mapboxGl, setMapboxGl] = useState<any | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string }>({
    lat: 28.6849,
    lng: 77.0688,
    address: "Bhim Nagar, JJ Colony No 3, Nangloi, Delhi, 110087, India"
  });
  const { toast } = useToast();

  // Dynamically import mapbox-gl
  useEffect(() => {
    const loadMapboxGl = async () => {
      try {
        const mapboxModule = await import('mapbox-gl');
        setMapboxGl(mapboxModule.default);
      } catch (err) {
        console.error('Error loading Mapbox GL:', err);
        setError('Failed to load Mapbox GL. Please check your connection.');
      }
    };
    
    loadMapboxGl();
  }, []);

  // Initialize map when token is available and mapboxGl is loaded
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !mapboxGl) return;
    
    try {
      // Initialize map with user-provided token
      mapboxGl.accessToken = mapboxToken;
      
      map.current = new mapboxGl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 12,
        attributionControl: true,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxGl.NavigationControl(),
        'top-right'
      );

      // Add geocoder control for searching addresses
      const geocoder = new mapboxGl.Geocoder({
        accessToken: mapboxGl.accessToken,
        mapboxgl: mapboxGl,
        marker: false,
        placeholder: 'Search for your address'
      });
      
      map.current.addControl(geocoder);
      
      // Add marker for selected location
      marker.current = new mapboxGl.Marker({ draggable: true })
        .setLngLat([selectedLocation.lng, selectedLocation.lat])
        .addTo(map.current);
        
      // Update location on marker drag
      marker.current.on('dragend', async () => {
        const lngLat = marker.current.getLngLat();
        await updateSelectedLocationFromCoordinates(lngLat.lng, lngLat.lat);
      });
      
      // Update marker position on map click
      map.current.on('click', async (e) => {
        marker.current.setLngLat([e.lngLat.lng, e.lngLat.lat]);
        await updateSelectedLocationFromCoordinates(e.lngLat.lng, e.lngLat.lat);
      });
      
      // Handle geocoder result
      geocoder.on('result', (e) => {
        const coordinates = e.result.geometry.coordinates;
        const placeName = e.result.place_name;
        
        marker.current.setLngLat(coordinates);
        setSelectedLocation({
          lng: coordinates[0],
          lat: coordinates[1],
          address: placeName
        });
      });

      setError(null);
      
      // Cleanup function
      return () => {
        map.current?.remove();
      };
    } catch (err) {
      console.error('Error initializing Mapbox:', err);
      setError('Failed to initialize map. Please check your Mapbox token.');
      setShowTokenInput(true);
      localStorage.removeItem('mapbox_token');
    }
  }, [mapboxToken, mapboxGl]);

  const updateSelectedLocationFromCoordinates = async (lng: number, lat: number) => {
    try {
      // Reverse geocoding to get address from coordinates
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`);
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        const newLocation = { lng, lat, address };
        setSelectedLocation(newLocation);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      // Fallback to just coordinates if geocoding fails
      setSelectedLocation({
        lng,
        lat,
        address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      });
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      // Save token to localStorage
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
      
      // If map is already initialized, remove it first
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    } else {
      setError('Please enter a valid Mapbox token');
    }
  };

  const handleSelectLocation = () => {
    onLocationSelect(selectedLocation);
    toast({
      title: "Location selected",
      description: `${selectedLocation.address} has been set as your delivery address`,
    });
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {showTokenInput ? (
        <Card className="absolute inset-0 z-10 flex flex-col">
          <CardContent className="flex-grow flex flex-col justify-center p-6">
            <h3 className="text-lg font-medium mb-2">Mapbox API Token Required</h3>
            <p className="text-sm text-gray-500 mb-4">
              To use the map feature, please enter your Mapbox API token.
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Input 
                  type="text" 
                  placeholder="Enter your Mapbox public token" 
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Your token will be stored locally in your browser.
                </p>
              </div>
              <Button type="submit" className="w-full">
                Initialize Map
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div 
            ref={mapContainer} 
            className="absolute inset-0 rounded-lg border border-gray-200"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-md">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-sm font-medium">{selectedLocation.address}</p>
                <p className="text-xs text-gray-500">Click on the map to select your exact location</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button 
                onClick={handleSelectLocation}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                size="sm"
              >
                Confirm Location
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutLocationMap;
