// // src/hooks/useProducts.ts
// import { useEffect, useState } from 'react';
// import { fetchProducts } from '../Services/products';
// import { Product } from '../types/Product';

// export const useProducts = (
//   page: number = 0,
//   size: number = 12,
//   category?: string | number,
//   brandIds?: number[],
//   tagIds?: number[],
//   minPrice?: number,
//   maxPrice?: number,
//   productType?: string
// ) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchProducts(page, size, category, brandIds, tagIds, minPrice, maxPrice, productType);
//         setProducts(data);
//       } catch (err) {
//         setError('Lỗi khi tải sản phẩm');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, [page, size, category, brandIds, tagIds, minPrice, maxPrice, productType]);

//   return { products, loading, error };
// };

