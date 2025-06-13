import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { name } = useParams(); // "Power Bank", "Neckbands", etc.
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/products")
      .then((res) => res.json())
      .then((data) => {
        const result = data.filter(item => item.category === decodeURIComponent(name));
        setFilteredProducts(result);
      })
      .catch(err => console.error("Error fetching category data:", err));
  }, [name]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Showing Products for Category: {decodeURIComponent(name)}</h2>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card">
              <img
                src={product.imagesCollection?.[0]}
                alt={product.productName}
                className="card-img-top"
                style={{ height: "250px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">₹{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
