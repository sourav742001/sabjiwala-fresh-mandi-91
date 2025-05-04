
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

// Helper function for getting all categories from vegetables data
export const getAllCategories = (items: Vegetable[]): string[] => {
  const categoriesSet = new Set<string>();
  
  items.forEach(item => {
    if (item.category) {
      categoriesSet.add(item.category);
    }
  });
  
  return Array.from(categoriesSet);
};

// Helper function for getting min and max price from vegetables data
export const getMinMaxPrice = (items: Vegetable[]): [number, number] => {
  if (items.length === 0) return [0, 1000];
  
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  
  items.forEach(item => {
    if (item.price < min) min = item.price;
    if (item.price > max) max = item.price;
  });
  
  return [min, max];
};

// Helper function to find a vegetable by ID
export const getVegetableById = (items: Vegetable[], id: number): Vegetable | undefined => {
  return items.find(item => item.id === id);
};
