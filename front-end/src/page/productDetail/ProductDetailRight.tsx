import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductDetail } from "../../types/ProductDetail";
import { useCart } from "../../contexts/CartContext"; // ✅


interface ProductDetailProps {
    product: ProductDetail;
}

const ProductDetailRight: React.FC<ProductDetailProps> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const { token } = useAuth();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const isLoggedIn = !!token && !!userId;

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const { refreshCart } = useCart(); // ✅

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        axios
            .post(
                `/api/cart/${userId}/add`,
                {
                    productId: product.id,
                    quantity: quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                refreshCart(); // ✅ thay vì fetchCartCount
                alert("Đã thêm vào giỏ hàng!");
            })
            .catch((err) => {
                console.error("Lỗi khi thêm vào giỏ hàng:", err);
                alert("Không thể thêm sản phẩm vào giỏ hàng.");
            });
    };


    return (
        <div className="flex-[2] flex flex-col p-6 bg-white">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center text-yellow-500 text-sm mb-2">
                ★★★★★
                <span className="text-black ml-2 text-sm">
          (0 đánh giá, trung bình 0.0 sao)
        </span>
            </div>

            <div className="text-red-600 text-3xl font-extrabold mb-4">
                {product.price !== undefined
                    ? product.price.toLocaleString("vi-VN") + " ₫"
                    : "Giá không rõ"}
            </div>

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

            <div className="flex gap-4 mb-6">
                <Button variant="primary" className="px-6 py-3" onClick={handleAddToCart}>
                    THÊM VÀO GIỎ HÀNG
                </Button>
                <Button variant="primary" className="px-6 py-3">
                    MUA NGAY
                </Button>
            </div>

            <div className="text-sm text-gray-800 space-y-2">
                <p>
                    <span className="font-semibold">Thương hiệu:</span>{" "}
                    {product.brand || "Đang cập nhật"}
                </p>
                <p>
                    <span className="font-semibold">Tình trạng:</span> Còn hàng
                </p>
                {/*<p>*/}
                {/*    <span className="font-semibold">Danh mục:</span>{" "}*/}
                {/*    {product.category || "Lọc điện giải ion kiềm"}*/}
                {/*</p>*/}
            </div>
        </div>
    );
};

export default ProductDetailRight;
