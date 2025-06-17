// import { useState } from "react";
// import { useReview } from "../../hooks/useReview";

// const ReviewSection = ({ productId }: { productId: number }) => {
//   const { reviews, submitReview, removeReview, loading, error } = useReview(productId);
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(5);

//   const handleSubmit = () => {
//     submitReview({ productId, comment, rating });
//     setComment("");
//   };

//   return (
//     <div>
//       <h3>Đánh giá sản phẩm</h3>
//       <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
//       <input
//         type="number"
//         min={1}
//         max={5}
//         value={rating}
//         onChange={(e) => setRating(Number(e.target.value))}
//       />
//       <button onClick={handleSubmit} disabled={loading}>Gửi đánh giá</button>
//       {error && <p>{error}</p>}
//       <ul>
//         {reviews.map((r) => (
//           <li key={r.id}>
//             {r.comment} - ⭐{r.rating}
//             <button onClick={() => removeReview(r.id)}>Xoá</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReviewSection;
import React, { useState } from 'react';

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
  onDeleteReview,
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
    <div>
      <h3>Đánh giá sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Số sao:
          <input type="number" value={rating} onChange={(e) => setRating(+e.target.value)} min={1} max={5} />
        </label>
        <label>
          Bình luận:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Gửi đánh giá</button>
      </form>

      <div>
        <h4>Các đánh giá</h4>
        {reviews.map((review) => (
          <div key={review.id}>
            <strong>{review.user}</strong> - {review.rating} sao
            <p>{review.comment}</p>
            <small>{new Date(review.createdAt).toLocaleString()}</small>
            <button onClick={() => onDeleteReview(review.id)}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;

