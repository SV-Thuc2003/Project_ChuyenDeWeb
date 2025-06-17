import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Import page components
import LoginPage from './page/login';
import RegisterPage from "./page/register";
import OAuth2RedirectHandler from './features/auth/login/OAuth2RedirectHandler';
import HomePage from "./page/home";
import Products from "./page/products";
import Forum from "./page/forum";
import Checkout from "./page/checkout";
import CartPage from "./page/cart"
import ProductDetailPage from "./page/productDetail";
import ContactPage from "./page/contact";
import AboutUs from "./page/about";
import ProfilePage from "./page/profile";
import Order from "./page/order";
import FavoriteProductsPage from "./page/favorite/FavoriteProductsPage";
import CartCheckOut from "./page/cart";
import SearchPage  from "./page/SearchPage";
import ForgotPassword from "./features/auth/forgotPassword/ForgotPassword";
import OrderSuccess from "./page/order/OrderSuccess.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:categoryId" element={<Products />} />
            <Route path="/productdetail/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/favorites" element={<FavoriteProductsPage />} />
            <Route path="/cart" element={<CartCheckOut />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all route */}
        </Routes>
    );
};

export default AppRoutes;
