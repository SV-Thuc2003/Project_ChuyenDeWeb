// src/hooks/useBestSellingProducts.ts
import { useEffect, useState } from 'react';
import { fetchBestSellingProducts } from '../../Service/products';
import { Product } from '../../types/Product';

export const useBestSellingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBestSellingProducts();
        setProducts(data);
      } catch (err) {
        setError('Lỗi khi tải sản phẩm bán chạy');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading, error };
};
