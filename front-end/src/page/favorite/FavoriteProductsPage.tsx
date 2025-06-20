import React from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteList from './FavoriteList';

const FavoriteProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const userIdString = localStorage.getItem('userId');
  const userId = userIdString ? parseInt(userIdString, 10) : null;

  if (!userId) {
    return (
        <div className="text-center mt-6">
          {t('favorite.loginRequired')}
        </div>
    );
  }

  return <FavoriteList userId={userId} />;
};

export default FavoriteProductsPage;
