import React, { useEffect, useState } from "react";
import axios from "axios";

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
        .catch((err) => console.error("❌ Lỗi tải đơn hàng:", err));
  }, []);

  const filteredOrders =
      filter === "Tất cả" ? orders : orders.filter((o) => o.status === filter);

  return (
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Bộ lọc trạng thái đơn hàng */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-2 text-sm font-medium text-gray-600">
              {[
                "Tất cả",
                "Pending",
                "Paid",
                "Accepting",
                "Shipped",
                "Completed",
                "Cancelled",
              ].map((status, idx) => (
                  <button
                      key={idx}
                      onClick={() => setFilter(status)}
                      className={`px-2 pb-2 border-b-2 ${
                          filter === status
                              ? "border-orange-500 text-black"
                              : "border-transparent"
                      }`}
                  >
                    {status === "Pending"
                        ? "Chờ thanh toán"
                        : status === "Paid"
                            ? "Đã thanh toán"
                            : status === "Accepting"
                                ? "Chờ xác nhận"
                                : status === "Shipped"
                                    ? "Đang giao"
                                    : status === "Completed"
                                        ? "Hoàn thành"
                                        : status === "Cancelled"
                                            ? "Đã hủy"
                                            : status}
                  </button>
              ))}
            </div>
          </div>

          {/* Thanh tìm kiếm đơn hàng */}
          <div className="mb-4">
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
                placeholder="Bạn có thể tìm kiếm theo ID đơn hàng và tên món hàng"
            />
          </div>

          {/* Danh sách đơn hàng */}
          {filteredOrders.map((order) => (
              <div
                  key={order.id}
                  className="border border-gray-300 rounded overflow-hidden mb-6"
              >
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <span>Mã đơn: #{order.id}</span> | <span>Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}</span> | <span>Trạng thái: {order.status}</span>
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
                          <p className="text-xs text-gray-500">Giá: {product.price.toLocaleString()} ₫</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                        {(order.status === "Completed" || order.status === "Cancelled") && (
                            <button className="text-sm px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                              Mua lại
                            </button>
                        )}
                        {order.status === "Completed" && (
                            <button className="text-sm px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-100">
                              Đánh giá
                            </button>
                        )}
                      </div>
                    </div>
                ))}

                <div className="flex justify-end px-4 py-2 border-t border-gray-200 text-sm font-semibold text-gray-800">
                  Tổng thanh toán: {(order.totalInvoice + order.shippingFee).toLocaleString()} ₫ (đã gồm {order.shippingFee.toLocaleString()} ₫ phí vận chuyển)
                </div>
              </div>
          ))}

          {filteredOrders.length === 0 && (
              <p className="text-center text-gray-500">
                Không có đơn hàng nào phù hợp.
              </p>
          )}
        </div>
      </div>
  );
};

export default MyOrders;
