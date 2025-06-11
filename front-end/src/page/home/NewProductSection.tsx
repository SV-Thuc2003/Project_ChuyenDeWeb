import React from "react";
import { useNewProducts } from "../../hooks/products/useNewProducts"; // đảm bảo đường dẫn đúng
import { Product } from "../../types/Product";
import Card from "../../components/common/Card";
import logo from "../../assets/logo.png";
import banner from "../../assets/banner1.jpg";

const NewProductSection: React.FC= () => {
  const { products, loading, error } = useNewProducts();
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="relative inline-block">
            <div className="flex items-center px-14 py-3 bg-gradient-to-r from-[#007bff] to-[#00aaff] rounded-r-full rounded-tl-[90px] shadow-md border border-white w-[1504px]">
              <img src={logo} alt="Water drop" className="w-5 h-5 mr-2" />
              <h2 className="text-white font-bold text-lg uppercase">
                Sản phẩm mới
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full aspect-[3/1] overflow-hidden rounded-lg shadow-md mb-8">
          <img
            src={banner}
            alt="Banner Sản phẩm mới"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hiển thị sản phẩm mới */}
        {loading && <p>Đang tải sản phẩm mới...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <Card
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.name}
                price={product.price}
                onAddToWishlist={() => {
                  // bạn xử lý yêu thích ở đây nếu có
                  console.log("Thêm vào wishlist:", product.id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewProductSection;
