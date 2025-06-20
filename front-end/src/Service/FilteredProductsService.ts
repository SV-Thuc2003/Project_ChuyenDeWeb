import axios from 'axios';
import { Product } from '../types/Product'; // kiểu Product bạn định nghĩa trước đó
// import axios from './axios';
// const BASE_URL = '/products';
const BASE_URL = 'http://localhost:8080/api/products';

export interface ProductFilterRequest {
  categorySlug?: string;
  categoryId?: number;
  brandIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  filterPairs?: Record<string, string>; // hoặc [{ key: string; value: string }] tùy backend xử lý
  sort?: string; // ví dụ "price,asc" hoặc "name,desc"
  page: number;
  size: number;
}


export interface PagedProducts {
  products: Product[];
  totalPages: number;
  totalResults: number;
}

export const getSortedProducts = async (
  sortBy: string = 'newest',
  page: number = 0,
  size: number = 10
) => {
  const response = await axios.get(`${BASE_URL}/sorted`, {
    params: { sortBy, page, size },
  });
  return response.data; // xử lý data tuỳ ý ở frontend
};

export const filterProducts = async (
  filterRequest: ProductFilterRequest
): Promise<PagedProducts> => {
  try {
    const response = await axios.post(`${BASE_URL}/filter`, filterRequest);

    const data = response.data;

    const products: Product[] = data.content.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price.toLocaleString() + '₫',
      image: item.thumbnailUrl
        ? item.thumbnailUrl
        : item.imageUrls && item.imageUrls.length > 0
        ? item.imageUrls[0]
        : '',
      isFavorite: false,
    }));

    return {
      products,
      totalPages: data.totalPages,
      totalResults: data.totalElements,
    };
  } catch (error) {
    console.error('Failed to filter products:', error);
    throw error;
  }
};
