export interface WaterCategory {
  id: number;
  name: string;
  image: string;
  vectorImage: string;
  productType?: string;
  slug?: string;
}

export interface FilterCategory {
  id: number;
  name: string;
  count: number;
  checked: boolean;
}

export interface Brand {
  id: number;
  name: string;
  count: number;
  checked: boolean;
}

export interface WaterTag {
  id: number;
  name: string;
  selected: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  isFavorite: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

  