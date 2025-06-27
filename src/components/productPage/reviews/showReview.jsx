import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Reusable star rating component
const StarRating = ({ value = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`bi ${i <= value ? 'bi-star-fill text-warning' : 'bi-star text-muted'} me-1`}
      ></i>
    );
  }
  return <span>{stars}</span>;
};

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/Reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  return (
    <div className="py-4">
      <h4 className="mb-3">Customer Reviews</h4>
      <div className="row g-3">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="col-12 col-md-6">
              <div className="border rounded p-3 shadow-sm h-100">
                <h5 className="text-dark fw-bold">{review.title || 'Untitled Review'}</h5>
                <hr />
                <p className="mb-2">{review.review || 'No description provided.'}</p>

                <div className="mb-3">
                  <strong className="d-block mb-2">Ratings</strong>
                  <div className="d-flex flex-column gap-2 small">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-truck me-2 text-primary"></i>
                      <span className="me-2">Delivery:</span>
                      <StarRating value={review.ratings?.delivery} />
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-box-seam me-2 text-success"></i>
                      <span className="me-2">Product:</span>
                      <StarRating value={review.ratings?.condition} />
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-currency-rupee me-2 text-danger"></i>
                      <span className="me-2">Value for Money:</span>
                      <StarRating value={review.ratings?.easeOfUse} />
                    </div>
                  </div>
                </div>

                {review.mediaLinks && review.mediaLinks.length > 0 ? (
                    <div className="mb-1">
                        <strong className="d-block mb-1">Media Uploaded:</strong>
                        <div className="d-flex flex-wrap ">
                        {review.mediaLinks.map((link, index) => (
                            <div
                            key={index}
                            className="border rounded  bg-white"
                            style={{ maxWidth: '160px' , }}
                            >
                            <img
                                src={link}
                                alt={`Media ${index + 1}`}
                                className="img-fluid rounded border"
                                style={{ maxWidth: '100%', height:"160px", objectFit:"contain" }}
                            />
                            </div>
                        ))}
                        </div>
                    </div>
                    ) : (
                    <div className="text-muted small">No media uploaded.</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">No reviews available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowReview;