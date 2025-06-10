import { Link } from 'react-router-dom';

const AdminNavbar =()=> {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/admin">
          🛠 Admin Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link" to="/productList">
                🧾 Product List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/category">
                🗂 Category
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/edit">
                ✏️ Edit Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default AdminNavbar;