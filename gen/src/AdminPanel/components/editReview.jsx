import axios from "axios";
import { useEffect, useState } from "react";

// Reusable star rating component with Bootstrap icons
const StarRating = ({ value = 0 }) => (
  <span aria-label={`Rated ${value} out of 5`} role="img">
    {[...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi ${i < value ? 'bi-star-fill text-warning' : 'bi-star text-muted'} me-1`}
      />
    ))}
  </span>
);

function EditReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log("Error fetching data", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/Reviews/${id}`)
      .then(() => {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      })
      .catch((err) => console.log("Error deleting review", err));
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Review Management</h3>
      <div className="row g-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="col-12 col-md-6 col-lg-4"
          >
            <div className="border rounded p-3 h-100 shadow-sm bg-white d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold mb-1">{review.title || 'Untitled Review'}</h5>
                <p className="text-muted small mb-2">User: <code>{review.userId}</code></p>
                <p className="mb-3">{review.review || 'No description provided.'}</p>

                {review.ratings && (
                  <div className="mb-3 small">
                    <strong>Ratings:</strong>
                    <div className="mt-1 d-flex flex-column gap-1">
                      <div className="d-flex align-items-center">
                        <span className="me-2">Delivery:</span>
                        <StarRating value={review.ratings.delivery} />
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="me-2">Condition:</span>
                        <StarRating value={review.ratings.condition} />
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="me-2">Ease of Use:</span>
                        <StarRating value={review.ratings.easeOfUse} />
                      </div>
                    </div>
                  </div>
                )}

                {review.mediaLinks?.length > 0 && (
                  <div className="mb-2">
                    <strong className="d-block">Media:</strong>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                      {review.mediaLinks.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`Review Media ${i + 1}`}
                          className="rounded border"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                className="btn btn-sm btn-danger mt-3 align-self-start"
                onClick={() => handleDelete(review.id)}
              >
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditReview;