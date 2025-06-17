import { useState, useEffect } from "react";
import { createReview, getReviewsByProduct, deleteReview } from "../Service/review";
import { useAuth } from "../contexts/AuthContext";

export interface ReviewRequest {
  productId: number;
  comment: string;
  rating: number;
}

export const useReview = (productId: number) => {
  const { token, username } = useAuth();
  const [userId, setUserId] = useState<number | null>(null); // giả định bạn đã lưu userId vào localStorage khi login
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(Number(storedId));
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getReviewsByProduct(productId);
      setReviews(res);
    } catch (err) {
      setError("Lỗi khi tải đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (data: ReviewRequest) => {
    if (!token || userId === null) {
      setError("Bạn cần đăng nhập để đánh giá");
      return;
    }
    try {
      setLoading(true);
      await createReview(userId, data, token);
      await fetchReviews();
    } catch (err) {
      setError("Không thể gửi đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const removeReview = async (reviewId: number) => {
    if (!token || userId === null) return;
    try {
      await deleteReview(reviewId, userId, token);
      await fetchReviews();
    } catch (err) {
      setError("Không thể xoá đánh giá");
    }
  };

  return {
    reviews,
    loading,
    error,
    submitReview,
    removeReview,
    refresh: fetchReviews,
  };
};
