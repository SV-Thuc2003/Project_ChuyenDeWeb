import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import PersonalInfoForm from "../checkout/PersonalInfoForm";
import ShippingAddressForm from "../checkout/ShippingAddressForm";
import PaymentMethodForm from "../checkout/PaymentMethodForm";
import OrderSummary from "../checkout/OrderSummary";
import QrPayment from "../payment/QrPayment";

import {
  CheckoutState,
  PersonalInfo,
  ShippingAddress,
} from "../../types/ChechOut";
import { CartItem } from "../../types/Cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Checkout: React.FC = () => {
  const { t } = useTranslation();

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
  const [showQr, setShowQr] = useState(false);
  const [qrData, setQrData] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error(t("checkout.noUser"));
      return;
    }

    axios.get(`/api/cart/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
        .then(res => setProducts(res.data))
        .catch(err => console.error(t("checkout.fetchCartError"), err));
  }, [t]);

  const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = checkoutState.discountCode ? 50000 : 0;

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setCheckoutState(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleShippingAddressChange = (field: keyof ShippingAddress, value: string) => {
    setCheckoutState(prev => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [field]: value },
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setCheckoutState(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleApplyDiscountCode = () => {
    console.log(t("checkout.discountApplied"), checkoutState.discountCode);
  };

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    const formattedProducts = products.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const amount = subtotal - discount + shippingFee;

    if (checkoutState.paymentMethod === "vnpay") {
      try {
        const qrRes = await axios.get(`/api/payment/qr`, {
          params: { amount },
          withCredentials: true
        });

        const { qrUrl, txnRef } = qrRes.data;

        setQrData({
          qrUrl,
          txnRef,
          userId: parseInt(userId),
          amount,
          payload: {
            userId: parseInt(userId),
            personalInfo: checkoutState.personalInfo,
            shippingAddress: checkoutState.shippingAddress,
            products: formattedProducts,
            paymentMethod: checkoutState.paymentMethod,
            discountCode: checkoutState.discountCode,
            subtotal,
            shippingFee,
            discount,
            total: amount,
            status: "PAID"
          }
        });

        setShowQr(true);
      } catch (err) {
        console.error(t("checkout.qrError"), err);
      }
    } else {
      try {
        const payload = {
          userId: parseInt(userId),
          personalInfo: checkoutState.personalInfo,
          shippingAddress: checkoutState.shippingAddress,
          products: formattedProducts,
          paymentMethod: checkoutState.paymentMethod,
          discountCode: checkoutState.discountCode,
          subtotal,
          shippingFee,
          discount,
          total: amount,
          status: "Accepting"
        };

        await axios.post("/api/orders", payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate("/order-success");
      } catch (err) {
        console.error(t("checkout.orderError"), err);
      }
    }
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

        {qrData && (
            <QrPayment
                isOpen={showQr}
                onClose={() => setShowQr(false)}
                qrUrl={qrData.qrUrl}
                txnRef={qrData.txnRef}
                userId={qrData.userId}
                amount={qrData.amount}
                payload={qrData.payload}
                onConfirm={async (payload) => {
                  const res = await axios.post("/api/orders", payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    withCredentials: true
                  });
                  return res.data;
                }}
            />
        )}
      </div>
  );
};

export default Checkout;
