import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputField from "../../ui/InputField";
import Dropdown from "../../ui/Dropdown";
import logo from "../../../assets/logo.png";
import { HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn, CiHeart, CiShoppingCart } from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useCart } from "../../../contexts/CartContext";
import { useFavorites } from "../../../hooks/useFavorite"; 

const Header: React.FC = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const currentPath = location.pathname;

  const [searchTerm, setSearchTerm] = React.useState("");
  const { favoriteProductIds = [] } = useFavorites();
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  const handleDropdownChange = (value: string) => {
    if (value === "logout") {
      logout();
      navigate("/");
    } else if (value === "profile") {
      navigate("/profile");
    }
  };

  const navLinks = [
    { path: "/", label: "Trang chủ" },
    { path: "/products", label: "Sản phẩm" },
    { path: "/forum", label: "Giới Thiệu" },
    { path: "/posts", label: "Dịch vụ" },
    { path: "/about", label: "Tin tức" },
    { path: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="bg-white">
      <div className="bg-[#f8f9fa] py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <HiOutlinePhone className="w-6 h-6" />
              <span className="ml-2 text-base font-medium">+379 871-8371</span>
            </div>
            <div className="flex items-center ml-6">
              <MdOutlineEmail className="w-6 h-6" />
              <span className="ml-2 text-base font-medium">nhom@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center">
            <CiLocationOn className="w-6 h-6" />
            <span className="ml-2 text-base font-medium">
              Thủ Đức, Hồ Chí Minh
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex justify-between items-center shadow-md rounded-[40px] bg-white">
        <div className="flex items-center">
          <img
            src={logo}
            alt="NLU Pet Shop Logo"
            className="w-[72px] h-[58px]"
          />
          <span className="ml-2 text-xl font-bold">Water Purifier Shop</span>
        </div>

        <nav className="flex items-center space-x-8 mt-1">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-xl font-semibold   pb-1 ${
                currentPath === path
                  ? "text-[#5290f3] border-b-2 border-[#2d77ee]"
                  : "text-black hover:text-[#5290f3]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div>
            {username ? (
              <Dropdown
                options={[
                  { value: "profile", label: "Thay đổi thông tin" },
                  { value: "logout", label: "Đăng xuất" },
                ]}
                onChange={handleDropdownChange}
                icon={
                  <FaUserCircle
                    className="text-[#5290f3] w-6 h-6 cursor-pointer"
                    title="Tài khoản"
                  />
                }
                placeholder={username}
              />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-xl font-medium text-black hover:text-[#5290f3] cursor-pointer"
              >
                Đăng nhập
              </button>
            )}
          </div>

          <div className="relative">
            <InputField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Tìm kiếm sản phẩm..."
              className="bg-[#f8f9fa] rounded-[20px] w-[280px] h-10 pl-4 pr-1"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSearch}
            >
              <IoSearchCircle className="w-7 h-7 rounded-full text-[#5290f3]" />
            </div>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/favorites")}
            title="Sản phẩm yêu thích"
          >
            <CiHeart className="w-7 h-7" />
            <div className="absolute -top-2 -right-2 bg-[#5290f3] text-white text-[10px] w-3 h-3 rounded-full flex items-center justify-center">
              {favoriteProductIds.length}
            </div>
          </div>

          <div
            className="relative ml-4 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <CiShoppingCart className="w-7 h-7" />
            <div className="absolute -top-2 -right-2 bg-[#5290f3] text-white text-[10px] w-3 h-3 rounded-full flex items-center justify-center">
              {cartCount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
