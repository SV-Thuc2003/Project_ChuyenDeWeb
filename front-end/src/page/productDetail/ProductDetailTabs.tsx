import React from "react";
import Tabs, { TabItem } from "../../components/ui/tabs";
import ProductTypeDetailDisplay from "./ProductTypeDetailDisplay";
import ProductReviewSection from "./ProductReviewSection";
import { ProductType } from "../../types/ProductDetail";

interface Props {
  productType: ProductType;
  detail: any; // chi tiết sản phẩm tương ứng
  reviews: {
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  onSubmitReview: (rating: number, comment: string) => void;
}

const ProductDetailTabs: React.FC<Props> = ({
  productType,
  detail,
  reviews,
  onSubmitReview,
}) => {
  const tabs: TabItem[] = [
    {
      id: "specs",
      label: "Thông số kỹ thuật",
      content: (
        <ProductTypeDetailDisplay productType={productType} detail={detail} />
      ),
    },
    {
      id: "reviews",
      label: "Bài viết đánh giá",
      content: (
        <ProductReviewSection
          reviews={reviews}
          onSubmitReview={onSubmitReview}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} className="mt-4" />;
};

export default ProductDetailTabs;
