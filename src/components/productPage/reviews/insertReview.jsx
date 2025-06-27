
import { useState } from "react";

// Function to retrieve or create a user ID stored in a cookie
const getUserId = () => {
  const match = document.cookie.match(/userId=([^;]+)/);
  if (match) return match[1];

  const newId = btoa(Date.now() + Math.random().toString(36));
  document.cookie = `userId=${newId}; path=/; max-age=31536000`; // 1 year
  return newId;
};

const ReviewForm = () => {
  const [review, setReview] = useState('');
  const [title, setTitle] = useState('');
  const [ratings, setRatings] = useState({
    delivery: 0,
    condition: 0,
    easeOfUse: 0,
  });
  const [mediaLinks, setMediaLinks] = useState(['']);

  const handleRatingChange = (field, value) => {
    setRatings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = getUserId(); // Retrieve userId from cookies or generate one

    console.log({
      title,
      review,
      ratings,
      userId, // Include userId with the review submission
    });

    // Here you can dispatch or post the data to your backend API
    // For example:
    fetch('http://localhost:3001/Reviews', {
        method: 'POST',
        body: JSON.stringify({ title, review, ratings, mediaLinks, userId }),
        headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-light">
      <h4 className="mb-4 text-primary"><i className="bi bi-star"></i> Write a Review</h4>
      
      <div className="mb-3">
        <label className="form-label">Product</label>
        <input type="text" className="form-control" value="Static Product Name" disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">Review Title</label>
        <input 
          type="text" 
          className="form-control" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Summarize your review" 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Your Review</label>
        <textarea 
          className="form-control" 
          rows="4" 
          value={review} 
          onChange={(e) => setReview(e.target.value)} 
          placeholder="Share your experience..." 
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Ratings</label>
        {['delivery', 'condition', 'easeOfUse'].map(category => (
          <div key={category} className="mb-3">
            <strong className="me-2 text-capitalize">{category.replace(/([A-Z])/g, ' $1')}:</strong>
            <div className="d-flex align-items-center">
              {[1,2,3,4,5].map(num => (
                <label key={num} className="me-1">
                  <input 
                    type="radio" 
                    name={category} 
                    value={num} 
                    checked={ratings[category] === num}
                    onChange={() => handleRatingChange(category, num)} 
                    className="form-check-input" 
                  /> 
                  <i 
                    size={18} 
                    color={ratings[category] >= num ? "#ffc107" : "#e4e5e9"} 
                    className="bi bi-star"
                  ></i>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

        <div className="mb-3">
            <label className="form-label">Media Links (Images or Videos)</label>
            {mediaLinks.map((link, index) => (
                <div key={index} className="input-group mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Paste image or video link"
                    value={link}
                    onChange={(e) => {
                    const newLinks = [...mediaLinks];
                    newLinks[index] = e.target.value;
                    setMediaLinks(newLinks);
                    }}
                />
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                    const newLinks = mediaLinks.filter((_, i) => i !== index);
                    setMediaLinks(newLinks);
                    }}
                >
                    <i className="bi bi-x"></i>
                </button>
                </div>
            ))}
            <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setMediaLinks([...mediaLinks, ''])}
            >
                <i className="bi bi-plus-circle"></i> Add Another Link
            </button>
        </div>

      <button type="submit" className="btn btn-primary w-100 mt-3">
        <i className="bi bi-star"></i> Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
