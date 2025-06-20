import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputField from "../../ui/InputField";
import Dropdown from "../../ui/Dropdown";
import logo from "../../../assets/logo.png";
import { HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import {
  CiLocationOn,
  CiHeart,
  CiShoppingCart,
  CiMicrophoneOn,
} from "react-icons/ci";
import { IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useCart } from "../../../contexts/CartContext";
import { useFavorites } from "../../../hooks/useFavorite";
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const currentPath = location.pathname;

  const [searchTerm, setSearchTerm] = React.useState("");
  const { favoriteProductIds = [] } = useFavorites();
  const [isListening, setIsListening] = React.useState(false);

  const handleVoiceSearchStart = () => {
    const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
      recognition.stop();
      navigate(`/search?keyword=${encodeURIComponent(transcript)}`);
    };

    recognition.onerror = (event: any) => {
      alert("Lỗi: " + event.error);
      setIsListening(false);
      recognition.stop();
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

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
    { path: "/", label: t("nav.home") },
    { path: "/products", label: t("nav.products") },
    { path: "/about", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/newarticles", label: t("nav.news") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
      <header className="bg-white">
        <div className="bg-[#f8f9fa] py-6">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <HiOutlinePhone className="w-6 h-6" />
                <span className="ml-2 text-base font-medium">{t("contact.phone")}: +379 871-8371</span>
              </div>
              <div className="flex items-center ml-6">
                <MdOutlineEmail className="w-6 h-6" />
                <span className="ml-2 text-base font-medium">{t("contact.email")}: nhom@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CiLocationOn className="w-6 h-6" />
                <span className="ml-2 text-base font-medium">{t("location")}</span>
              </div>
              <select
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="text-sm border px-2 py-1 rounded bg-white"
              >
                <option value="vi">{t("language.vi")}</option>
                <option value="en">{t("language.en")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 flex justify-between items-center shadow-md rounded-[40px] bg-white">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-[72px] h-[58px]" />
            <span className="ml-2 text-xl font-bold">Water Purifier Shop</span>
          </div>

          <nav className="flex items-center space-x-8 mt-1">
            {navLinks.map(({ path, label }) => (
                <Link
                    key={path}
                    to={path}
                    className={`text-xl font-semibold pb-1 ${
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
                        { value: "profile", label: t("account.update") },
                        { value: "logout", label: t("account.logout") },
                      ]}
                      onChange={handleDropdownChange}
                      icon={<FaUserCircle className="text-[#5290f3] w-6 h-6 cursor-pointer" title="Tài khoản" />}
                      placeholder={username}
                  />
              ) : (
                  <button
                      onClick={() => navigate("/login")}
                      className="text-xl font-medium text-black hover:text-[#5290f3] cursor-pointer"
                  >
                    {t("account.login")}
                  </button>
              )}
            </div>

            <div className="relative">
              <InputField
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder={t("search.placeholder")}
                  className="bg-[#f8f9fa] rounded-[20px] w-[280px] h-10 pl-4 pr-1"
              />
              <div
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleVoiceSearchStart}
                  title={isListening ? "Đang nghe..." : t("search.voice")}
              >
                <CiMicrophoneOn className={`w-6 h-6 ${isListening ? "text-red-500 animate-pulse" : "text-[#5290f3]"}`} />
              </div>
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
                title={t("favorites.title")}
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
