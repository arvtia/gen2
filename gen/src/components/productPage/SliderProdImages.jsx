import { useState } from "react";

const ProductImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      {/* Main image with Bootstrap icon controls */}
      <div style={{ position: "relative", textAlign: "center", marginBottom: "1rem" }}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "400px", // Fixed height
            objectFit: "contain", // Maintain aspect without distortion
            borderRadius: "8px",
          }}
        />
        <button
          onClick={prevSlide}
          className="btn soft-blur position-absolute top-50 start-0 translate-middle-y"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          onClick={nextSlide}
          className="btn soft-blur position-absolute top-50 end-0 translate-middle-y"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Thumbnail images */}
      <div className="d-flex gap-2 justify-content-center overflow-auto">
        {images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              cursor: "pointer",
              border: currentIndex === index ? "2px solid #000" : "2px solid transparent",
              borderRadius: "4px",
              transition: "border 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;