import React from "react";
import { useTranslation } from "react-i18next";
import { ProductDetail } from '../../types/ProductDetail';

interface Props {
    product: ProductDetail;
}

const ProductInfo: React.FC<Props> = ({ product }) => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-xl font-semibold mb-2">{product.name}</h1>

            {product.price !== undefined ? (
                <div className="text-red-600 text-2xl font-bold mb-1">
                    {product.price.toLocaleString()} ₫
                </div>
            ) : (
                <div className="text-gray-500 text-2xl font-bold mb-1">
                    {t("product.price_unknown")}
                </div>
            )}

            <div className="text-gray-600 mb-3">{product.brand}</div>
            <div className="text-sm text-gray-700">{product.feature}</div>
        </div>
    );
};

export default ProductInfo;
