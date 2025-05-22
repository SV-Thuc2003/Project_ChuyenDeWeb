import { memo } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo1 from 'assets/users/images/banner/banner-2.webp';
import logo2 from 'assets/users/images/banner/banner-3.webp';
const HeaderBanner = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <>
            <Slider {...settings}>
                <div>
                    <img src={logo1} alt="Banner 1" />
                </div>
                <div>
                    <img src={logo2} alt="Banner 2" />
                </div>
                {/*<div>*/}
                {/*    <img src="/images/banner3.jpg" alt="Banner 3" />*/}
                {/*</div>*/}
            </Slider>
        </>
    );
};

export default memo(HeaderBanner);
