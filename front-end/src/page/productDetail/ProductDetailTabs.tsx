import React from "react";
import Tabs, { TabItem } from "../../components/ui/tabs";
import ProductTypeDetailDisplay from "./ProductTypeDetailDisplay";
import ReviewSection from "./ProductReviewSection";
import { ProductType } from "../../types/ProductDetail";
import { useReview } from "../../hooks/useReview";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      label: t("product.detail.specs"),
      content: (
          <ProductTypeDetailDisplay productType={productType} detail={detail} />
      ),
    },
    {
      id: "reviews",
      label: t("product.detail.reviews"),
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
