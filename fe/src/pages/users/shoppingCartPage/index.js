import {memo} from "react"
import Breadcrumb from "../theme/breadcrumb";
import {formatter} from "../../../utils/fomater";
import {Quantity} from "../../../components";
import "./style.scss"
import {AiOutlineClose} from "react-icons/ai";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTERS} from "../../../utils/router";

const ShoppingCartPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Breadcrumb name="Giỏ hàng "/>
            <div className="container">
                <div className="table__cart">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="shopping__cart__item">
                                    <img
                                        src="https://via.placeholder.com/50"
                                        alt="product-pic"
                                    />
                                    <h4>Ten san pham 1</h4>
                                </td>
                                <td>{formatter(200000)}</td>
                                <td><Quantity quantity="2" hasAddToCart={false}/></td>
                                <td>{formatter(400000)}</td>
                                <td className="icon_close">
                                    <AiOutlineClose/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="shopping__continue">
                            <h3>Mã giảm giá</h3>
                            <div className="shopping__discount">
                                <input  placeholder="Nhập mã giảm giá"/>
                                <button type="button" className="button-submit">Áp dụng</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="shopping__checkout">
                            <h2>Tổng đơn:</h2>
                            <ul>
                                <li>Số lượng: <span>{2}</span></li>
                                <li>Thành tiền: <span>{formatter(200000)}</span></li>
                            </ul>
                            <button type="button" className="button-submit" onClick={() => navigate(ROUTERS.USER.CHECKOUT)}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(ShoppingCartPage);