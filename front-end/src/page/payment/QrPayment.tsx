import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface QrPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrUrl: string;
    txnRef: string;
    userId: number;
    amount: number;
    payload: any;
    onConfirm: (payload: any) => Promise<number>;
}

const QrPayment: React.FC<QrPaymentModalProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      qrUrl,
                                                      txnRef,
                                                      userId,
                                                      amount,
                                                      payload,
                                                      onConfirm,
                                                  }) => {
    const navigate = useNavigate();

    const handleConfirmPayment = async () => {
        if (
            typeof txnRef !== "string" || txnRef.trim() === "" ||
            typeof userId !== "number" || isNaN(userId)
        ) {
            alert("❌ Thiếu thông tin thanh toán. Không thể xác nhận.");
            return;
        }

        try {
            const orderId = await onConfirm(payload);

            console.log("✅ Đã tạo đơn hàng, orderId =", orderId);

            if (!orderId || isNaN(orderId)) {
                alert("❌ Không nhận được mã đơn hàng. Không thể xác nhận.");
                return;
            }

            await axios.get(`/api/payment/verify`, {
                params: { txnRef, orderId, userId },
                withCredentials: true,
            });

            navigate("/order-success");
        } catch (err: any) {
            alert("❌ Thanh toán thất bại. Vui lòng thử lại!");
            console.error("❌ Lỗi xác nhận thanh toán:", err.response?.data || err.message);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center">Quét mã QR để thanh toán</h2>

                <div className="flex justify-center mb-4">
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
                        alt="QR code"
                        className="w-[200px] h-[200px]"
                    />
                </div>

                <p className="text-sm text-center text-gray-600 mb-2">
                    Mã giao dịch: <strong>{txnRef}</strong>
                </p>
                <p className="text-sm text-center text-gray-600 mb-4">
                    Số tiền: <strong>{amount.toLocaleString()}đ</strong>
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={handleConfirmPayment}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                        Đã thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrPayment;
