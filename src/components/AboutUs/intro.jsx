import { useEffect, useState } from "react";

const Intro = () => {
  const [introData, setIntroData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/AboutUsPage")
      .then((res) => res.json())
      .then((data) => setIntroData(data))
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div className="py-4 ">
      {introData.map((item, index) => (
        <div
          key={index}
          className="container-fluid"
          style={{
            backgroundImage: `url(${item.background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "50vh",
          }}
        >
          <div className="row py-2 mx-auto h-100 align-items-center">
            <div className="col-12 col-lg-6 col-xl-5 mx-auto px-2 text-center">
              <p className="h1 fs-1 fw-bolder text-dark font-monospace">
                {item.text}
              </p>
              <p className="fs-6 text-white soft-blur py-3 px-3 text-wrap">
                {item["sub-title"]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Intro;
