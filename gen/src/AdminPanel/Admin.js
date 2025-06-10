import { Link, Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="p-0 container-fluid">
      

      {/* Admin Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/settings">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Nested Route Content Loads Here */}
      <Outlet />
    </div>
  );
};

export default AdminHome;

      



