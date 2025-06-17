import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

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
import FavoriteList from "./page/favorite/FavoriteProductsPage";
import CartCheckOut from "./page/cart";
import SearchPage  from "./page/SearchPage";
import ForgotPassword from "./features/auth/forgotPassword/ForgotPassword";


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                {/* <Route path="/category/:slug" element={<Products />} /> */}
                <Route path="/category/:categoryId" element={<Products />} />
                <Route path="/productdetail/:id" element={<ProductDetailPage />} />

                {/* <Route path="/productdetail" element={<ProductDetailPage />} />
                <Route path="/productdetail/:id" element={<ProductDetailPage />} /> */}

                <Route path="/search" element={<SearchPage />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cartpage" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/favorites" element={<FavoriteList userId={parseInt(localStorage.getItem('userId') || '0')} />} />
                <Route path="/cartcheckout" element={<CartCheckOut />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/" element={<Navigate to="/login" replace />} /> {/* Default redirect */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
// import { Routes, Route } from "react-router-dom";
// import { ROUTERS } from "./utils/router";
// import LoginForm from "./page/login/LoginForm.tsx";
// import MasterLayout from "./layout/MasterLayout"; // Đảm bảo import MasterLayout
//
// const renderUserRouter = () => {
//     const userRouters = [
//         {
//             path: ROUTERS.USER.LOGIN,
//             component: <LoginForm />,
//         },
//     ];
//
//     return (
//         <MasterLayout>
//             <Routes>
//                 {userRouters.map((item, key) => (
//                     <Route key={key} path={item.path} element={item.component} />
//                 ))}
//             </Routes>
//         </MasterLayout>
//     );
// };
//
// const RouterCustom: React.FC = () => {
//     return renderUserRouter();
// };
//
// export default RouterCustom;
