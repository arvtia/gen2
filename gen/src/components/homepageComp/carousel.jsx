import { useState, useEffect } from "react";
import './style.css';

const CarouselLast = () => {
  const [products, setProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);
  const [cardsToShow, setCardsToShow] = useState(3); // Default is 3 cards

  // Fetch data
  useEffect(() => {
    fetch('http://localhost:5000/Products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error('Failed to fetch products:', err);
      });
  }, []);

  // Handle responsiveness
  useEffect(() => {
    const updateVisibleCards = () => {
      const newCardsToShow = window.innerWidth <= 768 ? 1 : 3;
      setCardsToShow(newCardsToShow);

      // Reset visibleCards when screen size changes
      const newVisible = [];
      for (let i = 0; i < newCardsToShow; i++) {
        newVisible.push(i);
      }
      setVisibleCards(newVisible);
    };

    window.addEventListener("resize", updateVisibleCards);
    updateVisibleCards(); // Initial check

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handleNext = () => {
    const lastIndex = visibleCards[visibleCards.length - 1];
    if (lastIndex < products.length - 1) {
      const newVisible = visibleCards.map((i) => i + 1);
      setVisibleCards(newVisible);
    }
  };

  const handlePrev = () => {
    if (visibleCards[0] > 0) {
      const newVisible = visibleCards.map((i) => i - 1);
      setVisibleCards(newVisible);
    }
  };

  return (
    <div className="carousel-wrapper mt-3 mb-2">
      <div className="navigation-buttons justify-content-end ms-5">
        <button className="nav-btn btn border-0" onClick={handlePrev} disabled={visibleCards[0] === 0}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <button
          className="nav-btn btn border-0"
          onClick={handleNext}
          disabled={visibleCards[visibleCards.length - 1] >= products.length - 1}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      <div className="card-container container-fluid px-3">
        {visibleCards.slice(0, cardsToShow).map((index) => {
          const product = products[index];
          if (!product) return null;
          return (
            <div key={product.id || index} className="product-card card">
              <div className="card-content card-body">
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="product-image img-fluid rounded-3"
                  style={{ width: "100%", height: "280px", objectFit: "cover" }}
                />
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="product-title fw-bold text-start ps-2">{product.product_name}</h5>
                  <p className="fs-6 fw-bold">{product.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarouselLast;
