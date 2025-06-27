import { useEffect, useState } from "react";
import './Section.css';

const Section1 = () => {
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/ContactUs")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0 && data[0].section1) {
          setSectionData(data[0].section1[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching ContactUs section1:", err);
      });
  }, []);

  if (!sectionData) return null;

  return (
    <>
    <div className="py-4 mt-5">
        <div className="mt-5">
            <p className="display-3 text-center text-wrap">
                Get in Touch with Us
            </p>
        </div>
    </div>
    </>
  );
};

export default Section1;
