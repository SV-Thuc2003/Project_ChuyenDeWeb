import {memo, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {formatter} from "../../../utils/fomater";
import {ROUTERS} from "../../../utils/router";
import {AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai";
import logo from 'assets/users/images/logo/logo1.png';
import "./header.scss"

const HeaderMain = () => {

    const location = useLocation();
    const [isShowHumberger, setShowHumberger] = useState(false);
    const [isHome, setIsHome] = useState(location.pathname.length <= 1);
    const [isShowCategories, setShowCategories] = useState(isHome);
    // const [isShowCategories, setIsShowCategories] = useState(isHome);
    const [menus, setMenus] = useState([
        {
            name: "Trang chủ",
            path: ROUTERS.USER.HOME,
        },
        {
            name: "Giới thiệu",
            path: ROUTERS.USER.PROFILE,
        },
        {
            name: "Sản phẩm",
            path: "",
            isShowSubmenus: false,
            child: [
                {
                    name: "May Loc A",
                    path: "",
                },
                {
                    name: "May Loc B",
                    path: "",
                },
                {
                    name: "May Loc C",
                    path: "",
                },
            ]
        },
        {
            name: "Dịch vụ",
            path: "",
        },
        {
            name: "Tin tức",
            path: "",
        },
        {
            name: "Liên hệ",
            path: "",
        },
    ]);


    useEffect(() => {
        const isHome = location.pathname.length <= 1;
        setIsHome(isHome);
        setShowCategories(isHome);
    }, [location]);

    return (
        <>
           <div className="header__main">
               <div className="container">
                   <div className="row">
                       <div className="col-xl-3 ">
                           <div className="header__logo">
                               <img src={logo} alt="Logo" />
                               <div className="header__brand">
                                   <h4>Water Purifier shop</h4>
                               </div>
                           </div>

                       </div>
                       <div className="col-xl-6 ">
                           <nav className="header__menu">
                               <ul>
                                   {
                                       menus?.map((menu, menuKey) => (
                                           <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                               <Link to={menu?.path}>{menu?.name}</Link>
                                               {
                                                   menu.child && (
                                                       <ul className="header__menu__dropdown">
                                                           {
                                                               menu.child.map((childItem, childKey) => (
                                                                   <li key={`${menuKey}-${childKey}`}>
                                                                       <Link to={childItem.path}>{childItem.name}</Link>
                                                                   </li>
                                                               ))
                                                           }

                                                       </ul>
                                                   )
                                               }
                                           </li>
                                       ))
                                   }

                               </ul>

                           </nav>


                       </div>
                       <div className="col-lg-3 ">
                           <div className="header__cart">
                               <ul>
                                   <li>
                                       <Link to={ ROUTERS.USER.SHOPPING_CART}>
                                           <AiOutlineShoppingCart/> <span>5</span>

                                       </Link>
                                   </li>
                               </ul>
                           </div>
                           {/*<div className="humberger__open">*/}
                           {/*    <AiOutlineMenu*/}
                           {/*        onClick={() => setShowHumberger(true)}*/}
                           {/*    />*/}
                           {/*</div>*/}
                       </div>
                   </div>
               </div>
           </div>
        </>
    );
};

export default memo(HeaderMain);
