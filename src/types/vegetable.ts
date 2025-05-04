
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
  type: 'vegetable' | 'fruit';
}

export type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'name-asc' | 'name-desc';

export interface FilterOptions {
  categories: string[];
  organic: boolean;
  priceRange: [number, number];
  type: string | null;
}
