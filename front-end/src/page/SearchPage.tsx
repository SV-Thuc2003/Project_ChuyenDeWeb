// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import { useProductSearch } from "../hooks/products/useProductSearch";

// const SearchPage: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const keyword = searchParams.get("keyword") || "";

//   const { products, isLoading } = useProductSearch(keyword);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-semibold mb-4">Kết quả tìm kiếm: "{keyword}"</h1>
//       {isLoading && <p>Đang tải dữ liệu...</p>}
//       {!isLoading && products.length === 0 && <p>Không tìm thấy sản phẩm nào.</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="border p-4 rounded shadow">
//             <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
//             <h2 className="text-lg font-medium">{product.name}</h2>
//             <p className="text-[#5290f3]">{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

import React from "react";
import { useSearchParams } from "react-router-dom";
import { useProductSearch } from "../hooks/products/useProductSearch";
import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer/footer";
import Card from '../components/common/Card';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 0;


  const { products, isLoading } = useProductSearch(keyword, page);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">
          Kết quả tìm kiếm: "{keyword}"
        </h1>
        {isLoading && <p>Đang tải dữ liệu...</p>}
        {!isLoading && products.length === 0 && (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            isFavorite={product.isFavorite}
          />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
