import axios from "axios";
import { useEffect, useState } from "react";

function EditReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/Reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch((err) => {
        console.log("Error deleting review", err);
      });
  };

  return (
    <div className="py-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">User ID</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Files</th>
            <th className="border border-gray-300 px-4 py-2">Content</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="border border-gray-300 px-4 py-2">{review.id}</td>
              <td className="border border-gray-300 px-4 py-2">{review.userId}</td>
              <td className="border border-gray-300 px-4 py-2">{review.rating}</td>
              <td className="border border-gray-300 px-4 py-2">{review.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                {review.files && review.files.length > 0 ? (
                  review.files.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline block"
                    >
                      {file.name || `File ${index + 1}`}
                    </a>
                  ))
                ) : (
                  "No files"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">{review.content}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(review.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditReview;