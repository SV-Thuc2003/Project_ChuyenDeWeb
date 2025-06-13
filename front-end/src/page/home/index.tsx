import React from 'react';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
// { useState }
import NewProductSection from './NewProductSection.tsx';
import PromoSection from './PromoSection';
import BestsellersSection from './BestsellersSection';

// import accessory from '../../assets/phukien.jpg';
// import food from '../../assets/thucan.jpg';
// import furniture from '../../assets/noithat.jpg';
// import bags from '../../assets/tui.jpg';
import BannerSlider from "./BannerSlider.tsx";



const HomePage: React.FC = () => {

    // const categories = [
    //     {
    //         id: 'accessories',
    //         name: 'Phụ kiện',
    //         image: accessory,
    //         productCount: '84 sản phẩm'
    //     },
    //     {
    //         id: 'food',
    //         name: 'Thức ăn',
    //         image: food,
    //         productCount: '64 sản phẩm'
    //     },
    //     {
    //         id: 'furniture',
    //         name: 'Nội thất',
    //         image: furniture,
    //         productCount: '22 sản phẩm'
    //     },
    //     {
    //         id: 'bags',
    //         name: 'Túi',
    //         image: bags,
    //         productCount: '22 sản phẩm'
    //     }
    // ];

    // // Bestselling products data
    // const bestsellers = [
    //     {
    //         id: 'product1',
    //         name: 'Bát ăn cho mèo PetSafe',
    //         price: '49.000 vnđ',
    //         image: food
    //     },
    //     {
    //         id: 'product2',
    //         name: 'Bát ăn cho chó Ferplast',
    //         price: '129.000 vnđ',
    //         image: food
    //     },
    //     {
    //         id: 'product3',
    //         name: 'Dây dắt chó Hagen',
    //         price: '99.000 vnđ',
    //         image: food
    //     },
    //     {
    //         id: 'product4',
    //         name: 'Thức ăn cho mèo cao cấp CATS LOVE',
    //         price: '249.000 VNĐ',
    //         image: food
    //     },
    //     {
    //         id: 'product5',
    //         name: 'Bát ăn cho chó Omlet',
    //         price: '49.000 VNĐ',
    //         image: food
    //     },
    //     {
    //         id: 'product6',
    //         name: 'Thức ăn cho chó hãng Omni',
    //         price: '169.000 VNĐ',
    //         image: food
    //     },
    //     {
    //         id: 'product7',
    //         name: 'Giường cho chó Ferplast',
    //         price: '399.000 VNĐ',
    //         image: food
    //     },
    //     {
    //         id: 'product8',
    //         name: 'Thức ăn cho chó hãng Jinx',
    //         price: '269.000 VNĐ',
    //         image: food
    //     }
    // ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* <Header onLoginClick={handleLoginClick} /> */}
             <Header />

            <main className="flex-grow">
                
                <BannerSlider />

                <NewProductSection />

                <BestsellersSection />

                <PromoSection />
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;

{/* <PetTypeSection petTypes={petTypes} /> */}