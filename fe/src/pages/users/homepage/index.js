import {memo} from "react"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import cat1Img from "assets/users/images/categories/category-1.jpg";
import cat2Img from "assets/users/images/categories/category-2.jpg";
import cat3Img from "assets/users/images/categories/category-3.jpg";
import cat4Img from "assets/users/images/categories/category-4.jpg";
import cat5Img from "assets/users/images/categories/category-5.jpg";
import feature1Img from "assets/users/images/featured/insta-1.jpg";
import feature2Img from "assets/users/images/featured/insta-2.jpg";
import feature3Img from "assets/users/images/featured/insta-3.jpg";
import feature4Img from "assets/users/images/featured/insta-4.jpg";
import feature5Img from "assets/users/images/featured/insta-5.jpg";
import feature6Img from "assets/users/images/featured/insta-6.jpg";
import banner1Img from "assets/users/images/banner/banner-2.webp";
import banner2Img from "assets/users/images/banner/banner-3.webp";
import {AiOutlineEye, AiOutlineShoppingCart} from "react-icons/ai";
import "./style.scss";
import {formatter} from "../../../utils/fomater";
import ProductCart from "../../../components/productCart";
import {featProducts} from "../../../utils/common";

const Homepage = () => {
    const responsive = {
        superLargeDesktop: {
            //     the naming can be any depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5,
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
        },

    };
    const sliderItems = [
        {
            bgImg: cat1Img,
            name: "Máy lọc nước RO",
        },
        {
            bgImg: cat2Img,
            name: "Máy lọc nước Nano",
        },
        {
            bgImg: cat3Img,
            name: "Máy lọc nước điện giải ion kiềm",
        },
        {
            bgImg: cat4Img,
            name: "Máy lọc nước UF ",
        },
        {
            bgImg: cat5Img,
            name: "Máy lọc nước Hydrogen",
        },
    ];

    const renderFeaturedProducts = (data) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(data).forEach((key, index) => {
            // console.log(key, index);
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);

            const tabPanel = [];
            data[key].products.forEach((item, j) => {
                tabPanel.push(
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={j}>
                        <ProductCart name={item.name} img={item.img} price={item.price}/>
                    </div>
                );
            });
            tabPanels.push(tabPanel);
        });


        return (
            <Tabs>
                <TabList>{tabList}</TabList>

                {tabPanels.map((item, key) => (
                    <TabPanel key={key}>
                        <div className="row">
                            {item}
                        </div>
                    </TabPanel>
                ))}


            </Tabs>
        );
    };

    return (
        <>
            {/*Categories Begin*/}
            <div className="container container__categories_slider">
                <Carousel responsive={responsive} className="categories_slider">
                    {sliderItems.map((item, key) => (
                        <div
                            className="categories_slider_item"
                            style={{backgroundImage: `url(${item.bgImg})`}}
                            key={key}
                        >
                            <p>{item.name}</p>
                        </div>
                    ))
                    }

                </Carousel>
            </div>
            {/*Categories End*/}
            {/*Featured Begin*/}
            <div className="container">
                <div className="featured">
                    <div className="section-title">
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                    {renderFeaturedProducts(featProducts)}
                </div>
            </div>
            {/*Featured End*/}

            {/*Banner Begin*/}
            <div className="container">
                <div className="banner">
                    <div className="banner__pic">
                        <img src={banner1Img} alt="banner"/>
                    </div>
                    <div className="banner__pic">
                        <img src={banner2Img} alt="banner"/>
                    </div>
                </div>
            </div>
            {/*Banner End*/}
        </>
    );

};
export default memo(Homepage);