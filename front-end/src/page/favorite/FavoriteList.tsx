import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../hooks/useFavorite";
import axios from "../../Service/axios";
// import { Product } from "../../types/Product";

interface FavoriteResponse {
  userId: number;
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
}

interface Props {
  userId: number;
}

const FavoriteList: React.FC<Props> = ({ userId }) => {
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite, loading } = useFavorites(userId);

  // Lấy dữ liệu favorite products full info từ API, dựa vào danh sách id từ hook
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Giả sử API trả về danh sách favorite full product objects
        const res = await axios.get(`/favorites/${userId}`);
        if (Array.isArray(res.data)) {
          setFavorites(res.data);
        } else {
          setFavorites([]);
          console.warn("Dữ liệu sản phẩm yêu thích không đúng định dạng");
        }
      } catch (err) {
        console.error("Lỗi khi load sản phẩm yêu thích:", err);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (loading) return <div className="text-center mt-6">Đang tải...</div>;
  if (favorites.length === 0)
    return (
      <div className="text-center mt-6 text-gray-500">
        Chưa có sản phẩm yêu thích.
      </div>
    );

  return (
    <>
      <Header />
      <main className="min-h-[90vh] px-4 py-6 flex justify-center">
        <div className="w-full max-w-[1440px] px-6 py-6 shadow-md rounded-[40px] bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Sản phẩm yêu thích
          </h2>

          <div className="flex flex-col space-y-6">
            {favorites.map((fav) => (
              <div
                key={fav.productId}
                className="w-full flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-gray-100 shadow hover:shadow-md rounded-xl transition duration-200"
              >
                <img
                  src={fav.productImage || "/no-image.jpg"}
                  alt={fav.productName}
                  className="w-32 h-32 object-cover rounded-md"
                />

                <div className="flex flex-col flex-grow gap-2">
                  <h3 className="font-semibold text-lg">{fav.productName}</h3>
                  <p className="text-red-600 font-bold text-base">
                    {fav.productPrice?.toLocaleString("vi-VN")}₫
                  </p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => addToCart(fav.productId, 1)}
                      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                    >
                      <FiShoppingCart className="mr-1" />
                      Thêm vào giỏ
                    </button>

                    <button
                      onClick={() => toggleFavorite(fav.productId)}
                      className="text-red-500 text-xl hover:scale-110 transition"
                      title={
                        isFavorite(fav.productId)
                          ? "Bỏ yêu thích"
                          : "Thêm yêu thích"
                      }
                    >
                      {isFavorite(fav.productId) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FavoriteList;
