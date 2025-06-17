import React, { useState } from "react";
import Button from "../../components/ui/Button"; // Đường dẫn cần đúng với vị trí Button của bạn
import { ProductDetail } from "../../types/ProductDetail";

interface ProductDetailProps {
  product: ProductDetail;
  // product: {
  //   name: string;
  //   price?: number;
  //   brand?: string | null;
  //   feature?: string;
  //   category?: string;
  // };
}

const ProductDetailRight: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex-[2] flex flex-col p-6 bg-white">
      {/* Tên sản phẩm */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

      {/* Đánh giá */}
      <div className="flex items-center text-yellow-500 text-sm mb-2">
        ★★★★★
        <span className="text-black ml-2 text-sm">
          (0 đánh giá, trung bình 0.0 sao)
        </span>
      </div>

      {/* Giá */}
      <div className="text-red-600 text-3xl font-extrabold mb-4">
        {product.price !== undefined
          ? product.price.toLocaleString("vi-VN") + " ₫"
          : "Giá không rõ"}
      </div>

      {/* Số lượng */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold">Số lượng:</span>
        <div className="flex items-center border rounded-lg w-fit">
          <button
            className="px-3 py-1 text-xl"
            onClick={decreaseQuantity}
            aria-label="Giảm số lượng"
          >
            -
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            className="px-3 py-1 text-xl"
            onClick={increaseQuantity}
            aria-label="Tăng số lượng"
          >
            +
          </button>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex gap-4 mb-6">
        <Button variant="primary" className="px-6 py-3">
          THÊM VÀO GIỎ HÀNG
        </Button>
        <Button
          variant="primary"
          className="px-6 py-3"
        >
            MUA NGAY
        </Button>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="text-sm text-gray-800 space-y-2">
        <p>
          <span className="font-semibold">Thương hiệu:</span>{" "}
          {product.brand || "Đang cập nhật"}
        </p>
        <p>
          <span className="font-semibold">Tình trạng:</span> Còn hàng
        </p>
        <p>
          <span className="font-semibold">Danh mục:</span>{" "}
          {product.categories?.[0] || "Đang cập nhật"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailRight;
