import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import HeroSection from '../../components/common/HeroSection';
import CartSection from './CartSection';
import CartSummary from './CartSummary';
import { CartItem } from '../../types/Cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartCheckOut: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const data = res.data;
        if (Array.isArray(data)) {
          setCartItems(data);
        } else if (Array.isArray(data.cartItems)) {
          setCartItems(data.cartItems);
        } else {
          console.warn("Unexpected response format:", data);
          setCartItems([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        alert("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      }
    };

    fetchCart();
  }, [navigate]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    setSubtotal(newSubtotal);
    setTotal(newSubtotal);
    console.log("🛒 DEBUG - cartItems:", cartItems); // 👈 kiểm tra trùng productId không
  }, [cartItems]);


  const handleRemoveItem = async (cartItemId: number) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    try {
      await axios.delete(`/api/cart/${userId}/remove/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== cartItemId)
      );
      console.log("🗑️ Đã xóa khỏi giỏ hàng");
    } catch (error) {
      console.error("❌ Xóa giỏ hàng lỗi:", error);
      alert("Lỗi khi xóa sản phẩm.");
    }
  };

  const handleQuantityChange = (cartId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
    );
  };



  const handleUpdateCart = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    try {
      await axios.put(`/api/cart/${userId}/update`, cartItems.map(item => ({
        id: item.id, // 👈 THÊM VÀO
        productId: item.productId,
        quantity: item.quantity,
      })), {
        headers: {
          Authorization: `Bearer ${token}`,
        }, // ❌ đừng để withCredentials nếu không cần
      });

      alert('Cập nhật giỏ hàng thành công!');
    } catch (err) {
      console.error('Lỗi khi cập nhật giỏ hàng:', err);
      alert('Lỗi cập nhật giỏ hàng.');
    }
  };

  const handleContinueShopping = () => {
    window.location.href = '/products';
  };

  const handleApplyPromoCode = (code: string) => {
    alert(`Mã ưu đãi "${code}" đã được áp dụng!`);
  };

  const handleProceedToCheckout = () => {
    alert('Đang chuyển đến trang thanh toán...');
  };

  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <HeroSection />
        <main className="flex-grow py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CartSection
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveItem}
                    onQuantityChange={handleQuantityChange}
                    onUpdateCart={handleUpdateCart} // ✅ TRUYỀN VÀO ĐÂY
                    onContinueShopping={handleContinueShopping}
                />
              </div>
              <div className="lg:col-span-1">
                <CartSummary
                    subtotal={subtotal}
                    total={total}
                    onApplyPromoCode={handleApplyPromoCode}
                    onProceedToCheckout={handleProceedToCheckout}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
};

export default CartCheckOut;
