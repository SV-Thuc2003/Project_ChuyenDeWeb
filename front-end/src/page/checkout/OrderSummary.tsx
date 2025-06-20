import React from 'react';
import catImage from '../../assets/cat.jpg';
import { PersonalInfo, ShippingAddress } from '../../types/ChechOut';
import { CartItem } from '../../types/Cart';
import { useTranslation } from 'react-i18next';

interface OrderSummaryProps {
    personalInfo: PersonalInfo;
    shippingAddress: ShippingAddress;
    discountCode: string;
    paymentMethod: string;
    products: CartItem[];
    subtotal: number;
    discount: number;
    shippingFee: number;
    onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
                                                       discountCode,
                                                       products,
                                                       subtotal,
                                                       discount,
                                                       shippingFee,
                                                       onPlaceOrder,
                                                       personalInfo,
                                                       shippingAddress,
                                                   }) => {
    const total = subtotal - discount + shippingFee;
    const { t } = useTranslation();

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full space-y-5">
            <h2 className="text-xl font-bold">{t('order.title')}</h2>

            <div className="text-sm space-y-1">
                <p><strong>{t('order.name')}:</strong> {personalInfo.name}</p>
                <p><strong>{t('order.phone')}:</strong> {personalInfo.phone}</p>
                <p><strong>{t('order.email')}:</strong> {personalInfo.email}</p>
                <p>
                    <strong>{t('order.address')}:</strong>{' '}
                    {[shippingAddress.address, shippingAddress.ward, shippingAddress.district, shippingAddress.city]
                        .filter(Boolean)
                        .join(', ')}
                </p>
            </div>

            {discountCode && (
                <div className="text-sm">
                    <p><strong>{t('order.discountCode')}:</strong> {discountCode}</p>
                </div>
            )}

            {products.map((product, index) => (
                <div key={index} className="flex items-center space-x-4 border-b pb-4">
                    <img
                        src={product.thumbnail || catImage}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">
                            {product.quantity} x {product.price.toLocaleString()} đ
                        </p>
                    </div>
                </div>
            ))}

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>{t('order.subtotal')}</span>
                    <span>{subtotal.toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between">
                    <span>{t('order.discount')}</span>
                    <span>-{discount.toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between">
                    <span>{t('order.shippingFee')}</span>
                    <span>{shippingFee.toLocaleString()} đ</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                    <span>{t('order.total')}</span>
                    <span>{total.toLocaleString()} đ</span>
                </div>
            </div>

            <button
                onClick={onPlaceOrder}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
                {t('order.checkout')}
            </button>
        </div>
    );
};

export default OrderSummary;
