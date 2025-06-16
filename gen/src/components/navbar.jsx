import { Link } from "react-router-dom";
import BrandNavbar from "./animated";
import { useEffect, useState } from "react";

const imgUser = [
  {
    id: 1,
    img: "https://imresizer.com/_next/image?url=%2Fimages%2Fsample-photo-1.jpg&w=3840&q=75",
  },
];

// Dynamic nav links

const Navbar = () => {

    const [ navLinks, setNavLinks] = useState ([]);

    useEffect(() => {
    fetch('http://localhost:3002/navLinks')
        .then((res) => res.json())
        .then((data) => setNavLinks(data))
        .catch((err) => {
        console.error("Error occurred while fetching data:", err);
        });
    }, []);


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
            <p className="fs-4 fw-bold font-monospace mt-2 ms-1">Zen-gy</p>
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
              
                <button
                    type="button"
                    className="btn zn-3"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    style={{ borderRadius: "50%" }}
                >
                <span>
                  <i className="bi bi-search"></i>
                </span>
                    
                </button>



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
        <>
        {/* modal view */}
        <>
  {/* Modal */}
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

                    <div className="modal-body">
                    <div className="py-1">
                        {
                            //search result must appear here - after integreating - backend 
                        }
                    </div>


                    </div>
                </div>
            </div>
        </div>
        </>

        </>

    </>
  );
};

export default Navbar;
