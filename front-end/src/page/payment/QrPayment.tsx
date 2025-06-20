import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const handleConfirmPayment = async () => {
        if (
            typeof txnRef !== "string" || txnRef.trim() === "" ||
            typeof userId !== "number" || isNaN(userId)
        ) {
            alert(t("payment.error.missingInfo"));
            return;
        }

        try {
            const orderId = await onConfirm(payload);

            if (!orderId || isNaN(orderId)) {
                alert(t("payment.error.noOrderId"));
                return;
            }

            await axios.get(`/api/payment/verify`, {
                params: { txnRef, orderId, userId },
                withCredentials: true,
            });

            navigate("/order-success");
        } catch (err: any) {
            alert(t("payment.error.failed"));
            console.error("❌", err.response?.data || err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    {t("payment.qrTitle")}
                </h2>

                <div className="flex justify-center mb-4">
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
                        alt="QR code"
                        className="w-[200px] h-[200px]"
                    />
                </div>

                <p className="text-sm text-center text-gray-600 mb-2">
                    {t("payment.txnRef")}: <strong>{txnRef}</strong>
                </p>
                <p className="text-sm text-center text-gray-600 mb-4">
                    {t("payment.amount")}: <strong>{amount.toLocaleString()}đ</strong>
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    >
                        {t("payment.close")}
                    </button>
                    <button
                        onClick={handleConfirmPayment}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                        {t("payment.confirmed")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrPayment;
