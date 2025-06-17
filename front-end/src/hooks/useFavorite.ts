import { useEffect, useState } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../Service/FavoriteService';

export const useFavorites = (userId: number) => {
  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites(userId); // giả sử trả về array<number>
        setFavoriteProductIds(favorites);
      } catch (error) {
        console.error('Lỗi khi tải danh sách yêu thích:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const isFavorite = (productId: number) => favoriteProductIds.includes(productId);

  const toggleFavorite = async (productId: number) => {
    try {
      if (isFavorite(productId)) {
        await removeFavorite(userId, productId);
        setFavoriteProductIds((prev) => prev.filter((id) => id !== productId));
      } else {
        await addFavorite(userId, productId);
        setFavoriteProductIds((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi yêu thích:', error);
    }
  };

  return { favoriteProductIds, isFavorite, toggleFavorite, loading };
};
