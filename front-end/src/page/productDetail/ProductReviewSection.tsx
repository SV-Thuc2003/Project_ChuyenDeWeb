import React, { useState } from 'react';
import Button from "../../components/ui/Button";
interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  onSubmitReview: (rating: number, comment: string) => void;
  onDeleteReview: (reviewId: number) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    onSubmitReview(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>

      {/* Form gửi đánh giá */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-4 mb-6"
      >
        <div className="mb-4">
          <label htmlFor="rating" className="block font-medium mb-1">
            Số sao:
          </label>
          <select
            id="rating"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="">-- Chọn --</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block font-medium mb-1">
            Bình luận:
          </label>
          <textarea
            id="comment"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Hãy chia sẻ cảm nhận của bạn..."
          />
        </div>

        <Button
          type="submit"
          className="text-white font-semibold px-4 py-2 rounded"
        >
          Gửi đánh giá
        </Button>
      </form>

      {/* Danh sách đánh giá */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-4">
          Đánh giá ({reviews.length})
        </h4>
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 mb-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span className="font-semibold text-blue-600">{review.user}</span>
              <span className="text-yellow-500">
                {'⭐'.repeat(review.rating)} ({review.rating})
              </span>
              <span className="text-gray-400 text-xs">
                {new Date(review.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
            {/*<button*/}
            {/*  onClick={() => onDeleteReview(review.id)}*/}
            {/*  className="mt-2 text-red-500 text-sm hover:underline"*/}
            {/*>*/}
            {/*  Xoá*/}
            {/*</button>*/}
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
