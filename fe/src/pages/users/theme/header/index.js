import {memo, useEffect, useState} from "react"
import "./style.scss"
import {Link, useLocation} from 'react-router-dom';
import {CiInstagram, CiLinkedin, CiTwitter, CiUser} from "react-icons/ci";
import {CgMail} from "react-icons/cg";
import {BiUser} from "react-icons/bi"
import {
    AiOutlineDownCircle,
    AiOutlineEnvironment,
    AiOutlineFacebook,
    AiOutlineMenu,
    AiOutlinePhone,
    AiOutlineShoppingCart,
    AiOutlineUpCircle
} from "react-icons/ai";
import {formatter} from "../../../../utils/fomater";
import {ROUTERS} from "../../../../utils/router";

export const categories = [
    "Máy lọc nước",
    "Máy lọc nước điện giải",
    "Máy lọc nước RO Hydrogen",
    "Lõi máy lọc nước",
    "Lọc nước không điện"
];
const Header = () => {
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
            name: "Cửa hàng",
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
            name: "Bài viết",
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
            <div className={`humberger__menu__overlay ${isShowHumberger ? "active" : ""}`}
                 onClick={() => setShowHumberger(false)}
            />

            {/*</div>*/}
            <div className={`humberger__menu__wrapper ${isShowHumberger ? "show" : ""}`}>
                <div className="header__logo">
                    <h1>Water Purifier shop</h1>
                    {/*<img src="assets/users/images/logo/logo1.png" alt=""/>*/}
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li>
                            <Link to={""}>
                                <AiOutlineShoppingCart/> <span>1</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="header__cart__price">
                        Giỏ hàng: <span>{formatter(10020)}</span>
                    </div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__auth">
                        <Link to={""}>
                            <BiUser/> Đăng nhập
                        </Link>
                    </div>
                </div>
                <div className="humberger__menu__nav">
                    <ul>
                        {menus.map((menu, menuKey) => (
                            // to={menu.path}
                            <li key={menuKey}>
                                <Link to={menu.path} onClick={() => {
                                    const newMenus = [...menus];
                                    newMenus[menuKey].isShowSubmenus = !newMenus[menuKey].isShowSubmenus;
                                    setMenus((newMenus));
                                }}>
                                    {menu.name}
                                    {menu.child &&
                                        (menu.isShowSubmenus ? (
                                            <AiOutlineDownCircle/>
                                        ) : (
                                            <AiOutlineUpCircle/>
                                        ))}
                                </Link>
                                {menu.child && (
                                    <ul
                                        className={`header__menu__dropdown ${
                                            menu.isShowSubmenus ? "show__submenu" : ""}`}>
                                        {menu.child.map((childItem, childKey) => (
                                            <li key={`${menuKey}-${childKey}`}>
                                                <Link to={childItem.path}>
                                                    {childItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="header__top__right__social">
                    <Link to={""}>
                        <AiOutlineFacebook/>
                    </Link>

                    <Link to={""}>
                        <CiInstagram/>
                    </Link>

                    <Link to={""}>
                        <CiLinkedin/>
                    </Link>


                    <Link to={""}>
                        <CiTwitter/>
                    </Link>

                </div>
                <div className="humberger__menu__contact">
                    <ul>
                        <li>
                            <CgMail/> maylocnuoc@gmail.com
                        </li>
                        <li>
                            <AiOutlineEnvironment/> Hồ Chí Minh
                        </li>
                    </ul>
                </div>
            </div>


            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header__top_left">
                            <ul>
                                <li>
                                    <AiOutlineEnvironment/>
                                    Hồ Chí Minh
                                </li>
                                <li>
                                    <CgMail/>
                                    maylocnuoc@gmail.com
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 header__top_right">
                            <ul>
                                <li>
                                    <Link to={""}>
                                        <AiOutlineFacebook/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiInstagram/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiLinkedin/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiTwitter/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiUser/>
                                    </Link>
                                    <span>Đăng nhập</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 ">
                        <div className="header__logo">
                            <h1>Water Purifier shop</h1>
                            {/*<img src="assets/users/images/logo/logo1.png" />*/}
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
                            <div className="header__cart__price">
                                <span>{formatter(1234555)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to={ ROUTERS.USER.SHOPPING_CART}>
                                        <AiOutlineShoppingCart/> <span>5</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="humberger__open">
                            <AiOutlineMenu
                                onClick={() => setShowHumberger(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero__categories_container">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 hero__categories">
                        <div className="hero__categories__all" onClick={() => setShowCategories(!isShowCategories)}>
                            <AiOutlineMenu/>
                            Danh sách sản phẩm
                        </div>
                        <ul className={isShowCategories ? "" : "hidden"}>
                            {
                                categories.map((category, key) => (
                                    <li key={key}>
                                        <Link to={ROUTERS.USER.PRODUCTS}>{category}</Link>
                                    </li>

                                ))}
                        </ul>

                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 hero__search_container">
                        <div className="hero__search">
                            <div className="hero__search__form">
                                <form>
                                    <input type="text" placeholder="Bạn đang tìm gì?"/>
                                    <button type="submit">Tìm Kiếm</button>
                                </form>
                            </div>
                            <div className="hero__search__phone">
                                <div className="hero__search__phone__icon">
                                    <AiOutlinePhone/>
                                </div>
                                <div className="hero__search__phone__text">
                                    <p>0653-112-332</p>
                                    <span>Hỗ trợ 24/7</span>
                                </div>

                            </div>
                        </div>
                        {
                            isHome && (
                                <div className="hero__item">
                                    <div className="hero__text">
                                        <span>Máy lọc nước</span>
                                        <h2>
                                            Diệt vi khuẩn <br/>
                                            Sạch 100%
                                        </h2>
                                        <p>Miễn phí giao hàng tận nơi</p>
                                        <Link to="" className="primary-btn">
                                            Mua ngay
                                        </Link>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(Header);