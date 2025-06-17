// src/pages/FavoriteList.tsx
import React, { useEffect, useState } from 'react';
import axios from '../../Service/axios';
import { useFavorite } from '../../hooks/useFavorite'; // hook bạn đã viết
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // icon yêu thích
import { Product } from '../../types/Product'; // Tùy chỉnh nếu bạn có sẵn type

interface FavoriteResponse {
  product: Product;
}

interface Props {
  userId: number;
}

const FavoriteList: React.FC<Props> = ({ userId }) => {
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`/favorites/${userId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error('Lỗi khi load sản phẩm yêu thích:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (loading) return <div className="text-center mt-4">Đang tải...</div>;
  if (favorites.length === 0)
    return <div className="text-center mt-4 text-gray-500">Chưa có sản phẩm yêu thích.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {favorites.map((favorite) => {
        const product = favorite.product;
        const { isFavorite, toggleFavorite } = useFavorite(product.id, userId);

        return (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow relative hover:shadow-md transition"
          >
            <img
              src={product.image || '/no-image.jpg'}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
            <p className="text-green-600 font-bold">
              {product.price?.toLocaleString('vi-VN')}₫
            </p>
            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 text-red-500 text-xl"
              title={isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteList;
