import { useEffect, useState } from "react";

const AdminProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Products")
      .then((res) => res.json())
      .then((data) => setProductList(data))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center fw-bold">Product List</h3>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Specs</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => (
              <tr key={item.product_id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.product_name}
                    width="60"
                    height="60"
                    className="rounded border"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{item.brand_name}</td>
                <td>{item.product_name}</td>
                <td>{item.price}</td>
                <td>{item.catergory}</td>
                <td>
                  <ul className="mb-0 ps-3">
                    {item.specifications?.map((spec, idx) => (
                      <li key={idx}>{spec}</li>
                    ))}
                  </ul>
                </td>
                <td>{item.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductList;
