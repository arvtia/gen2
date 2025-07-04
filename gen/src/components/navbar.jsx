import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandNavbar from "./animated";
import { useSelector } from 'react-redux'
import SidebarCart from "./cart/SidebarCart";
import MainSearch from "./SearchBar/MainSearch";


const imgUser = [
  {
    id: 1,
    icon: "bi bi-person-fill",
  },
];

const Navbar = () => {

    const cartItems = useSelector(state => state.cart.items)
    const cartCount =  cartItems.length;
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
                  <Link className="nav-link fw-semibold text-dark underline-expand " to={link.path}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search and Bag */}
            <div className="d-flex align-items-center" role="search">
              <button
                type="button"
                className="btn zn-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ borderRadius: "50%" }}
              >
                <i className="bi bi-search"></i>
              </button>
                <div className="position-relative">
                    <button
                        type="button"
                        className="btn position-relative border-0"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#cartSidebar"
                        aria-controls="cartSidebar"
                        >
                        <i className="bi bi-bag"></i>
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartCount}
                            </span>
                        )}
                        </button>

                </div>
            </div>

            {/* User Avatar */}
            <div className="ms-3">
              {imgUser.map((item) => (
                <button
                  key={item.id}
                  onClick={handleUserNavigation}
                  className="btn p-0 border-0 bg-transparent"
                >
                  <i className={item.icon}> </i>
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

      {/* sarrch bar here the model thing  okay ?*/}
      <MainSearch />
      <SidebarCart />
    </>
  );
};

export default Navbar;