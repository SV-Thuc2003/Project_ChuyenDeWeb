import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../Service/products';

interface UseAllProductsProps {
  page: number;
  size?: number;
}

export const useAllProducts = ({ page, size = 12 }: UseAllProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(page - 1, size); 
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalResults(data.totalResults);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, size]);

  return { products, totalPages, totalResults, loading, error };
};
