import { Link } from "react-router"; // use 'react-router-dom' if using React Router v6+

const Footer = () => {
  return (
    <footer className="py-4 bg-light text-dark">
      <div className="container-fluid">
        {/* Top Section */}
        <div className="row gy-4">
          {/* About & Support */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="row">
              <div className="col-6">
                <h6 className="fw-bold">About</h6>
                <ul className="list-unstyled small">
                  <li>Blog</li>
                  <li>Meet The Team</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div className="col-6">
                <h6 className="fw-bold">Support</h6>
                <ul className="list-unstyled small">
                  <li>Contact Us</li>
                  <li>Shipping</li>
                  <li>Return</li>
                  <li>FAQ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Description + Socials */}
          <div className="col-12 col-md-6 col-lg-4">
            <p className="text-secondary small">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="d-flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Link key={i} to="#" className="btn btn-dark rounded-pill text-white">
                  <i className="bi bi-twitter-x"></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Bottom Section */}
        <div className="row gy-3 align-items-center text-center text-md-start">
          <div className="col-12 col-md-6 col-lg-4">
            <p className="mb-0 fw-semibold">© 2025 Gen-gy.co.in</p>
          </div>
          <div className="col-12 col-md-6 col-lg-4 ms-md-auto d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-3">
            <p className="mb-0 fw-semibold">Terms of Service</p>
            <p className="mb-0 fw-semibold">Privacy & Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
