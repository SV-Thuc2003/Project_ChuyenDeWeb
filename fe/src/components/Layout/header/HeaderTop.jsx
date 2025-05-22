import {memo, useEffect, useState} from "react"
import {Link, useLocation} from "react-router-dom";
import {formatter} from "../../../utils/fomater";
import {ROUTERS} from "../../../utils/router";
import {AiOutlineEnvironment, AiOutlineFacebook, AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai";
import {CgMail} from "react-icons/cg";
import {CiInstagram, CiLinkedin, CiTwitter, CiUser} from "react-icons/ci";
import "./header.scss"
const HeaderTop = () => {

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

    return (
        <>
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
                                    <Link to={ROUTERS.USER.LOGIN}>
                                        <CiUser/>
                                        <span>Đăng nhập</span>
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

export default memo( HeaderTop );
