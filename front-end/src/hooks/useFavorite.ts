// src/hooks/useFavorite.ts
import { useEffect, useState } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../Service/FavoriteService';

export const useFavorite = (productId: number, userId: number) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites(userId);
        setIsFavorite(favorites.includes(productId));
      } catch (err) {
        console.error('Lỗi khi lấy danh sách sản phẩm yêu thích:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [productId, userId]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(userId, productId);
        setIsFavorite(false);
      } else {
        await addFavorite(userId, productId);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Lỗi khi thay đổi trạng thái yêu thích:', err);
    }
  };

  return { isFavorite, toggleFavorite, loading };
};
