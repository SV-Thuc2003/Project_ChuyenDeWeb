import React from "react";
import { Link, useParams } from "react-router-dom";
import { WaterCategory } from "../../types/Product";

// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "");

interface CategorySectionProps {
  categories: WaterCategory[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  // const { slug } = useParams(); // Lấy slug từ URL
  const { categoryId } = useParams<{ categoryId: string }>();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Danh mục sản phẩm</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.map((category) => {
            const isActive = Number(categoryId) === category.id;

            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`flex flex-row items-center p-2 border rounded transition 
                 ${
                   isActive
                     ? "border-[#2d77ee] text-[#2d77ee]"
                     : "hover:border-[#2d77ee] hover:text-[#2d77ee] border-gray-300 text-gray-800"
                 }`}
              >
                <img
                  src={category.vectorImage}
                  alt={category.name}
                  className={`w-12 h-12 rounded-full mr-2 bg-gray-200 ${
                    isActive ? "border-white" : ""
                  }`}
                />
                <span className="text-lg">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
