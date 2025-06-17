import React from "react";
import Tabs, { TabItem } from "../../components/ui/tabs";
import ProductTypeDetailDisplay from "./ProductTypeDetailDisplay";
import ReviewSection from "./ProductReviewSection";
import { ProductType } from "../../types/ProductDetail";
import { useReview } from "../../hooks/useReview";

interface Props {
  productId: number;
  productType: ProductType;
  detail: any;
}

const ProductDetailTabs: React.FC<Props> = ({
  productId,
  productType,
  detail,
}) => {
  const {
    reviews,
    submitReview,
    removeReview,
  } = useReview(productId);

  const handleSubmitReview = (rating: number, comment: string) => {
    submitReview({ productId, rating, comment });
  };

  const handleDeleteReview = (reviewId: number) => {
    removeReview(reviewId);
  };

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
        <ReviewSection
          reviews={reviews}
          onSubmitReview={handleSubmitReview}
          onDeleteReview={handleDeleteReview}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} className="mt-4" />;
};

export default ProductDetailTabs;
