import { useEffect, useState } from "react";

const OurStory = () => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/AboutUsPage")
      .then((res) => res.json())
      .then((data) => setStoryData(data))
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  if (!storyData) return <p>Loading...</p>; // Show a loader while data fetches

  return (
    <section className="container my-5">
      {storyData.map((story, index) => (
        <div key={index} className="row  mb-5 justify-content-center">
          {/* Text on the left */}
          <div className="col-12 col-lg-5 mb-4 mb-lg-0">
            <div className="this-content">
                <h4 className="display-4 fw-bolder">{story.ourStorytitle}</h4>
                <p className="fst-italic text-secondary">{story.ourStory}</p>
            </div>
          </div>

          {/* Image on the right */}
          <div className="col-12 col-lg-6 text-center">
            <img
              src={story.ourStoryImage}
              alt={story.ourstoryimagetitle}
              className="img-fluid rounded-4"
              style={{  objectFit: "cover" }}
            />
            <p className="text-muted mt-2 small fst-italic">{story.imageCaption}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default OurStory;