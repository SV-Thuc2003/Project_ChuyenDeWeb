// import { useEffect, useState } from 'react';
// import { filterProducts, ProductFilterRequest } from '../../Services/FilteredProductsService';
// import { Product } from '../../types/Product';

// interface UseFilteredProductsResult {
//   products: Product[];
//   totalPages: number;
//   totalResults: number;
//   loading: boolean;
//   error: Error | null;
//   page: number;
//   size: number;
//   setPage: (page: number) => void;
//   refresh: () => void;
// }

// export const useFilteredProducts = (filterRequest: ProductFilterRequest): UseFilteredProductsResult => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalResults, setTotalResults] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [page, setPage] = useState(filterRequest.page);
//   const [size, setSize] = useState(filterRequest.size);

//   // Khi filterRequest, page hoặc size thay đổi thì gọi lại API
//   useEffect(() => {
//     const fetch = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Gửi filterRequest nhưng override page, size theo state hook
//         const response = await filterProducts({ ...filterRequest, page, size });
//         setProducts(response.products);
//         setTotalPages(response.totalPages);
//         setTotalResults(response.totalResults);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetch();
//   }, [filterRequest, page, size]);

//   // Hàm refresh lại dữ liệu
//   const refresh = () => {
//     setPage(0); // hoặc giữ nguyên page tùy ý
//   };

//   return {
//     products,
//     totalPages,
//     totalResults,
//     loading,
//     error,
//     page,
//     size,
//     setPage,
//     refresh,
//   };
// };


// import { useEffect, useState } from 'react';
// import { filterProducts, ProductFilterRequest } from '../../Services/FilteredProductsService';
// import { Product } from '../../types/Product';

// export const useFilteredProducts = (filterRequest: ProductFilterRequest | null) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalResults, setTotalResults] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!filterRequest) return;

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await filterProducts(filterRequest);
//         setProducts(data.products);
//         setTotalPages(data.totalPages);
//         setTotalResults(data.totalResults);
//       } catch (err: any) {
//         setError(err.message || 'Lỗi tải sản phẩm');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filterRequest]);

//   return { products, totalPages, totalResults, loading, error };
// };


