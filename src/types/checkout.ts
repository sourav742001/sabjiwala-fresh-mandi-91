
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

export interface CouponType {
  code: string;
  discount: number;
  type: "percentage" | "fixed" | "shipping";
}

export interface CheckoutData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  selectedSlot: string;
  slotTime: string;
  shippingMethod: string;
  paymentMethod: string;
  deliveryFee: number;
  subtotal: number;
  total: number;
  appliedCoupon?: CouponType;
}
