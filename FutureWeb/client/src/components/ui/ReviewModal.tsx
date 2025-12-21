import { useState } from "react";
import { useAuth } from "../../lib/stores/useAuth";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ReviewModal({ isOpen, onClose, onSuccess }: ReviewModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
          rating,
          comment,
        }),
      });

      if (response.ok) {
        setRating(5);
        setComment("");
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="review-overlay" onClick={onClose}></div>
      <div className="review-modal">
        <div className="review-header">
          <h2 className="review-title">LEAVE A REVIEW</h2>
          <button className="review-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="review-field">
            <label className="review-label">Rating:</label>
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${rating >= star ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="review-field">
            <label className="review-label">Comment:</label>
            <textarea
              className="review-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about the site..."
              rows={5}
              required
            />
          </div>

          <div className="review-actions">
            <button type="button" className="review-cancel" onClick={onClose}>
              CANCEL
            </button>
            <button type="submit" className="review-submit" disabled={isSubmitting}>
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
