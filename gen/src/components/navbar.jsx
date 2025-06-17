import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandNavbar from "./animated";

const imgUser = [
  {
    id: 1,
    img: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
  },
];

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/navLinks")
      .then((res) => res.json())
      .then((data) => setNavLinks(data))
      .catch((err) => {
        console.error("Error occurred while fetching data:", err);
      });
  }, []);

  const handleUserNavigation = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((users) => {
        const matched = users.find(
          (user) =>
            user.email === storedUser.email &&
            user.password === storedUser.password
        );

        if (matched) {
          navigate("/user");
        } else {
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("User validation failed:", err);
        navigate("/login");
      });
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar soft-blur fixed-top py-1">
        <div className="container bg-white rounded-3 my-1">
          <Link
            to="/"
            className="navbar-brand overflow-hidden d-flex align-items-center"
          >
            <BrandNavbar />
            <p className="fs-4 fw-bold font-monospace mt-2 ms-1">Zen-gy</p>
          </Link>

          <div className="d-flex align-items-center ms-auto">
            {/* Nav Links */}
            <ul className="navbar-nav flex-row me-3 d-none d-lg-flex">
              {navLinks.map((link) => (
                <li key={link.id} className="nav-item px-2">
                  <Link className="nav-link fw-semibold text-dark" to={link.path}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search and Bag */}
            <form className="d-flex align-items-center" role="search">
              <button
                type="button"
                className="btn zn-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ borderRadius: "50%" }}
              >
                <i className="bi bi-search"></i>
              </button>
              <div className="btn">
                <i className="bi bi-bag"></i>
              </div>
            </form>

            {/* User Avatar */}
            <div className="ms-3">
              {imgUser.map((item) => (
                <button
                  key={item.id}
                  onClick={handleUserNavigation}
                  className="btn p-0 border-0 bg-transparent"
                >
                  <img
                    src={item.img}
                    alt="user"
                    className="img-fluid img-user-phone"
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav className="navbar navbar-light bg-white border-top fixed-bottom d-lg-none">
        <div className="container justify-content-around">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className="text-center text-dark text-decoration-none"
            >
              <i className={`bi ${link.icon} fs-4`}></i>
            </Link>
          ))}
        </div>
      </nav>

      {/* Modal for Search */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <div className="input-group w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button className="btn btn-outline-dark" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <button
                type="button"
                className="btn-close ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-1">
              {/* Search results will appear here once integrated */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;