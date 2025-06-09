import { Link } from "react-router";
import BrandNavbar from "./animated";

const imgUser = [
  {
    id: 1,
    img: "https://imresizer.com/_next/image?url=%2Fimages%2Fsample-photo-1.jpg&w=3840&q=75",
  },
];

// Dynamic nav links
const navLinks = [
  { id: 1, name: "Home", path: "/", icon: "bi-house" },
  { id: 2, name: "Shop", path: "/shop", icon: "bi-bag" },
  { id: 3, name: "About", path: "/about", icon: "bi-info-circle" },
  { id: 4, name: "Contact", path: "/contact", icon: "bi-telephone" },
];

const Navbar = () => {
  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar soft-blur fixed-top py-1">
        <div className="container bg-white rounded-3 my-1">
          <Link
            to={""}
            className="navbar-brand overflow-hidden d-flex align-items-center"
          >
            <BrandNavbar />
            <p className="fs-4 fw-bold font-monospace mt-2 ms-1">GEN-nGY</p>
          </Link>

          <div className="d-flex align-items-center ms-auto">
            {/* Nav Links (visible on large screens only) */}
            <ul className="navbar-nav flex-row me-3 d-none d-lg-flex">
              {navLinks.map((link) => (
                <li key={link.id} className="nav-item px-2">
                  <Link className="nav-link fw-semibold text-dark" to={link.path}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search and Bag icons */}
            <form className="d-flex align-items-center" role="search">
              <div className="btn simple-shadow" style={{ borderRadius: "50%" }}>
                <span>
                  <i className="bi bi-search"></i>
                </span>
              </div>
              <div className="btn">
                <span>
                  <i className="bi bi-bag"></i>
                </span>
              </div>
            </form>

            {/* User Image */}
            <div className="ms-3">
              {imgUser.map((item) => (
                <span key={item.id}>
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
                </span>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar (visible only on mobile & tablet) */}
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
    </>
  );
};

export default Navbar;
