
export interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'pickup' | 'dropoff' | 'vehicle';
}
