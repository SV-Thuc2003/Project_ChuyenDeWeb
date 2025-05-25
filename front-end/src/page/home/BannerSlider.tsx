import React from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import logo1 from "../../assets/banner-2.webp";
import logo2 from "../../assets/banner-3.webp";

// Optional: Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

const BannerSlider: React.FC = () => {
    return (
        <div className="w-full max-w-[1500px] mx-auto">
            <Slider {...settings}>
                <div className="flex justify-center items-center">
                    <img
                        src={logo1}
                        alt="Banner 1"
                        className="w-full h-auto object-contain rounded-md shadow-md"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <img
                        src={logo2}
                        alt="Banner 2"
                        className="w-full h-auto object-contain rounded-md shadow-md"
                    />
                </div>
            </Slider>
        </div>
    );
};


export default BannerSlider;
