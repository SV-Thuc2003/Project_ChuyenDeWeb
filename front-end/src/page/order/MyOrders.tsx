import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface ProductItem {
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
}

interface OrderResponse {
  id: number;
  totalInvoice: number;
  shippingFee: number;
  status: string;
  createdAt: string;
  products: ProductItem[];
}

const MyOrders: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [filter, setFilter] = useState<string>("Tất cả");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    axios.get(`/api/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("❌ Error loading orders:", err));
  }, []);

  const filteredOrders =
      filter === "Tất cả" ? orders : orders.filter((o) => o.status === filter);

  const statusLabels: { [key: string]: string } = {
    "Tất cả": t("order.all"),
    "Pending": t("order.pending"),
    "Paid": t("order.paid"),
    "Accepting": t("order.accepting"),
    "Shipped": t("order.shipped"),
    "Completed": t("order.completed"),
    "Cancelled": t("order.cancelled"),
  };

  return (
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-2 text-sm font-medium text-gray-600">
              {Object.keys(statusLabels).map((status) => (
                  <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-2 pb-2 border-b-2 ${
                          filter === status ? "border-orange-500 text-black" : "border-transparent"
                      }`}
                  >
                    {statusLabels[status]}
                  </button>
              ))}
            </div>
          </div>

          {/* Search (placeholder only) */}
          <div className="mb-4">
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                placeholder={t("order.searchPlaceholder")}
            />
          </div>

          {/* Orders */}
          {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-300 rounded overflow-hidden mb-6">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <span>{t("order.code")}: #{order.id}</span> |{" "}
                  <span>{t("order.date")}: {new Date(order.createdAt).toLocaleDateString(i18n.language)}</span> |{" "}
                  <span>{t("order.status")}: {statusLabels[order.status]}</span>
                </div>

                {order.products.map((product, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col md:flex-row items-center justify-between gap-4 p-4"
                    >
                      <div className="flex items-center gap-4 w-full">
                        <img
                            src={product.imageUrl || "/images/sample-product.png"}
                            alt={product.name}
                            className="w-[80px] h-[80px] object-cover border border-gray-200"
                        />
                        <div>
                          <h3 className="font-semibold text-sm text-gray-800">{product.name}</h3>
                          <p className="text-xs text-gray-500">x{product.quantity}</p>
                          <p className="text-xs text-gray-500">
                            {t("order.price")}: {product.price.toLocaleString()} ₫
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                        {["Completed", "Cancelled"].includes(order.status) && (
                            <button className="text-sm px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                              {t("order.buyAgain")}
                            </button>
                        )}
                        {order.status === "Completed" && (
                            <button className="text-sm px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-100">
                              {t("order.review")}
                            </button>
                        )}
                      </div>
                    </div>
                ))}

                <div className="flex justify-end px-4 py-2 border-t border-gray-200 text-sm font-semibold text-gray-800">
                  {t("order.total_pay")}: {(order.totalInvoice + order.shippingFee).toLocaleString()} ₫ ({t("order.includeShipping", { fee: order.shippingFee.toLocaleString() })})
                </div>
              </div>
          ))}

          {filteredOrders.length === 0 && (
              <p className="text-center text-gray-500">{t("order.noMatch")}</p>
          )}
        </div>
      </div>
  );
};

export default MyOrders;
