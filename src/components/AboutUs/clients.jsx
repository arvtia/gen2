import { useEffect, useState } from "react";
import "./style.css";

const API_URL = "http://localhost:3002/AboutUsPage";

const PartnerMarquee = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const ourClientData = data?.[0]?.ourClient || [];
        setClients(ourClientData);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Our Trusted Partners</h2>
        <p className="text-muted">Collaborating with brands around the world</p>
      </div>

      <div className="partner-marquee-wrapper overflow-hidden">
        <div className="d-flex partner-marquee-track align-items-center">
          {clients.concat(clients).map((client, index) => (
            <div className="partner-card mx-3 my-3" key={index}>
              <div className="card  shadow-sm p-3 rounded-4 bg-white">
                <img
                  src={client.logoImage}
                  alt={`Client Logo ${index + 1}`}
                  className="img-fluid partner-logo mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerMarquee;
