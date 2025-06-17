// src/hooks/useNewProducts.ts
import { useEffect, useState } from 'react';
import { fetchNewProducts } from '../../Service/products';
import { Product } from '../../types/Product';

export const useNewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNewProducts();
        setProducts(data);
      } catch (err) {
        setError('Lỗi khi tải sản phẩm mới');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading, error };
};
