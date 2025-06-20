import React from "react";
import { useTranslation } from "react-i18next";
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

const OrderSuccess: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-md mt-12">
                    <img
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhrYjV2aWQwenZncWU2b29pMnJpdG43cGg3Zjh1Mzl5MGx6OWVxdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PWehie2D58YxOqGrBt/giphy.gif"
                        alt={t("orderSuccess.imageAlt")}
                        className="w-48 h-48 mx-auto mb-6"
                    />

                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        🎉 {t("orderSuccess.title")}
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        {t("orderSuccess.messageLine1")} <br />
                        {t("orderSuccess.messageLine2")}
                    </p>

                    <div className="flex flex-col gap-4">
                        <a
                            href="/orders"
                            className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                        >
                            {t("orderSuccess.viewOrders")}
                        </a>
                        <a
                            href="/products"
                            className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                        >
                            {t("orderSuccess.continueShopping")}
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
