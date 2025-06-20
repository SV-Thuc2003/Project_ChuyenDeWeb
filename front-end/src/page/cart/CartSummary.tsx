import React from 'react';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface CartSummaryProps {
    subtotal: number;
    total: number;
    onApplyPromoCode: (code: string) => void;
    onProceedToCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
                                                     subtotal,
                                                     total,
                                                     onProceedToCheckout
                                                 }) => {
    const { t } = useTranslation();

    return (
        <div className="border border-[#a48c8ca8]">
            <div className="border-b border-[#a48c8ca8] p-4">
                <h2 className="text-xl font-bold uppercase">{t('cart_summary.title')}</h2>
            </div>

            <div className="border-b border-[#a48c8ca8] p-4 flex justify-between items-center">
                <span className="text-xl">{t('cart_summary.subtotal')}</span>
                <span className="text-xl font-bold">{subtotal.toLocaleString()} ₫</span>
            </div>

            <div className="border-b border-[#a48c8ca8] p-4 flex justify-between items-center">
                <span className="text-xl">{t('cart_summary.total')}</span>
                <span className="text-xl font-bold">{total.toLocaleString()} ₫</span>
            </div>

            <div className="p-4">
                <Button
                    variant="primary"
                    onClick={onProceedToCheckout}
                    fullWidth
                    className="uppercase py-3 text-xl"
                >
                    {t('cart_summary.checkout')}
                </Button>
            </div>
        </div>
    );
};

export default CartSummary;
