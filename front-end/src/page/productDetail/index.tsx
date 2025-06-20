import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
// import Breadcrumb from '../../components/ui/Breadcrumb';
import { getProductById } from "../../Service/products"; // Đường dẫn tùy theo dự án
import { ProductDetail } from "../../types/ProductDetail";
import ProductImages from "./ProductImages";
import ProductDetailRight from "./ProductDetailRight";
import PolicyList from "./PolicyList";
// import ProductTypeDetailDisplay from "./ProductTypeDetailDisplay";
import ProductDetailTabs from "./ProductDetailTabs";
import { useParams } from "react-router-dom";
// import { useProductFilters } from "../../hooks/useProductFilters";
  
const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  // const { categories } = useProductFilters();

  useEffect(() => {
    if (id) {
      getProductById(Number(id))
        .then((data) => {
          console.log("Product:", data); // kiểm tra ở đây
          setProduct(data);
        })
        .catch((err) => console.error("Lỗi lấy sản phẩm:", err));
    }
  }, [id]);
  
  if (!product) {
    return <div>Đang tải sản phẩm...</div>;
  }

  // const currentCategory = categories.find(c => c.id === product.categoryId);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

  {/* <Breadcrumb
  items={[
    { label: "Trang chủ", path: "/" },
    { label: product.productType || "Danh mục", path: `/category/${product.productType}` },
    { label: product.name },
  ]}
/> */}



      <main className="flex container mx-auto px-4 py-8 gap-12">
        {/* Left side: ảnh lớn + gallery nhỏ bên dưới */}
        <div className="flex flex-col flex-[3]">
          <div className="mb-15">
            <ProductImages
              imageUrls={product.imageUrls}
              thumbnailUrl={product.thumbnailUrl}
            />
          </div>

          <PolicyList />
          <ProductDetailTabs
            productId={product.id}
            productType={product.productType}
            detail={product.detail}
            // onSubmitReview={handleReviewSubmit}
          />

          {/* <ProductTypeDetailDisplay
            productType={product.productType}
            detail={product.detail}
          /> */}
        </div>

        {/* Right side: thông tin chi tiết */}
        <ProductDetailRight product={product} />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
