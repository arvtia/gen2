import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FilterProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  if (!products.length) return <p>Loading products...</p>;

  // ✅ Filter products that have both productName and price
  const validProducts = products.filter(
    (p) => p.productName && p.price
  );

  // ✅ Extract unique categories from valid products
  const uniqueCategories = [...new Set(validProducts.map(item => item.category))];

  return (
    <div id='CATEGORY_LIST' className="py-2 mt-2 bg-body-tertiary rounded-4">
      <div className="py-2">
        <div className="container-fluid">
          <div className="row gy-2 d-flex flex-wrap px-lg-4 px-md-2">
            {uniqueCategories.map((category) => {
              const categoryItem = validProducts.find(item => item.category === category);

              return (
                <Link
                  to={`/category/${encodeURIComponent(category)}`}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={category}
                >
                  <div className="p-2 soft-blur">
                    <div className="position-relative bg-white rounded">
                      {categoryItem && (
                        <>
                          <img
                            src={categoryItem.categoryImg}
                            alt={`Image for ${category}`}
                            className="img-fluid w-100 rounded p-3 very-soft-shadow"
                            style={{ height: "300px", objectFit: "contain" }}
                          />
                          <div className="position-absolute bottom-0 start-50 translate-middle-x soft-blur text-dark p-2 text-center w-100">
                            <p className="fs-5 fw-bold mb-0 underline-expand">{category}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;