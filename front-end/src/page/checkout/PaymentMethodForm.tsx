import React from 'react';
import InputField from '../../components/ui/InputField';
import { useTranslation } from 'react-i18next';

interface PaymentMethodFormProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  onApplyDiscountCode: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
                                                               paymentMethod,
                                                               onPaymentMethodChange
                                                             }) => {
  const { t } = useTranslation();

  return (
      <div className="mb-6">
        <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm space-y-4">
          <h2 className="text-2xl font-bold">{t('payment.title')}</h2>

          <div className="flex flex-row items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => onPaymentMethodChange('cash')}
                  className="accent-orange-500"
              />
              <span>{t('payment.cash')}</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                  type="radio"
                  name="paymentMethod"
                  value="vnpay"
                  checked={paymentMethod === 'vnpay'}
                  onChange={() => onPaymentMethodChange('vnpay')}
                  className="accent-orange-500"
              />
              <span>{t('payment.vnpay')}</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => onPaymentMethodChange('creditCard')}
                  className="accent-orange-500"
              />
              <span>{t('payment.creditCard')}</span>
            </label>
          </div>

          {paymentMethod === 'creditCard' && (
              <div className="space-y-4 mt-4">
                <InputField label={t('payment.cardName')} placeholder="Nguyễn Văn A" />
                <InputField label={t('payment.cardNumber')} placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label={t('payment.expiry')} placeholder="MM/YY" />
                  <InputField label={t('payment.cvc')} placeholder="123" />
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default PaymentMethodForm;
