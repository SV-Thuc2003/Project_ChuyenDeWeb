// FavoriteContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../Service/FavoriteService";
import { useTranslation } from "react-i18next";

interface FavoriteContextType {
  favoriteProductIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => Promise<void>;
  loading: boolean;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

interface FavoriteProviderProps {
  userId: number;
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ userId, children }) => {
  const { t } = useTranslation(); // ✅ i18n
  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const favorites = await getFavorites(userId);
        setFavoriteProductIds(favorites);
      } catch (err) {
        console.error(t("favorite.load_error"), err); // ✅ i18n message
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, t]);

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
    } catch (err) {
      console.error(t("favorite.toggle_error"), err); // ✅ i18n message
    }
  };

  return (
      <FavoriteContext.Provider
          value={{ favoriteProductIds, isFavorite, toggleFavorite, loading }}
      >
        {children}
      </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoriteProvider");
  }
  return context;
};
