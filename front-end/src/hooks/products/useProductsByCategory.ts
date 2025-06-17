// hooks/useProductsByCategory.ts
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { fetchProductsByCategory } from '../../Service/products';

export const useProductsByCategory = (
  categoryId: number,
  page: number = 0,
  size: number = 12
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductsByCategory(categoryId, page, size);
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalResults(data.totalResults);
      } catch (err) {
        setError('Lỗi khi tải sản phẩm theo danh mục');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categoryId, page, size]);

  return { products, totalPages, totalResults, loading, error };
};
