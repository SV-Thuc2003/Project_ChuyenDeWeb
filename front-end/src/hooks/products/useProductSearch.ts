// hooks/useProductSearch.ts
import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { searchProducts } from '../../Service/products';

export interface UseProductSearchResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalResults: number;
  setKeyword: (value: string) => void;
  setPage: (value: number) => void;
  keyword: string;
  page: number;
}

export const useProductSearch = (
  keyword: string,
  page: number = 0,
  pageSize: number = 30
): UseProductSearchResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!keyword.trim()) {
      setProducts([]);
      setTotalPages(0);
      setTotalResults(0);
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await searchProducts(keyword, page, pageSize);
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalResults(data.totalResults);
      } catch (err: any) {
        setError('Đã xảy ra lỗi khi tìm kiếm sản phẩm.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, page, pageSize]);

  return {
    products,
    isLoading,
    error,
    totalPages,
    totalResults,
    setKeyword: () => {
      throw new Error("setKeyword should be managed outside this hook");
    },
    setPage: () => {
      throw new Error("setPage should be managed outside this hook");
    },
    keyword,
    page,
  };
};


