import { Link } from 'react-router-dom';

const AdminNavbar =()=> {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/admin">
            🛠 Admin Panel
            </Link>

            

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/:id">
                            logout
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  );
}


export default AdminNavbar;