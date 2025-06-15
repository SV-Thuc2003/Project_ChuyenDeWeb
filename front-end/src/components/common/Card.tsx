import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

interface CardProps {
    id?: number;
    image?: string;
    title?: string;
    price?: string;
    onAddToWishlist?: (id?: number) => void;
    className?: string;
}

const Card: React.FC<CardProps> = ({
                                       id,
                                       image,
                                       title,
                                       price,
                                       onAddToWishlist = () => {},
                                       className = '',
                                   }) => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();
    const { token } = useAuth();
    const userId = localStorage.getItem("userId");

    const handleCardClick = () => {
        if (id !== undefined) {
            navigate(`/productdetail/${id}`);
        }
    };

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToWishlist(id);
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!token || !userId) {
            navigate("/login");
            return;
        }

        try {
            await addToCart(id!, 1); // ✅ gọi context
        } catch {
            alert("Lỗi khi thêm vào giỏ hàng");
        }

    };

    const itemInCart = cartItems.find((item) => item.productId === id);
    const quantityInCart = itemInCart?.quantity || 0;

    return (
        <div
            onClick={handleCardClick}
            className={`border border-[#e0e0e0] rounded-[20px] overflow-hidden cursor-pointer transition hover:shadow-md ${className}`}
        >
            <div className="w-full h-[360px] relative overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />

                {quantityInCart > 0 && (
                    <div className="absolute top-2 left-2 bg-[#5290f3] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {quantityInCart} trong giỏ
                    </div>
                )}
            </div>

            <div className="p-5 relative">
                <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
                <p className="text-base text-black">{price}</p>

                <div className="absolute right-5 top-5 flex flex-col space-y-2">
                    <button
                        onClick={handleWishlistClick}
                        className="bg-[#f8f9fa] w-8 h-8 rounded-full flex items-center justify-center"
                        title="Yêu thích"
                    >
                        <CiHeart className="w-[24px] h-[24px]" />
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="bg-[#f8f9fa] w-8 h-8 rounded-full flex items-center justify-center"
                        title="Thêm vào giỏ"
                    >
                        <CiShoppingCart className="w-[24px] h-[24px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
