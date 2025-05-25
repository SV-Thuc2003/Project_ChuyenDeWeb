import React from 'react';
import { Link } from 'react-router-dom';
import { PetCategory } from '../../types/Product';

interface CategorySectionProps {
  categories: PetCategory[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Danh mục sản phẩm</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-row items-center p-2 border rounded hover:shadow transition"
            >
              <img
                src={category.vectorImage}
                alt={category.name}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-gray bg-gray-300"
              />
              <span className="text-center text-sm">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;