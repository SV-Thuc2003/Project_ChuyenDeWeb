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
  image:string;
}

export interface WaterTag {
  id: number;
  name: string;
  selected: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

export type PriceRange = {
  min: number;
  max: number;
};

  