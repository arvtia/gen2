import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutView = () => {
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowToast(true);

    // Optional redirect after showing toast for a few seconds
    setTimeout(() => {
      setShowToast(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center shadow p-5 bg-white rounded-4">
        <h2 className="mb-3 text-dark">
          <i className="bi bi-box-arrow-right me-2"></i>Are you sure you want to log out?
        </h2>
        <p className="mb-4 text-muted">
          Click the button below to securely end your session.
        </p>
        <button className="btn btn-outline-danger px-4" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          className="toast show align-items-center position-fixed bottom-0 end-0 m-4 text-bg-success"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              You’ve been successfully logged out.
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutView;