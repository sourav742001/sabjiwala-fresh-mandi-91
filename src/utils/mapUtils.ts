
import mapboxgl from 'mapbox-gl';

// Generate route points between two locations
export const generateRoute = (
  start: [number, number], 
  end: [number, number], 
  numPoints: number
): [number, number][] => {
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
export const updateRoute = (
  vehicleRouteRef: React.MutableRefObject<mapboxgl.GeoJSONSource | null>,
  coordinates: [number, number][]
) => {
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

// Create marker element based on location type
export const createMarkerElement = (locationType: 'pickup' | 'dropoff' | 'vehicle'): HTMLDivElement => {
  const markerElement = document.createElement('div');
  markerElement.className = 'custom-marker';
  markerElement.style.width = '28px';
  markerElement.style.height = '28px';
  markerElement.style.borderRadius = '50%';
  markerElement.style.display = 'flex';
  markerElement.style.alignItems = 'center';
  markerElement.style.justifyContent = 'center';

  // Create different colored markers based on type
  switch (locationType) {
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

  return markerElement;
};
