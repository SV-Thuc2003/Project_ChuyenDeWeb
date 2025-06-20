import React from 'react';
import ProductItem from './ProductItem';
import Button from '../../components/ui/Button';
import { CartItem } from '../../types/Cart';
import { useTranslation } from 'react-i18next';

interface CartSectionProps {
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onUpdateCart: () => void;
  onContinueShopping: () => void;
}

const CartSection: React.FC<CartSectionProps> = ({
                                                   cartItems,
                                                   onRemoveItem,
                                                   onQuantityChange,
                                                   onUpdateCart,
                                                   onContinueShopping,
                                                 }) => {
  const { t } = useTranslation();

  return (
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
          <tr>
            <th className="text-left py-2 border-b border-[#a48c8ca8] w-[124px]"></th>
            <th className="text-left py-2 border-b border-[#a48c8ca8] w-[124px]"></th>
            <th className="text-left py-2 border-b border-[#a48c8ca8] uppercase text-2xl font-bold">
              {t('cart.product')}
            </th>
            <th className="py-2 border-b border-[#a48c8ca8] w-[124px] uppercase text-base font-bold">
              {t('cart.price')}
            </th>
            <th className="py-2 border-b border-[#a48c8ca8] w-[124px] uppercase text-base font-bold text-center">
              {t('cart.quantity')}
            </th>
            <th className="py-2 border-b border-[#a48c8ca8] w-[124px] uppercase text-base font-bold text-right">
              {t('cart.subtotal')}
            </th>
          </tr>
          </thead>
          <tbody>
          {cartItems.map(item => (
              <ProductItem
                  key={`${item.id}-${item.productId}`}
                  item={item}
                  onRemove={onRemoveItem}
                  onQuantityChange={onQuantityChange}
              />
          ))}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan={6} className="py-4 border-b border-[#a48c8ca8]">
              <div className="flex space-x-4">
                <Button
                    variant="outline"
                    onClick={onContinueShopping}
                    className="uppercase py-2"
                >
                  ← {t('cart.continue_shopping')}
                </Button>
                <Button
                    variant="secondary"
                    onClick={onUpdateCart}
                    className="uppercase py-2"
                >
                  {t('cart.update_cart')}
                </Button>
              </div>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
  );
};

export default CartSection;
