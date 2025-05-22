import { memo } from "react";

const HeaderCart = () => {
    return (
        <div className="flex items-center gap-3 ml-4 text-gray-700 text-lg">
            <div className="relative">
                <i className="far fa-heart"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
            </div>
            <div className="relative">
                <i className="fas fa-shopping-bag"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
            </div>
            <img
                src="https://via.placeholder.com/30"
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover"
            />
        </div>
    );
};

export default memo(HeaderCart);
