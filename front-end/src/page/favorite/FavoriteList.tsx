import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../hooks/useFavorite";
import axios from "../../Service/axios";

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
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite, loading } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`/favorites/${userId}`);
        if (Array.isArray(res.data)) {
          setFavorites(res.data);
        } else {
          setFavorites([]);
          console.warn(t("favorite.invalidData"));
        }
      } catch (err) {
        console.error(t("favorite.loadError"), err);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [userId, t]);

  if (loading)
    return (
        <>
          <Header />
          <div className="text-center mt-6">{t("favorite.loading")}</div>
          <Footer />
        </>
    );

  return (
      <>
        <Header />
        <main className="min-h-[90vh] px-4 py-6 flex justify-center">
          <div className="w-full max-w-[1440px] px-6 py-6 shadow-md rounded-[40px] bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {t("favorite.title")}
            </h2>

            {favorites.length === 0 ? (
                <div className="text-center mt-6 text-gray-500">
                  {t("favorite.empty")}
                </div>
            ) : (
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
                              {t("favorite.addToCart")}
                            </button>

                            <button
                                onClick={() => toggleFavorite(fav.productId)}
                                className="text-red-500 text-xl hover:scale-110 transition"
                                title={
                                  isFavorite(fav.productId)
                                      ? t("favorite.remove")
                                      : t("favorite.add")
                                }
                            >
                              {isFavorite(fav.productId) ? <FaHeart /> : <FaRegHeart />}
                            </button>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </main>
        <Footer />
      </>
  );
};

export default FavoriteList;
