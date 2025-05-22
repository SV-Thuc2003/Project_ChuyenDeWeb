import feature1Img from "../assets/users/images/featured/insta-1.jpg";
import feature2Img from "../assets/users/images/featured/insta-2.jpg";
import feature3Img from "../assets/users/images/featured/insta-3.jpg";
import feature4Img from "../assets/users/images/featured/insta-4.jpg";

export const featProducts = {
    all: {
        title: "Toàn bộ",
        products: [
            {
                img: feature1Img,
                name: "Máy lọc A",
                price: 20000000,
            },
            {
                img: feature2Img,
                name: "Máy lọc RO",
                price: 23000000,
            },
            {
                img: feature3Img,
                name: "Máy lọc Nano",
                price: 23000000,
            },
            {
                img: feature4Img,
                name: "Máy lọc UF",
                price: 23000000,
            },
        ],
    },
    RO: {
        title: "RO",
        products: [
            {
                img: feature3Img,
                name: "Máy lọc A",
                price: 20000000,
            },
        ],
    },
    Nano: {
        title: "Nano",
        products: [
            {
                img: feature3Img,
                name: "Máy lọc A",
                price: 20000000,
            },
        ],
    },
    UF: {
        title: "UF",
        products: [
            {
                img: feature3Img,
                name: "Máy lọc A",
                price: 20000000,
            },
        ],
    },
}