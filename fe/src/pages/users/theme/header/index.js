import {memo, useState} from "react"
import "./style.scss"
import { Link } from 'react-router-dom';
import { CiInstagram, CiLinkedin,CiTwitter,CiUser } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import { AiOutlineEnvironment, AiOutlineFacebook, AiOutlineShoppingCart } from "react-icons/ai";
import {formatter} from "../../../../utils/fomater";
import {ROUTERS} from "../../../../utils/router";
const Header = () => {

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
            isShowSubmenus:false,
            child:[
                {
                    name:"May Loc A",
                    path:"",
                },
                {
                    name:"May Loc B",
                    path:"",
                },
                {
                    name:"May Loc C",
                    path:"",
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

    return(
        <>
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header__top_left">
                            <ul>
                                <li>
                                    <AiOutlineEnvironment />
                                    Hồ Chí Minh
                                </li>
                                <li>
                                    <CgMail />
                                    maylocnuoc@gmail.com
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 header__top_right">
                            <ul>
                                <li>
                                    <Link to={""}>
                                        <AiOutlineFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiLinkedin />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiTwitter />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={""}>
                                        <CiUser />
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
                        </div>
                    </div>
                    <div className="col-xl-6 ">

                        <nav className="header__menu">
                            <ul>
                                {
                                    menus?.map((menu, menuKey) =>(
                                        <li key={menuKey} className={menuKey === 0 ?"active" :""}>
                                            <Link to={menu?.path}>{menu?.name}</Link>
                                            {
                                                menu.child && (
                                                    <ul className="header__menu__dropdown">
                                                        {
                                                            menu.child.map((childItem, childKey) =>(
                                                                <li key={`${menuKey}-${childKey}`}>
                                                                    <Link to={childItem.paht}>{childItem.name}</Link>
                                                                </li>
                                                            ))
                                                        }

                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                                {/*<li>*/}

                                {/*    <ul>*/}
                                {/*        <li>Máy Lọc A</li>*/}
                                {/*        <li>Máy Lọc B</li>*/}
                                {/*        <li>Máy Lọc C</li>*/}
                                {/*    </ul>*/}
                                {/*</li>*/}
                            </ul>

                        </nav>



                    </div>
                    <div className="col-xl-3 ">
                        <div className="header__cart">
                            <div className="header__cart__price">
                                <span>{formatter(1234555)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="#">
                                        <AiOutlineShoppingCart /> <span>5</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(Header);