import { Routes, Route } from "react-router-dom";
import {ROUTERS} from "./utils/router";
import Homepage from "./pages/users/homepage";
// import MasterLayout from "./pages/users/theme/mastertLayout";
import ProfilePage from "./pages/users/profilePage";
import ProductsPage from "./pages/users/productsPage";
import ProductDetailPage from "./pages/users/productDetailPage";
import ShoppingCartPage from "./pages/users/shoppingCartPage";
import CheckoutPage from "./pages/users/checkoutPage";
import UserLoginPage from "./pages/users/auth/UserLoginPage";
import UserRegisterPage from "./pages/users/auth/UserRegisterPage";
import MasterLayout from "./components/Layout/masterLayout";
import OtpVerification from "./features/auth/OtpVerification";
import OAuth2RedirectHandler from "./features/auth/OAuth2RedirectHandler";


const renderUserRouter =() =>{
    const userRouters =[
        {
            path: ROUTERS.USER.HOME,
            component: <Homepage/>,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage/>
        },
        {
            path: ROUTERS.USER.PRODUCTS,
            component: <ProductsPage/>
        },
        {
            path: ROUTERS.USER.PRODUCT,
            component: <ProductDetailPage/>
        },
        {
            path: ROUTERS.USER.SHOPPING_CART,
            component: <ShoppingCartPage/>
        },
        {
            path: ROUTERS.USER.CHECKOUT,
            component: <CheckoutPage/>
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <UserLoginPage/>
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <UserRegisterPage/>
        },
        {
            path: ROUTERS.USER.VERITY,
            component: <OtpVerification/>
        },
        {
            path: '/oauth2/redirect',
            element: <OAuth2RedirectHandler />,
        },


    ];
    return(
        <MasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) =>(
                        <Route key={key} path={item.path} element ={item.component}/>
                    ))}
            </Routes>
        </MasterLayout>
    );
};
const RouterCustom = () =>{
    return renderUserRouter();
};
export default RouterCustom;