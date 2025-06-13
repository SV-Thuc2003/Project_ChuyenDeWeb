import React from 'react';
import CategorySection from './CategorySection';
// import CategoryProductList from './CategoryProductList';
import { WaterCategory } from '../../types/Product';

interface Props {
  categories: WaterCategory[];
}

const CategoryPage: React.FC<Props> = ({ categories }) => {
  return (
    <div className="container mx-auto">
      <CategorySection categories={categories} />
      {/* <CategoryProductList categories={categories} /> */}
    </div>
  );
};

export default CategoryPage;
