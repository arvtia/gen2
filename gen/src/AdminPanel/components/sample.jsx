import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

const ProductsTable = () => {


  const [products, setProducts] = useState([]);
  const { id} = useParams()

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected API response structure:", data);
          setProducts([]);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Color</th>
              <th>Size</th>
              <th>Price</th>
              <th>Discount</th>
              <th>In Stock</th>
              <th>Specifications</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.brandName}</td>
                  <td>{product.category} - {product.subcategory}</td>
                  <td>{product.color}</td>
                  <td>{product.size}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className="badge bg-success">{product.discount}</span>
                  </td>
                  <td>{product.inStock === "y" ? "Yes" : "No"}</td>
                  <td>{product.specifications.join(", ")}</td>
                  <td>
                    {product.tags.map(tag => (
                      <span key={tag} className="badge bg-primary me-1">{tag}</span>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const Users = () =>{
    return(
        <div className="py-5 my-5">
            <h1 className="text-center display-2">Users section</h1>
            <div className="row py-2">
                <div className="col-12 col-lg-11 col-lx-11 justify-content-center">
                
                </div>
            </div>
            
        </div>
    )
}

const Settings =() =>{
    return(
        <div className="py-5 mt-5">
            <p className="text-center display-2 fw-bold"> Settings </p>
        </div>
    )
}


export  {ProductsTable , Users, Settings};