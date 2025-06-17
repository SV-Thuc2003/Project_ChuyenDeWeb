import React from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
// import { useFavorite } from '../../hooks/useFavorite';

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

  const handleCardClick = () => {
    if (id !== undefined) {
      navigate(`/productdetail/${id}`);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Nếu có prop `onFavoriteToggle` thì gọi nó
    if (onFavoriteToggle && id !== undefined) {
      onFavoriteToggle(id);
    } else {
      // fallback gọi hàm cũ nếu chưa cập nhật hook
      onAddToWishlist(id);
    }
  };
  return (
    <div
      onClick={handleCardClick}
      className={`border border-[#e0e0e0] rounded-[20px] overflow-hidden cursor-pointer transition hover:shadow-md ${className}`}
    >
      <div className="w-full h-[360px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 relative">
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-base text-black">{price}</p>
        <button
          onClick={handleWishlistClick}
          className={`absolute right-5 top-5 w-8 h-8 rounded-full flex items-center justify-center ${
            isFavorite ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-600"
          }`}
        >
          <CiHeart className="w-[30px] h-[32px]" />
        </button>
      </div>
    </div>
  );
};
export default Card;

// import React, { MouseEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
// import { useFavorite } from '../../hooks/useFavorite';

// interface CardProps {
//   /** ID sản phẩm – bắt buộc để hook hoạt động */
//   id: number;
//   image: string;
//   title: string;
//   price: string;
//   /** ID user (lấy từ context / redux / localStorage) */
//   userId: number;
//   /** Tailwind class bổ sung tuỳ biến */
//   className?: string;
// }

// const Card: React.FC<CardProps> = ({
//   id,
//   image,
//   title,
//   price,
//   userId,
//   className = '',
// }) => {
//   const navigate = useNavigate();

//   /* ──────────────── HOOK YÊU THÍCH ──────────────── */
//   const { isFavorite, toggleFavorite } = useFavorite(id, userId);

//   /* ──────────────── HANDLERS ──────────────── */
//   const handleCardClick = () => navigate(`/productdetail/${id}`);

//   const handleHeartClick = async (e: MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();           // không trigger click card
//     await toggleFavorite();        // gọi BE + đổi màu
//   };

//   /* ──────────────── RENDER ──────────────── */
//   return (
//     <div
//       onClick={handleCardClick}
//       className={`border border-[#e0e0e0] rounded-[20px] overflow-hidden cursor-pointer transition hover:shadow-md ${className}`}
//     >
//       {/* Ảnh */}
//       <div className="w-full h-[360px] overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover hover:scale-105 transition-transform"
//         />
//       </div>

//       {/* Thông tin + nút yêu thích */}
//       <div className="p-5 relative">
//         <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2">
//           {title}
//         </h3>
//         <p className="text-base text-black font-medium">{price}</p>

//         {/* Icon trái tim */}
//         <button
//           onClick={handleHeartClick}
//           aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
//           className={`absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center transition
//             ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-200 text-gray-600'}
//           `}
//         >
//           {isFavorite ? (
//             <AiFillHeart className="w-6 h-6" />
//           ) : (
//             <AiOutlineHeart className="w-6 h-6" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;
