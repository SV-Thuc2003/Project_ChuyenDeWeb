import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartItem } from "../types/Cart";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!userId || !token) return;

    try {
      const res = await axios.get(`/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.cartItems)) {
        setCartItems(data.cartItems);
      }
    } catch (error) {
      console.error("❌ Không thể lấy giỏ hàng:", error);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    if (!userId || !token) throw new Error("Chưa đăng nhập");

    try {
      await axios.post(
          `/api/cart/${userId}/add`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      await fetchCart(); // cập nhật lại giỏ sau khi thêm
    } catch (error) {
      console.error("❌ Lỗi khi thêm vào giỏ hàng:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
      <CartContext.Provider value={{ cartItems, addToCart, refreshCart: fetchCart }}>
        {children}
      </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được dùng bên trong CartProvider");
  }
  return context;
};
