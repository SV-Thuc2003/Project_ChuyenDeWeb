import { useEffect, useState } from 'react';
import { getProductById } from '../../Service/products';
import { ProductDetail } from '../../types/ProductDetail';

export function useProductDetail(id: number) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch(() => setError('Không thể tải sản phẩm'))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
