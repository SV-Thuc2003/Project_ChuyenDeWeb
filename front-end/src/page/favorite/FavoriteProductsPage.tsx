// src/page/favorite/FavoriteProductsPage.tsx
import React from 'react';
import FavoriteList from './FavoriteList';

const FavoriteProductsPage: React.FC = () => {
  // Ví dụ lấy userId từ localStorage hoặc context auth
  const userIdString = localStorage.getItem('userId');
  const userId = userIdString ? parseInt(userIdString, 10) : null;

  if (!userId) {
    return <div className="text-center mt-6">Vui lòng đăng nhập để xem sản phẩm yêu thích.</div>;
  }

  return <FavoriteList userId={userId} />;
};

export default FavoriteProductsPage;
