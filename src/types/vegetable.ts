
export interface VegetableImage {
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
  images: VegetableImage[];
  isOrganic: boolean;
  inStock: boolean;
  category: 'vegetable' | 'fruit' | 'leafy-green' | 'root' | 'exotic';
}
