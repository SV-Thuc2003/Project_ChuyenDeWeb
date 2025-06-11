import axios from 'axios';
import { Product } from '../types/Product';
import { ProductDetail } from '../types/ProductDetail';

const BASE_URL = 'http://localhost:8080/api/products';
export interface PagedProducts {
  products: Product[];
  totalPages: number;
  totalResults: number;
}

// GET sản phẩm mới nhất
export const fetchNewProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/new`);
  return response.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: item.price.toLocaleString() + '₫',
    image: item.thumbnailUrl
      ? item.thumbnailUrl
      : (item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : ''),
    isFavorite: false,
  }));
};

// GET sản phẩm bán chạy nhất
export const fetchBestSellingProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/best-selling`);
  return response.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: item.price.toLocaleString() + '₫',
    image: item.thumbnailUrl
      ? item.thumbnailUrl
      : (item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : ''),
    isFavorite: false,
  }));
};
// GET sản phẩm theo danh mục
export const fetchProductsByCategory = async (
  categoryId: number,
  page: number = 0,
  size: number = 12
): Promise<PagedProducts> => {
  const response = await axios.get(`${BASE_URL}/by-category/${categoryId}`, {
    params: {
      page,
      size,
    },
  });

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
};

// Call API hiển thị sản phẩm 
export const getProductById = async (id: number): Promise<ProductDetail> => {
  const response = await axios.get<ProductDetail>(`/api/products/${id}`);
  return response.data;
};

//  export const fetchProducts = async (
//   page: number = 0,
//   size: number = 12,
//   category?: string | number,
//   // categoryId?: number,
//   brandIds?: number[],
//   tagIds?: number[],
//   minPrice?: number,
//   maxPrice?: number,
//   productType?: string  // thêm param productType
// ): Promise<Product[]> => {
//   const response = await axios.get(`${BASE_URL}`, {
//     params: {
//       page,
//       size,
//       ...(category ? { category } : {}),
//       ...(brandIds && brandIds.length ? { brandIds: brandIds.join(',') } : {}),
//       ...(tagIds && tagIds.length ? { tagIds: tagIds.join(',') } : {}),
//       ...(minPrice ? { minPrice } : {}),
//       ...(maxPrice ? { maxPrice } : {}),
//       ...(productType ? { productType } : {}),  // truyền productType vào query param
//     },
//   });

//   return response.data.content.map((item: any) => ({
//     id: item.id,
//     name: item.name,
//     price: item.price.toLocaleString() + '₫',
//     image: item.thumbnailUrl
//       ? item.thumbnailUrl
//       : (item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : ''),
//     isFavorite: false,
//   }));
// };