import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const CategoryPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3002/products")
      .then((res) => res.json())
      .then((data) => {
        const result = data.filter(
          (item) => item.category === decodeURIComponent(name)
        );
        setAllProducts(result);
        setCurrentPage(1);
      })
      .catch((err) => console.error("Error fetching category data:", err))
      .finally(() => setLoading(false));
  }, [name]);

  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedColor) {
      filtered = filtered.filter((product) => product.color === selectedColor);
    }

    if (selectedTag) {
        filtered = filtered.filter((product) =>
            product.tags
            .map((t) => t.trim().toLowerCase())
            .includes(selectedTag.trim().toLowerCase())
        );
    }

    setFilteredProducts(filtered);
  }, [allProducts, selectedColor, selectedTag]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "asc") return parseFloat(a.price) - parseFloat(b.price);
    if (sortOption === "desc") return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const getTagColor = (tag) => {
    switch (tag) {
      case "Top Sellers":
        return "text-info";
      case "Trending":
        return "text-danger";
      case "Smart Pick":
        return "text-success";
      default:
        return "text-dark";
    }
  };

  return (
    <div className="container mt-5 py-5" id="CATEGORY-PRICE-CART">
      <h2 className="mb-4">Showing Products for Category: {decodeURIComponent(name)}</h2>

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {decodeURIComponent(name)}
          </li>
        </ol>
      </nav>

      {/* Filters & Pagination */}
      <div className="row mb-3 align-items-center justify-content-between gx-2">
        <div className="col-12 col-lg-10">
          <div className="row g-2">
            {/* Price Sort */}
            <div className="col-12 col-sm-4">
              <label htmlFor="price-sort" className="form-label">Price</label>
              <select
                id="price-sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="form-select"
              >
                <option value="">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>

            {/* Color Filter */}
            <div className="col-12 col-sm-4">
              <label htmlFor="form-choose-color" className="form-label">Color</label>
              <select
                id="form-choose-color"
                name="colors"
                className="form-select"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Colors</option>
                {[
                  "Black", "White", "Gray", "Silver", "Blue", "Red", "Green", "Yellow",
                  "Gold", "Purple", "Pink", "Orange", "Transparent", "RGB / Multicolor"
                ].map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div className="col-12 col-sm-4">
              <label htmlFor="tag-filter" className="form-label">Tags</label>
              <select
                className="form-select"
                id="tag-filter"
                value={selectedTag}
                onChange={(e) => {
                  setSelectedTag(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Tags</option>
                <option value="Trending">Trending</option>
                <option value="Smart Pick">Smart Pick</option>
                <option value="Zen-gy Verified">Zen-gy Verified</option>
                <option value="Top Sellers">Top Sellers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="col-12 col-lg-2 d-flex justify-content-lg-end justify-content-start mt-2 mt-lg-0">
          <button
            className="btn btn-sm me-2 border-0"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn btn-sm border-0"
            disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="row">
        {loading ? (
          [...Array(6)].map((_, idx) => (
            <div className="col-md-4 mb-3" key={idx}>
              <div className="card placeholder-glow">
                <div
                  className="placeholder col-12"
                  style={{
                    height: "250px",
                    background: "#e0e0e0",
                    borderRadius: "0.5rem",
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title placeholder col-6"></h5>
                  <p className="card-text placeholder col-4"></p>
                </div>
              </div>
            </div>
          ))
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => {
            if (!product.productName || !product.price) return null;

            return (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-3 " id="CATEGORY/PRODUCTS/FILTER" key={product.id}>
                <div className="p-1 soft-blur">
                  <div className="card border-0 rounded-3 simple-box">
                    <Link to={`product/${product.id}`}>
                      <div className="p-1 position-relative soft-blur">
                        <img
                          src={product.imagesCollection?.[0]}
                          alt={product.productName}
                          className="card-img-top img-fluid rounded-3"
                          style={{ height: "auto", objectFit: "cover" }}
                        />
                        <div className={`badge soft-blur position-absolute top-0 start-50 ms-3 mt-2 ${getTagColor(product.tags)}`}>
                          {product.tags}
                        </div>
                      </div>
                    </Link>
                    <div className="card-body p-2">
                      <Link to={`product/${product.id}`} className="text-decoration-none fw-bold text-dark">
                        <p className="card-title underline-expand">{product.productName}</p>
                      </Link>
                      <p className="card-text fw-semibold m-0">₹{product.price}</p>
                      <div className="py-1 d-flex flex-wrap gx-2">
                        <div className="badge text-bg-secondary text-white">{product.color}</div>
                        <div className="badge text-bg-success text-white ms-1">{product.tags}</div>
                        <div className="badge text-bg-warning text-dark ms-1">{product.size}</div>
                      </div>
                      <button
                        data-bs-toggle="offcanvas"
                        data-bs-target="#cartSidebar"
                        aria-controls="cartSidebar"
                        onClick={() => dispatch(addToCart(product))}
                        className="btn bg-dark text-white font-monospace btn-outline-dark w-100 gx-2"
                      >
                        <i className="bi bi-bag me-2"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
