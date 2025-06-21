// ProductPage.jsx
import React, { useEffect, useState } from "react";
import ProductImageSlider from "./ProductImageSlider";

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3002/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <ProductImageSlider images={product.imagesCollection} />
    </div>
  );
};

export default ProductPage;