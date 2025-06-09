import { useEffect, useState } from "react";
import "./Testimony.css";

const Testimony = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <section className="testimony-section">
      <div className="container-fluid">
        <div className="row flex-lg-row-reverse g-0">
          {/* Right Column (taller to enable scroll) */}
          <div className="col-lg-6 bg-light min-vh-200">
            <div className="mt-5 py-3 d-none d-lg-block position-sticky" style={{ top: "100px" }}>
                <p className="display-4">
                    <em>See what our </em><mark>customers</mark><em> have to say?!</em>
                </p>
            </div>

          </div>

          {/* Left Column - Stacking cards */}
          <div className="col-lg-6 review-column px-4 d-none d-md-block">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="card stacked-review"
                style={{
                  zIndex: index + 1,
                }}
              >
                <div className="card-body p-4 shadow rounded-4 bg-white">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="icon-circle">
                      <i className={`${item.icons} text-primary`} style={{ fontSize: "1.5rem" }}></i>
                    </div>
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <small className="text-muted">{item.product}</small>
                    </div>
                  </div>
                  <p className="fst-italic text-muted">"{item.comment}"</p>
                  <div className="text-warning">
                    {"★".repeat(item.stars)}{"☆".repeat(5 - item.stars)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view - Horizontal scroll */}
          <div className="d-flex d-md-none overflow-auto flex-nowrap gap-3 py-4 px-2">
            {testimonials.map((item, index) => (
              <div key={index} className="card review-card-mobile flex-shrink-0" style={{ width: "80vw" }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="icon-circle">
                      <i className={`${item.icons} text-primary`} style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <small className="text-muted">{item.product}</small>
                    </div>
                  </div>
                  <p className="text-muted small fst-italic">"{item.comment}"</p>
                  <div className="text-warning small">
                    {"★".repeat(item.stars)}{"☆".repeat(5 - item.stars)}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimony;
