import { useEffect, useState } from 'react';

const FilterProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // 🔥 FIXED HERE
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  if (!products.length) return <p>Loading products...</p>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Product Catalog</h1>

      {products?.map((category, catIndex) => (
        <div key={catIndex} className="mb-5 d-flex container-fluid flex-wrap">
          <h2 className="text-primary">{category.categoryName}</h2>

          {category.subcategories?.map((subcat, subIndex) => (
            <div key={subIndex} className="ms-3 mb-4">
              <h4 className="text-secondary">{subcat.subcategoryName}</h4>

              {subcat.brands?.map((brand, brandIndex) => (
                <div key={brandIndex} className="ms-4 mb-3 d-flex flex-wrap">
                  <h5 className="text-dark">{brand.brandName}</h5>

                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {brand.products?.map((product, prodIndex) => (
                      <div key={prodIndex} className="col">
                        <div className="card " style={{width:"250px"}}>
                          <img
                            src={product.imagesCollection?.[0] || 'https://via.placeholder.com/200'}
                            className="card-img-top"
                            alt={product.productName}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.productName}</h5>
                            <p className="card-text">
                              <strong>Price:</strong> ₹{product.price} <br />
                              <strong>Discount:</strong> {product.discount} <br />
                              <strong>Color:</strong> {product.color} <br />
                              <strong>Size:</strong> {product.size}
                            </p>
                            <ul>
                              {product.specifications?.map((spec, i) => (
                                <li key={i}>{spec}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">{product.tags?.join(', ')}</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterProducts;
