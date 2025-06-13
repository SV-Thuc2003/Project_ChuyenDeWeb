import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";

interface Review {
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  reviews: Review[];
  onSubmitReview: (rating: number, comment: string) => void;
}

const ProductReviewSection: React.FC<Props> = ({ reviews, onSubmitReview }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating && comment) {
      onSubmitReview(rating, comment);
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="space-y-6">
      {reviews.map((r, i) => (
        <div key={i} className="bg-gray-100 p-4 rounded shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 font-medium text-blue-600">
                <span className="font-bold">@{r.username}</span>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={i < r.rating ? "fill-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-gray-700">{r.comment}</p>
            </div>
            <div className="text-sm text-gray-500">
              {format(new Date(r.createdAt), "yyyy-MM-dd HH:mm:ss")}
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded space-y-4">
        <h3 className="font-semibold text-gray-800">Gửi đánh giá của bạn</h3>

        <div>
          <label className="block mb-1 font-medium text-sm">Số sao:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value={0}>-- Chọn --</option>
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>
                {s} sao
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Bình luận:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            placeholder="Hãy chia sẻ cảm nhận của bạn..."
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
};

export default ProductReviewSection;
