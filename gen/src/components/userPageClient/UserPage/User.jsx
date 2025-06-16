import { Link } from "react-router-dom";
import './style.css';



const UserDashboard =() =>{
    return(
        <div className="pt-5">
            <div className="mt-3 bg-light">
                <div className="container-fluid">
                    <div className="d-flex">
                        <nav className="sidebar d-flex flex-column flex-shrink-0 position-fixed">
                            <button className="toggle-btn" onclick="toggleSidebar()">
                                <i class="bi bi-arrow-90deg-left"></i>
                            </button>
                            <div className="p-4">
                                <h4 className="logo-text fw-bold mb-0">{""}</h4>
                                <p className="text-muted small hide-on-collapse">Hello, {}</p>
                            </div>
                            <div className="nav flex-column">
                                <Link href="#" className="sidebar-link active text-decoration-none p-3">
                                    <i className="bi bi-home me-3" />
                                    <span className="hide-on-collapse">Account</span>
                                </Link>
                                <Link href="#" className="sidebar-link active text-decoration-none p-3">
                                    <i className="bi bi- me-3" />
                                    <span className="hide-on-collapse">Your Reviews</span>
                                </Link>
                                <Link href="#" className="sidebar-link active text-decoration-none p-3">
                                    <i className="bi bi-home me-3" />
                                    <span className="hide-on-collapse">Your List</span>
                                </Link>
                                <Link href="#" className="sidebar-link active text-decoration-none p-3">
                                    <i className="bi bi-home me-3" />
                                    <span className="hide-on-collapse">History</span>
                                </Link>
                                <Link href="#" className="sidebar-link active text-decoration-none p-3">
                                    <i className="bi bi-home me-3" />
                                    <span className="hide-on-collapse">Fav Items</span>
                                </Link>
                            </div>
                            <div className="profile-section mt-auto p-4">
                            <div className="d-flex align-items-center">
                                <img
                                src="https://randomuser.me/api/portraits/women/70.jpg"
                                style={{ height: 60 }}
                                className="rounded-circle"
                                alt="Profile"
                                />
                                <div className="ms-3 profile-info">
                                <h6 className="text-white mb-0">Alex Morgan</h6>
                                <small className="text-muted">Admin</small>
                                </div>
                            </div>
                            </div>
                        </nav>
                        <main className="main-content">
                            <div className="container-fluid">
                            <h2>Welcome to NexusFlow</h2>
                            <p className="text-muted">
                                Streamline your workflow with our intuitive dashboard.
                            </p>
                            </div>
                        </main>
                        </div>

                </div>
            </div>
        </div>

    )
}

export default UserDashboard;