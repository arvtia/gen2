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
    <div className="py-2 mt-2 bg-body-tertiary rounded-4">
      {/* <div className="mb-3 ps- py-3 mt-5 fs-5 fw-bold soft-blur text-dark ps-lg-5 ps-md-4 ps-4 pe-3 ">
            Shop by Categories 
      </div> */}
      <div className="py-2">
        <div className="container-fluid">
          <div className="row gy-2 d-flex flex-wrap px-lg-4 px-md-2">
                {uniqueCategories.map((category) => {
                    const categoryItem = products.find(item => item.category === category); // Find the first matching item
                    return (
                    <Link to={`/category/${encodeURIComponent(category)}`} className="col-12 col-sm-6 col-md-4 col-lg-3" key={category}>

                        <div className="p-2 soft-blur">
                            <div className="position-relative bg-white rounded">
                                {categoryItem && (
                                    <img 
                                    src={categoryItem.categoryImg} 
                                    alt={`Image for ${category}`} 
                                    className="img-fluid w-100 rounded p-3"
                                    style={{ height: "300px", objectFit: "contain" }}
                                    />
                                )}
                                <div className="position-absolute bottom-0 start-50 translate-middle-x soft-blur text-dark p-2 text-center w-100">
                                    <p className="fs-5 fw-bold mb-0 underline-expand">{category}</p>
                                </div>
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