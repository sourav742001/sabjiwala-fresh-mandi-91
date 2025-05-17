
export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

export interface ShippingSlot {
  id: string;
  time: string;
  day: string;
  available: boolean;
}
