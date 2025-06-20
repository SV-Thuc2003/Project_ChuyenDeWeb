import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/logo.png";
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
      <footer className="bg-gray-40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
            <div>
              <div className="flex items-center">
                <img src={logo} alt="Water Purifier Shop" className="h-[50px] mb-4" />
                <h3 className="text-xl font-bold mb-4">{t('footer.brand')}</h3>
              </div>
              <p className="text-lg mb-6">{t('footer.description')}</p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="w-6 h-6" /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter className="w-6 h-6" /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagramSquare className="w-6 h-6" /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className="w-6 h-6" /></a>
              </div>
            </div>

            <div className="px-4">
              <h3 className="text-base font-semibold mb-5 mt-4">{t('footer.companyTitle')}</h3>
              <ul className="space-y-6">
                <li><Link to="/about" className="text-base">{t('footer.about')}</Link></li>
                <li><Link to="/blog" className="text-base">{t('footer.blog')}</Link></li>
                <li><Link to="/gift-cards" className="text-base">{t('footer.giftCards')}</Link></li>
                <li><Link to="/careers" className="text-base">{t('footer.careers')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-5 mt-4">{t('footer.linksTitle')}</h3>
              <ul className="space-y-6">
                <li><Link to="/new-products" className="text-base">{t('footer.newProducts')}</Link></li>
                <li><Link to="/best-sellers" className="text-base">{t('footer.bestSellers')}</Link></li>
                <li><Link to="/discounts" className="text-base">{t('footer.discounts')}</Link></li>
                <li><Link to="/faq" className="text-base">{t('footer.faq')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-5 mt-4">{t('footer.serviceTitle')}</h3>
              <ul className="space-y-6">
                <li><Link to="/contact" className="text-base">{t('footer.contactUs')}</Link></li>
                <li><Link to="/shipping" className="text-base">{t('footer.shipping')}</Link></li>
                <li><Link to="/returns" className="text-base">{t('footer.returns')}</Link></li>
                <li><Link to="/order-tracking" className="text-base">{t('footer.orderTracking')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-5 mt-4">{t('footer.contact')}</h3>
              <p className="text-base font-medium mb-6">{t('footer.address')}</p>
              <p className="text-base font-medium mb-6">{t('footer.phone')}</p>
              <p className="text-base font-medium">{t('footer.email')}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">{t('footer.copyright')}</p>
            <div className="mt-4 md:mt-0">
              <img src="/images/img_paymenticons_1.svg" alt="Payment Methods" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
