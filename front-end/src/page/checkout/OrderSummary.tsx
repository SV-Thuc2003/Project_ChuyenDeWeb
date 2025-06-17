import React from 'react';
import catImage from '../../assets/cat.jpg';
import { PersonalInfo, ShippingAddress } from '../../types/ChechOut';
import { CartItem } from '../../types/Cart'; // ✅ import type mới

interface OrderSummaryProps {
    personalInfo: PersonalInfo;
    shippingAddress: ShippingAddress;
    discountCode: string;
    paymentMethod: string;
    products: CartItem[]; // ✅ danh sách nhiều sản phẩm
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
    const total = (subtotal ?? 0) - (discount ?? 0) + (shippingFee ?? 0);

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full space-y-5">
            <h2 className="text-xl font-bold">Tóm tắt đơn hàng</h2>

            {/* Thông tin người nhận */}
            <div className="text-sm space-y-1">
                <p><strong>Người nhận:</strong> {personalInfo.name}</p>
                <p><strong>Điện thoại:</strong> {personalInfo.phone}</p>
                <p><strong>Email:</strong> {personalInfo.email}</p>
                <p>
                    <strong>Địa chỉ:</strong>{' '}
                    {[shippingAddress.address, shippingAddress.ward, shippingAddress.district, shippingAddress.city]
                        .filter(Boolean)
                        .join(', ')}
                </p>
            </div>

            {/* Mã giảm giá */}
            {discountCode && (
                <div className="text-sm">
                    <p><strong>Mã giảm giá:</strong> {discountCode}</p>
                </div>
            )}

            {/* Danh sách sản phẩm */}
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

            {/* Tổng kết giá */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{(subtotal ?? 0).toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>-{(discount ?? 0).toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>{(shippingFee ?? 0).toLocaleString()} đ</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                    <span>Tổng cộng</span>
                    <span>{(total ?? 0).toLocaleString()} đ</span>
                </div>
            </div>

            <button
                onClick={onPlaceOrder}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
                Thanh toán
            </button>
        </div>
    );
};

export default OrderSummary;
