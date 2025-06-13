
// import React, { useMemo } from "react";
// import { useParams } from "react-router-dom";
// import { useProducts } from "../../hooks/useProducts";
// import { WaterCategory } from "../../types/Product";
// import { slugify } from "../../utils/slugify";

// interface Props {
//   categories: WaterCategory[];
// }

// const CategoryProductList: React.FC<Props> = ({ categories }) => {
//   const { slug } = useParams();

//   // Tìm category theo slug
//   const selectedCategory = useMemo(
//     () => categories.find((cat) => slugify(cat.name) === slug),
//     [categories, slug]
//   );

//   const categoryId = selectedCategory?.id;

//   const { products, loading, error } = useProducts(0, 12, categoryId?.toString());

//   if (!categoryId) return <p>Không tìm thấy danh mục phù hợp.</p>;
//   if (loading) return <p>Đang tải sản phẩm...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//       {products.map((product) => (
//         <div key={product.id} className="border rounded p-2">
//           <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
//           <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
//           <p className="text-blue-600">{product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryProductList;
