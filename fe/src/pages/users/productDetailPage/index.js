// import * as React from 'react';
// import Button from '@mui/material/Button';
//
// export default function ButtonUsage() {
//     return <Button variant="contained">Hello world</Button>;
// }
import {memo} from "react"
import Breadcrumb from "../theme/breadcrumb";
import "./index.scss"

import feature1Img from "assets/users/images/featured/insta-1.jpg";
import feature2Img from "assets/users/images/featured/insta-2.jpg";
import feature3Img from "assets/users/images/featured/insta-3.jpg";
import {ProductCart} from "../../../components";
import {AiOutlineCopy, AiOutlineEye, AiOutlineFacebook, AiOutlineLinkedin} from "react-icons/ai";
import {formatter} from "../../../utils/fomater";
import {featProducts} from "../../../utils/common";
import Quantity from "../../../components/quantity";

const ProductDetailPage = () => {

    const imgs = [feature1Img, feature2Img, feature3Img];

    return (
        <>
            <Breadcrumb name="Chi tiết sản phẩm"/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-xl-12 col-md-12 col-sm-12 col-xs-12 product__detail__pic">
                        <img src={feature1Img} alt="product-pic"/>
                        <div className="main">
                            {
                                imgs.map((item, key) => (
                                    <img src={item} alt="product-pic" key={key}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-12 col-md-12 col-sm-12 col-xs-12 product__detail__text">
                        <h2>May loc nuoc</h2>
                        <div className="seen-icon">
                            <AiOutlineEye/>
                            {`10 (luot xem)`}
                        </div>
                        <h3>{formatter(200000)}</h3>
                        <p>
                            Máy lọc nước là một thiết bị gia dụng quan trọng giúp loại bỏ các tạp chất,
                            vi khuẩn, virus và kim loại nặng khỏi nguồn nước,
                            mang lại nguồn nước sạch và an toàn cho người sử dụng.
                        </p>

                        <Quantity />

                        <ul>
                            <li>
                                <b>Tình trạng:</b> <span>Còn hàng</span>
                            </li>
                            <li>
                                <b>Số lượng:</b> <span>2</span>
                            </li>
                            <li>
                                <b>Chia sẻ:</b>{""}
                                <span>
                                    <AiOutlineFacebook/>
                                    <AiOutlineLinkedin/>
                                    <AiOutlineCopy/>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="product__detail__tab">
                    <h4>Thông tin chi tiết</h4>
                    <div>
                        <ul>
                            <li>
                                <p>hohoho</p>
                            </li>
                            <li>
                                <p>Hỗ trợ giao hàng</p>
                            </li>
                            <li>
                                <p>Diệt vi khuẩn</p>
                            </li>
                            <li>
                                <p>1</p>
                            </li>
                            <li>
                                <p>2</p>
                            </li>
                            <li>
                                <p>3</p>
                            </li>
                            <li>
                                <p>4</p>
                            </li>
                            <li>
                                <p>5</p>
                            </li>
                        </ul>
                        <p>
                            <br/>
                            <strong>Cách chọn máy lọc nước</strong>
                        </p>
                        <ul>
                            <li>
                                <p>
                                    Chính hàng
                                </p>
                            </li>
                            <li>
                                <p>
                                    Chất lượng cao
                                </p>
                            </li>
                            <li>
                                <p>
                                    Chất lượng cao số 1
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="section-title">
                    <h2>Sản phẩm khác</h2>
                </div>
                <div className="row">
                    {
                        featProducts.all.products.map((item,key) => (
                            <div key={key} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <ProductCart img={item.img} name={item.name} price={item.price}/>

                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    );
};
export default memo(ProductDetailPage);