import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import { getProductById } from "../../Service/products";
import { ProductDetail } from "../../types/ProductDetail";
import ProductImages from "./ProductImages";
import ProductDetailRight from "./ProductDetailRight";
import PolicyList from "./PolicyList";
import ProductDetailTabs from "./ProductDetailTabs";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (id) {
            getProductById(Number(id))
                .then((data) => {
                    console.log("Product:", data);
                    setProduct(data);
                })
                .catch((err) => console.error(t("product.errorLoading"), err));
        }
    }, [id, t]);

    if (!product) {
        return <div>{t("product.loading")}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex container mx-auto px-4 py-8 gap-12">
                <div className="flex flex-col flex-[3]">
                    <div className="mb-15">
                        <ProductImages
                            imageUrls={product.imageUrls}
                            thumbnailUrl={product.thumbnailUrl}
                        />
                    </div>

                    <PolicyList />
                    <ProductDetailTabs
                        productId={product.id}
                        productType={product.productType}
                        detail={product.detail}
                    />
                </div>

                <ProductDetailRight product={product} />
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
