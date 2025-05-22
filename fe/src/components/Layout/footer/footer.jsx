import { memo } from "react"
import "./style.scss"
import {Link} from "react-router-dom";
import { CiInstagram, CiLinkedin,CiTwitter,CiUser } from "react-icons/ci";
import { AiOutlineEnvironment, AiOutlineFacebook, AiOutlineShoppingCart } from "react-icons/ai";
const Footer = () => {
    return <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="footer__about">
                        <h1 className="footer__about_logo">Logo</h1>
                        <ul>
                            <li>Địa chỉ: 214 Hồ Chí Minh</li>
                            <li>Số điện thoại: 0222222222</li>
                            <li>Email: gmail@gmail.com</li>

                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="footer__widget">
                        <h6>Cửa hàng</h6>
                        <ul>
                            <li>
                                <Link to="">Liên hệ</Link>
                            </li>
                            <li>
                                <Link to="">Thông tin về chúng tôi</Link>
                            </li>
                            <li>
                                <Link to="">Sản phẩm kinh doanh</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to="">Thông tin tài khoản</Link>
                            </li>
                            <li>
                                <Link to="">Giỏ hàng</Link>
                            </li>
                            <li>
                                <Link to="">Danh sách ưa thích</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*<div className="col-lg-3">3</div>*/}
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                    <div className="footer__widget">
                        <h6>Khuyến mãi & ưu đãi</h6>
                        <p>Đăng ký thông tin taị đây</p>
                        <form action="#">
                            <div className="input-group">
                                <input type="text" placeholder="Nhập email"/>
                                <button type="submit" className="button-submit">
                                    Đăng ký
                                </button>
                            </div>
                            <div className="footer__widget__social">
                                <div>
                                    <AiOutlineFacebook />
                                </div>
                                <div>
                                    <CiInstagram />
                                </div>
                                <div>
                                    <CiLinkedin />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    </footer>

};
export default memo(Footer);