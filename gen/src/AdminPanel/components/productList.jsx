import { useEffect, useState } from "react";

const AdminProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/products")
      .then((res) => res.json())
      .then((data) => setProductList(data))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  return (
    <div className="py-5 my-5">
      <p className="display-2">Product List</p>
      <div className="mt-2">
        <div className="col-12 col-lg-12 col-xl-12 overflow-x-scroll">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Brand</th>
                <th>Product Name</th>
                <th>Color</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Specifications</th>
                <th>Tags</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((category) =>
                category.subcategories.map((subcategory) =>
                  subcategory.brands.map((brand) =>
                    brand.products.map((product, index) => (
                      <tr key={index}>
                        <td>{category.categoryName}</td>
                        <td>{subcategory.subcategoryName}</td>
                        <td>{brand.brandName}</td>
                        <td>{product.productName}</td>
                        <td>{product.color}</td>
                        <td>${product.price}</td>
                        <td>{product.discount}</td>
                        <td>{product.inStock === "y" ? "Available" : "Out of Stock"}</td>
                        <td>{product.specifications.join(", ")}</td>
                        <td>{product.tags.join(", ")}</td>
                        <td>
                          {product.imagesCollection.map((img, imgIndex) => (
                            <img key={imgIndex} src={img} alt="Product" style={{ width: "50px", marginRight: "5px" }} />
                          ))}
                        </td>
                      </tr>
                    ))
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;