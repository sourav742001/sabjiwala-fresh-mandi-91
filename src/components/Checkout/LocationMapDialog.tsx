
import React, { useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import mapboxgl from 'mapbox-gl';
import { CustomerDetails } from '@/types/checkout';

interface LocationMapDialogProps {
  isMapDialogOpen: boolean;
  setIsMapDialogOpen: (open: boolean) => void;
  customerLocation: [number, number] | null;
  deliveryAddress: string;
  handleMapModalClose: () => void;
  setCustomerLocation: (location: [number, number]) => void;
  setDeliveryAddress: (address: string) => void;
  setCustomerDetails: (fn: (prev: CustomerDetails) => CustomerDetails) => void;
}

const LocationMapDialog = ({
  isMapDialogOpen,
  setIsMapDialogOpen,
  customerLocation,
  deliveryAddress,
  handleMapModalClose,
  setCustomerLocation,
  setDeliveryAddress,
  setCustomerDetails
}: LocationMapDialogProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  
  useEffect(() => {
    if (!isMapDialogOpen || !mapRef.current) return;
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pdHNpbmdoMjAyMyIsImEiOiJjbGdlN2RidnAwNzVxM2dxbjVlbGNuazdzIn0.Uz5taxJmHj7I2l5R8SH4iQ';
    
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: customerLocation || [77.1025, 28.7041], // Default to Delhi
      zoom: 12
    });
    
    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());
    
    // Add a marker that can be dragged
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(customerLocation || [77.1025, 28.7041])
      .addTo(map);
    
    // Get address when marker is dragged
    marker.on('dragend', async () => {
      const lngLat = marker.getLngLat();
      setCustomerLocation([lngLat.lng, lngLat.lat]);
      
      try {
        // Try to reverse geocode the location
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
        );
        
        const data = await response.json();
        if (data?.features?.length > 0) {
          setDeliveryAddress(data.features[0].place_name);
          setCustomerDetails(prev => ({
            ...prev,
            address: data.features[0].place_name
          }));
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    });
    
    mapInstanceRef.current = map;
    markerRef.current = marker;
    
    // Cleanup function
    return () => {
      map.remove();
    };
  }, [isMapDialogOpen, customerLocation, setCustomerLocation, setDeliveryAddress, setCustomerDetails]);

  return (
    <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Your Delivery Location</DialogTitle>
          <DialogDescription>
            Drag the pin to mark your exact delivery location on the map
          </DialogDescription>
        </DialogHeader>

        <div className="h-[400px] w-full relative" ref={mapRef}>
          {/* Map will be rendered here */}
        </div>

        {customerLocation && (
          <div>
            <p className="text-sm mb-2"><strong>Selected Location:</strong> {deliveryAddress || 'Address not available'}</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleMapModalClose}>Cancel</Button>
              <Button onClick={handleMapModalClose}>Confirm Location</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocationMapDialog;
