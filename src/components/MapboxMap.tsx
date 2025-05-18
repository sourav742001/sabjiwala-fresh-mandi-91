
import React, { useState, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '@/hooks/use-toast';

// Import mapbox-gl dynamically to avoid SSR issues
const MapboxMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [showTokenInput, setShowTokenInput] = useState<boolean>(!mapboxToken);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [mapboxGl, setMapboxGl] = useState<any | null>(null);

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
        center: [77.0688, 28.6849], // Nangloi, Delhi coordinates
        zoom: 11,
        attributionControl: true,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxGl.NavigationControl(),
        'top-right'
      );

      // Add marker for SabjiWala location
      new mapboxGl.Marker({ color: '#10b981' })
        .setLngLat([77.0688, 28.6849])
        .setPopup(new mapboxGl.Popup().setHTML("<h3>The SabjiWala HQ</h3><p>Bhim Nagar, JJ Colony No 3, Nangloi, Delhi, 110087</p>"))
        .addTo(map.current);

      // Success message
      toast({
        title: "Map initialized",
        description: "Mapbox map has been successfully loaded",
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
  }, [mapboxToken, mapboxGl, toast]);

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

  const handleResetToken = () => {
    localStorage.removeItem('mapbox_token');
    setMapboxToken('');
    setShowTokenInput(true);
    
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };

  return (
    <div className="relative w-full h-[500px]">
      {showTokenInput ? (
        <Card className="absolute inset-0 z-10 flex flex-col">
          <CardHeader>
            <CardTitle>Mapbox API Token Required</CardTitle>
            <CardDescription>
              To view the map, please enter your Mapbox API token. 
              You can find this in your Mapbox account dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <label htmlFor="token" className="text-sm font-medium">
                  Mapbox Token
                </label>
                <Input 
                  id="token"
                  type="text" 
                  placeholder="Enter your Mapbox public token" 
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Your token will be stored locally in your browser and is not sent to our servers.
                </p>
              </div>
              <Button type="submit" className="w-full">
                Initialize Map
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 justify-center">
            <a 
              href="https://account.mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Don't have a token? Sign up for Mapbox
            </a>
          </CardFooter>
        </Card>
      ) : (
        <div className="absolute top-2 right-2 z-10">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetToken}
            className="bg-white bg-opacity-70 hover:bg-opacity-100"
          >
            Change API Key
          </Button>
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 rounded-lg border border-gray-200"
      />
    </div>
  );
};

export default MapboxMap;
