// import axios from './axios';
import axios from 'axios';
import { Product, PriceRange  } from '../types/Product';
import { ProductDetail } from '../types/ProductDetail';

const BASE_URL = 'http://localhost:8080/api/products';
// const BASE_URL = '/products';
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
// hiển thị sản phẩm 
export interface PagedProducts {
  products: Product[];
  totalPages: number;
  totalResults: number;   // <- FE muốn thế này
}
export const fetchProducts = async (
  page = 0,
  size = 12,
): Promise<PagedProducts> => {
  const { data } = await axios.get(BASE_URL, { params: { page, size } });

  const products: Product[] = data.content.map((item: any) => ({
    id:         item.id,
    name:       item.name,
    price:      item.price.toLocaleString() + '₫',
    image:      item.thumbnailUrl ?? item.imageUrls?.[0] ?? '',
    isFavorite: false,
  }));

  return {
    products,
    totalPages: data.totalPages,
    totalResults: data.totalElements,  // map sang tên FE mong muốn
  };
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
// ): Promise<Product> => {
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

export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  parentId?: number | null;
}
export const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get('/api/categories');
  return response.data;
};

export interface Brand {
  id: number;
  name: string;
  logoUrl: string;
}

export const fetchAllBrands = async (): Promise<Brand[]> => {
  const response = await axios.get('/api/brands');
  return response.data;
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

export const fetchPriceRangeByCategory = async (categoryId: number): Promise<PriceRange> => {
  const response = await axios.get(`/api/products/price-range/${categoryId}`);
  return {
    min: response.data.minPrice,
    max: response.data.maxPrice,
  };
};

// Search sản phẩm theo keyword
export const searchProducts = async (
  keyword: string,
  page: number = 0,
  size: number = 10
): Promise<PagedProducts> => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { keyword, page, size },
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
