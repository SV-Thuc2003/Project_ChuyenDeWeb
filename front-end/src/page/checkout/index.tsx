import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import PersonalInfoForm from "../checkout/PersonalInfoForm";
import ShippingAddressForm from "../checkout/ShippingAddressForm";
import DiscountCodeForm from "../checkout/DiscountCodeForm";
import PaymentMethodForm from "../checkout/PaymentMethodForm";
import OrderSummary from "../checkout/OrderSummary";
import {
  CheckoutState,
  PersonalInfo,
  ShippingAddress,
} from "../../types/ChechOut";
import { CartItem } from "../../types/Cart";
import axios from "axios";

const Checkout: React.FC = () => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    personalInfo: { name: "", email: "", phone: "" },
    shippingAddress: {
      address: "",
      ward: "",
      wardCode: "",
      district: "",
      districtId: "",
      city: "",
      provinceId: ""
    },
    discountCode: "",
    paymentMethod: "",
  });

  const [products, setProducts] = useState<CartItem[]>([]);
  const [shippingFee, setShippingFee] = useState<number>(0);


  // 🚚 Lấy giỏ hàng từ backend
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("❌ Không có user đăng nhập.");
      return;
    }

    axios.get(`/api/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          console.error("❌ Lỗi lấy giỏ hàng:", err);
        });
  }, []);


  // Tính tổng giá sản phẩm
  const subtotal = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
  );

  const discount = checkoutState.discountCode ? 50000 : 0;

  const handlePersonalInfoChange = (
      field: keyof PersonalInfo,
      value: string
  ) => {
    setCheckoutState((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleShippingAddressChange = (
      field: keyof ShippingAddress,
      value: string
  ) => {
    setCheckoutState((prev) => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [field]: value },
    }));
  };

  const handleDiscountCodeChange = (value: string) => {
    setCheckoutState((prev) => ({
      ...prev,
      discountCode: value,
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setCheckoutState((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  };

  const handleApplyDiscountCode = () => {
    console.log("🎟️ Mã giảm giá:", checkoutState.discountCode);
  };

  const handlePlaceOrder = () => {
    const data = {
      ...checkoutState,
      products,
      shippingFee,
      subtotal,
      discount,
      total: subtotal - discount + shippingFee,
    };
    console.log("✅ Đặt hàng:", data);
    alert("Đặt hàng thành công!");
  };

  return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <PersonalInfoForm
                    personalInfo={checkoutState.personalInfo}
                    onPersonalInfoChange={handlePersonalInfoChange}
                />

                <ShippingAddressForm
                    shippingAddress={checkoutState.shippingAddress}
                    onShippingAddressChange={handleShippingAddressChange}
                    onShippingFeeChange={setShippingFee}
                />

                <DiscountCodeForm
                    discountCode={checkoutState.discountCode}
                    onDiscountCodeChange={handleDiscountCodeChange}
                    onApplyDiscountCode={handleApplyDiscountCode}
                />

                <PaymentMethodForm
                    paymentMethod={checkoutState.paymentMethod}
                    onPaymentMethodChange={handlePaymentMethodChange}
                    onApplyDiscountCode={handleApplyDiscountCode}
                />
              </div>

              <div className="lg:col-span-1">
                <OrderSummary
                    personalInfo={checkoutState.personalInfo}
                    shippingAddress={checkoutState.shippingAddress}
                    discountCode={checkoutState.discountCode}
                    paymentMethod={checkoutState.paymentMethod}
                    products={products ?? []}
                    subtotal={subtotal}
                    discount={discount}
                    shippingFee={shippingFee}
                    onPlaceOrder={handlePlaceOrder}
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default Checkout;
