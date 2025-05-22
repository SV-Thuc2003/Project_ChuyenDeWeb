import {memo, useState} from "react";
import {AiOutlineMenu, AiOutlinePhone} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import {ROUTERS} from "../../../utils/router";
import "./header.scss"
import {categories} from "../../../pages/users/theme/header";

const HeaderSearch = () => {

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

    return (
        <>
            <div className="container">
                <div className="row hero__categories_container">

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
                        {/*{*/}
                        {/*    isHome && (*/}
                        {/*        <div className="hero__item">*/}
                        {/*            <div className="hero__text">*/}
                        {/*                <span>Máy lọc nước</span>*/}
                        {/*                <h2>*/}
                        {/*                    Diệt vi khuẩn <br/>*/}
                        {/*                    Sạch 100%*/}
                        {/*                </h2>*/}
                        {/*                <p>Miễn phí giao hàng tận nơi</p>*/}
                        {/*                <Link to="" className="primary-btn">*/}
                        {/*                    Mua ngay*/}
                        {/*                </Link>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(HeaderSearch);
