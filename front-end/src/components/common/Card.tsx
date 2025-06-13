import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";

interface CardProps {
    id?: number;
    image?: string;
    title?: string;
    price?: string;
    onAddToWishlist?: (id?: number) => void;
    isFavorite?: boolean;
    onFavoriteToggle?: (id: number) => void;
    className?: string;
}

const Card: React.FC<CardProps> = ({   id,
                                       image,
                                       title,
                                       price,
                                       onAddToWishlist = () => {},
                                    //    isFavorite = false,
                                       className = '',
                                   }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        if (id !== undefined) {
            navigate(`/productdetail/${id}`);
        }
    };

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // ⛔ Chặn sự kiện click lan ra ngoài
        onAddToWishlist(id);
    };

    return (
        <div 
            onClick={handleCardClick}
            className={`border border-[#e0e0e0] rounded-[20px] overflow-hidden cursor-pointer transition hover:shadow-md ${className}`}>
            <div className="w-full h-[360px] overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 relative">
                <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
                <p className="text-base text-black">{price}</p>
                <button
                    onClick={handleWishlistClick}
                    className="absolute right-5 top-5 bg-[#f8f9fa] w-7 h-7 rounded-full flex items-center justify-center"
                >
                    <CiHeart className="w-[30px] h-[32px]" />
                </button>
            </div>
        </div>
    );
};

export default Card;