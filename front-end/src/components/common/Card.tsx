import React from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

interface CardProps {
    id?: number;
    image?: string;
    title?: string;
    price?: number;
    onAddToWishlist?: (id?: number) => void;
    isFavorite?: boolean;
    onFavoriteToggle?: (id: number) => void;
    className?: string;
}

const Card: React.FC<CardProps> = ({
                                       id,
                                       image,
                                       title,
                                       price,
                                       onAddToWishlist = () => {},
                                       isFavorite = false,
                                       onFavoriteToggle,
                                       className = "",
                                   }) => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();
    const { token } = useAuth();
    const { t } = useTranslation();
    const userId = localStorage.getItem("userId");

    const handleCardClick = () => {
        if (id !== undefined) {
            navigate(`/productdetail/${id}`);
        }
    };

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (onFavoriteToggle && id !== undefined) {
            onFavoriteToggle(id);
        } else {
            onAddToWishlist(id);
        }
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!token || !userId) {
            navigate("/login");
            return;
        }

        try {
            await addToCart(id!, 1);
        } catch {
            alert(t("cart.add_error"));
        }
    };

    const itemInCart = cartItems.find((item) => item.productId === id);
    const quantityInCart = itemInCart?.quantity || 0;

    return (
        <div
            onClick={handleCardClick}
            className={`group border border-[#e0e0e0] rounded-[20px] overflow-hidden cursor-pointer transition hover:shadow-md relative ${className}`}
        >
            <div className="w-full h-[360px] relative overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />

                {quantityInCart > 0 && (
                    <div className="absolute top-2 left-2 bg-[#5290f3] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {quantityInCart} {t("cart.in_cart")}
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
                <p className="text-base text-black">{price}</p>
            </div>

            <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleWishlistClick}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-gray-100 
              ${isFavorite ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-600"}`}
                    title={t("product.favorite")}
                >
                    <CiHeart className="w-[24px] h-[24px]" />
                </button>

                <button
                    onClick={handleAddToCart}
                    className="bg-[#f8f9fa] w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-gray-100"
                    title={t("product.add_to_cart")}
                >
                    <CiShoppingCart className="w-[24px] h-[24px]" />
                </button>
            </div>
        </div>
    );
};

export default Card;
