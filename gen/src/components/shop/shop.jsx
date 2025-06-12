import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FilterProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  if (!products.length) return <p>Loading products...</p>;

  // Create a Set to filter out duplicate categories
  const uniqueCategories = [...new Set(products.map(item => item.category))];

  return (
    <div className="py-4 mt-5">
      <div className="mb-3 px-2 ms-2 mt-5">Categories</div>
      <div className="py-2">
        <div className="container-fluid">
          <div className="row gy-2 d-flex flex-wrap px-4">
            {uniqueCategories.map((category) => (
              <Link to={""} className="col-12 col-md-6 col-lg-3 col-xl-3 card" key={category}>
                <div className="card-body">
                  <p className='fs-5 fw-bold'>{category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;