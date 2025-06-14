import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryPage = () => {
    const { name } = useParams(); // e.g. "Power Bank", "Neckbands", etc.
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState(""); // "asc" or "desc"
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
            setFilteredProducts(result);
            setCurrentPage(1); // reset to first page on category change
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching category data:", err);
            setLoading(false);
        });
    }, [name]);

    // Sort logic
    let sortedProducts = [...filteredProducts];
    if (sortOption === "asc") {
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === "desc") {
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sortedProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

  return (
    <div className="container mt-5 py-5">
        <h2 className="mb-4">
            Showing Products for Category: {decodeURIComponent(name)}
        </h2>

      {/* Breadcrumbs */}
        <div className="mb-3">
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                {decodeURIComponent(name)}
                </li>
            </ol>
            </nav>
        </div>

        {/* Sorting + Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
            <label className="me-2">Sort by price:</label>
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="form-select d-inline-block w-auto"
            >
                <option value="">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
            </div>
            <div>
            <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
            >
                Prev
            </button>
            <button
                className="btn btn-outline-primary"
                disabled={
                currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)
                }
                onClick={() => setCurrentPage((prev) => prev + 1)}
            >
                Next
            </button>
            </div>
        </div>

        {/* Product Cards or Loader */}
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
            paginatedProducts.map((product) => (
                <div className="col-md-4 mb-3" key={product.id}>
                <div className="card h-100">
                    <img
                    src={product.imagesCollection?.[0]}
                    alt={product.productName}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text fw-semibold">₹{product.price}</p>
                    </div>
                </div>
                </div>
            ))
            ) : (
            <p className="text-center">No products found in this category.</p>
            )}
        </div>
    </div>
  );
};

export default CategoryPage;
