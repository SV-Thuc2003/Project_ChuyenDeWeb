import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import banner from "../../assets/banner1.jpg";
import Card from "../../components/common/Card";
import { Product } from "../../types/Product";
import { useBestSellingProducts } from "../../hooks/products/useBestSellingProducts";

const BestsellersSection: React.FC = () => {
  const { t } = useTranslation();
  const { products, loading, error } = useBestSellingProducts();

  return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="relative inline-block">
              <div className="flex items-center px-14 py-3 bg-gradient-to-r from-[#007bff] to-[#00aaff] rounded-r-full rounded-tl-[90px] shadow-md border border-white w-[1504px]">
                <img src={logo} alt="Water drop" className="w-5 h-5 mr-2" />
                <h2 className="text-white font-bold text-lg uppercase">
                  {t("bestseller.title")}
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full aspect-[3/1] overflow-hidden rounded-lg shadow-md mb-8">
            <img
                src={banner}
                alt={t("bestseller.bannerAlt")}
                className="w-full h-full object-cover"
            />
          </div>

          {loading && <p>{t("bestseller.loading")}</p>}
          {error && <p className="text-red-500">{t("bestseller.error")}</p>}

          {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product: Product) => (
                    <Card
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.name}
                        price={product.price}
                        onAddToWishlist={() => {
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

export default BestsellersSection;
