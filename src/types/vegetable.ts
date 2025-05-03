
export interface Image {
  id: number;
  url: string;
  alt: string;
}

export interface Vegetable {
  id: number;
  name: string;
  price: number;
  unit: string;
  description: string;
  nutritionalInfo: string;
  origin: string;
  images: Image[];
  isOrganic: boolean;
  inStock: boolean;
  category: string;
}
