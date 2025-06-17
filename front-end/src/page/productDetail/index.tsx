import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import { getProductById } from "../../Service/products"; // Đường dẫn tùy theo dự án
import { ProductDetail } from "../../types/ProductDetail";
import ProductImages from "./ProductImages";
import ProductDetailRight from "./ProductDetailRight";
import PolicyList from "./PolicyList";
// import ProductTypeDetailDisplay from "./ProductTypeDetailDisplay";
import ProductDetailTabs from "./ProductDetailTabs";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);

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
  // const handleReviewSubmit = (rating: number, comment: string) => {
  //   const review = {
  //     username: "Nguyen Van A", // hoặc lấy từ context/login info
  //     rating,
  //     comment,
  //     createdAt: new Date().toISOString(),
  //   };

  //   console.log("Đánh giá mới:", review);
  //   // TODO: gọi API POST review ở đây
  // };

  if (!product) {
    return <div>Đang tải sản phẩm...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
