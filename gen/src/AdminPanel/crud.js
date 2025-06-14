import { useEffect, useState } from "react";
import './Table.css'

const AdminProductList = () => {

    const initialProductState = {
        productName: "",
        price: 0,
        color: "",
        discount: 0,
        size: "",
        inStock: "",
        category: "",
        categoryImg: "",
        subcategory: "",
        brand: "",
        specifications: [],
        tags: [],
        imagesCollection: [],
    };


    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(initialProductState);



    // Fetch Products from API
    useEffect(() => {
        fetch("http://localhost:3002/products")
        .then((res) => res.json())
        .then((data) => setProductList(data))
        .catch((err) => console.error("Failed to fetch products:", err));
    }, [productList]); // Auto-refresh when product list changes

  // Handle Delete
    const handleDelete = (id) => {
        fetch(`http://localhost:3002/products/${id}`, { method: "DELETE" })
        .then(() => {
            setProductList((prevList) => prevList.filter((product) => product.id !== id)); // Ensuring update persists
            console.log("Product deleted successfully");
        })
        .catch((err) => console.error("Failed to delete product:", err));
    };

    // Handle Update
    const handleUpdate = (id) => {
        fetch(`http://localhost:3002/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProduct),
        
        })
        .then(() => {
            setProductList((prevList) =>
            prevList.map((product) =>
                product.id === selectedProduct.id ? selectedProduct : product
            )
            );
            setSelectedProduct(null);
            console.log("Product updated successfully");
        })
        .catch((err) => console.error("Failed to update product:", err));
    };

  // Handle Add New Product
    const handleAdd = (e) => {
        e.preventDefault();

        const productWithId = { ...newProduct, id: Date.now() };

        fetch("http://localhost:3002/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productWithId),
        })
            .then(() => {
            setProductList((prevList) => [...prevList, productWithId]);
            setNewProduct(initialProductState); // ✅ Reset with full structure
            console.log("Product added successfully");
            })
            .catch((err) => console.error("Failed to add product:", err));
    };


  return (
    <div className="py-5 my-5">
      <p className="display-2 ">Product List</p>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
            <tr>
                <th>Product Name</th>
                <th>Color</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Size</th>
                <th>In Stock</th>
                <th>Category</th>
                <th>Category Image</th>
                <th>Subcategory</th>
                <th>Brand</th>
                <th className="w-50">Specifications</th>
                <th>Tags</th>
                <th className="w-25">Images Collection</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {productList.map((product) => (
                <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.color}</td>
                <td>${product.price}</td>
                <td>{product.discount}</td>
                <td>
                    {Array.isArray(product.size) ? product.size.join(", ") : product.size || "N/A"}
                </td>
                <td>{product.inStock}</td>
                <td>{product.category}</td>
                <td>
                    <img
                    src={product.categoryImg}
                    alt="category"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                </td>
                <td>{product.subcategory}</td>
                <td>{product.brand}</td>
                
                <td className="p-1 tooltip-container">
                    Hover me
                    <div className="tooltip-content">
                        <ul>
                        {product.specifications.map((spec, i) => (
                            <li key={i} className="text-start">{spec}</li>
                        ))}
                        </ul>
                    </div>
                </td>

                <td>
                    <ul>
                    {product.tags.map((tag, i) => (
                        <li key={i}>{tag}</li>
                    ))}
                    </ul>
                </td>
                <td>
                    <div className="d-flex overflow-x-scroll gap-2">
                    {product.imagesCollection.map((img, i) =>
                        typeof img === "string" && img ? (
                        <img
                            key={i}
                            src={img}
                            alt={`product-img-${i}`}
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        ) : null
                    )}
                    </div>
                </td>
                <td className="cupid-case d-flex align-items-center">
                    <button
                        className="btn bg-primary text-white me-2"
                        onClick={() => setSelectedProduct(product)}
                    >
                    Edit
                    </button>
                    <button
                        className="btn text-white bg-danger bg-hover-dark"
                        onClick={() => handleDelete(product.id)}
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>


      {selectedProduct && (
            <div className="mt-4 col-12 col-lg-9 col-xl-10 mx-auto p-4 border rounded bg-light" id="EDIT_PRODUCT_FORM">
                <h4>Edit Product</h4>
                <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={selectedProduct.productName}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={selectedProduct.price}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input
                        type="text"
                        className="form-control"
                        value={selectedProduct.color}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, color: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Discount (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={selectedProduct.discount}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, discount: parseFloat(e.target.value) })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Size</label>
                    <input
                        list="size"
                        type="text"
                        className="form-control"
                        value={selectedProduct.size}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, size: e.target.value.split(",") })}
                    />
                    <datalist id="size">
                    <option value="Small" />
                    <option value="Medium" />
                    <option value="Large" />
                    <option value="Ergonomic" />
                    </datalist>
                </div>

                <div className="mb-3">
                    <label className="form-label">Stock Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={selectedProduct.inStock}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, inStock: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        value={selectedProduct.category}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    />
                </div>
                {/* Category Image /Input - duplicated - in a similar way */}
               <input
                    type="text"
                    className="form-control"
                    placeholder="Insert image of category"
                    value={selectedProduct.categoryImg}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, categoryImg: e.target.value })}
                />


                <div className="mb-3">
                    <label className="form-label">Subcategory</label>
                    <input
                        type="text"
                        className="form-control"
                        value={selectedProduct.subcategory}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, subcategory: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <input
                    type="text"
                    className="form-control"
                    value={selectedProduct.brand}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tags</label>
                    <select
                        multiple
                        className="form-select"
                        value={selectedProduct.tags}
                        onChange={(e) =>
                        setSelectedProduct({
                        ...selectedProduct,
                        tags: Array.from(e.target.selectedOptions, (option) => option.value),
                        })
                    }
                    >
                    <option value="Smart Pick">Smart Pick</option>
                    <option value="Zen-Gy Verified">Zen-Gy Verified</option>
                    <option value="Trending">Trending</option>
                    <option value="Top Sellers">Top Sellers</option>
                    </select>
                </div>

                {/* Specifications Input List */}
                <div className="mb-3 d-flex flex-column">
                    <label className="form-label">Specifications</label>
                    {selectedProduct.specifications.map((spec, index) => (
                    <div key={index} className="input-group mb-1">
                        <input
                            type="text"
                            className="form-control"
                            value={spec}
                            onChange={(e) => {
                                const specs = [...selectedProduct.specifications];
                                specs[index] = e.target.value;
                                setSelectedProduct({ ...selectedProduct, specifications: specs });
                        }}
                        />
                        <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                            const specs = selectedProduct.specifications.filter((_, i) => i !== index);
                            setSelectedProduct({ ...selectedProduct, specifications: specs });
                        }}
                        >
                        <i className="bi bi-x"></i>
                        </button>
                    </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setSelectedProduct({ ...selectedProduct, specifications: [...selectedProduct.specifications, ""] })}
                    >
                    Add specifications
                    </button>
                </div>

                {/* Image collection links */}
                <div className="mb-3 d-flex flex-column">
                    <label className="form-label">Image Collection</label>
                    {selectedProduct.imagesCollection.map((spec, index) => (
                    <div key={index} className="input-group mb-1">
                        <input
                        type="text"
                        className="form-control"
                        value={spec}
                        onChange={(e) => {
                            const specs = [...selectedProduct.imagesCollection];
                            specs[index] = e.target.value;
                            setSelectedProduct({ ...selectedProduct, imagesCollection: specs });
                        }}
                        />
                        <button
                        type="button"
                        className="btn"
                        onClick={() => {
                            const specs = selectedProduct.imagesCollection.filter((_, i) => i !== index);
                            setSelectedProduct({ ...selectedProduct, imagesCollection: specs });
                        }}
                        >
                        <i className="bi bi-x"></i>
                        </button>
                        <small className="form-text text-muted">paste link here</small>
                    </div>
                    ))}
                    <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedProduct({ ...selectedProduct, imagesCollection: [...selectedProduct.imagesCollection, ""] })}
                    >
                    Add images
                    </button>
                </div>

                <button type="submit" className="btn btn-success w-100">Save Changes</button>
                </form>
            </div>
            )}


    {/* separation -  add product in the field */}

        <div>
            <div className="row py-2 mt-4 mx-auto">
                <div className="col-12 col-lg-9 col-xl-9 p-lg-5 mx-auto mt-3 ">
                    <form onSubmit={handleAdd} className="p-4 mt-3 border rounded bg-light" id="ADD_PRODUCT_FORM">
                        <p className="fs-2"> Add a New Product</p>
                        {/* Product Name */}
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter product name"
                                value={newProduct.productName}
                                onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                                required
                            />
                        </div>

                        {/* Product Color */}
                        <div className="mb-3">
                            <label className="form-label">Product Color</label>
                            <input
                                type="text"
                                list="colors"
                                className="form-control"
                                placeholder="Enter product color"
                                value={newProduct.color}
                                onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                                required
                            />
                            <datalist id="colors">
                                <option value="Black" />
                                <option value="White" />
                                <option value="Gray" />
                                <option value="Silver" />
                                <option value="Blue" />
                                <option value="Red" />
                                <option value="Green" />
                                <option value="Yellow" />
                                <option value="Gold" />
                                <option value="Purple" />
                                <option value="Pink" />
                                <option value="Orange" />
                                <option value="Transparent" />
                                <option value="RGB / Multicolor" />
                            </datalist>
                        </div>

                        {/* product size- */}
                        <div className="mb-3">
                            <label className="form-label">Size</label>
                            <input
                                list="size"
                                className="form-control"
                                type="text"
                                placeholder="Enter product description"
                                value={newProduct.size}
                                onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                                required
                            />
                            <datalist id="size">
                                <option value="Small" />
                                <option value="Medium" />
                                <option value="Large" />
                                <option value="Ergonimic" />
                            </datalist>
                        </div>

                        {/* Discount */}
                        <div className="mb-3">
                            <label className="form-label">Discount (%)</label>
                            <input
                            type="number"
                            className="form-control"
                            placeholder="Enter discount"
                            value={newProduct.discount}
                            onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                            required
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                            type="number"
                            className="form-control"
                            placeholder="Enter price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Product Description</label>
                            <textarea
                            className="form-control"
                            placeholder="Enter product description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            required
                            />
                        </div>

                        {/* Stock Quantity */}
                        <div className="mb-3">
                            <label className="form-label">Stock Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter stock quantity"
                                value={newProduct.inStock}
                                onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.value })}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input
                                list="Category"
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            />
                            <datalist id="Category">
                                <option value="TWS" />
                                <option value="Neckband" />
                                <option value="Sound Bars" />
                                <option value="Speakers" />
                                <option value="Headphones" />
                                <option value="wired earphone" />
                                <option value="bluetooth speaker" />
                                <option value="Party Speaker" />
                                <option value="Charger" />
                                <option value="Data cables" />
                                <option value="Power Bank" />
                                <option value="Wireless car play" />
                            </datalist>
                        </div>

                        {/* Category Image /Input - duplicated - in a similar way */}
                        <div className="mb-3">
                            <label className="form-label">Category Image</label>
                            <input
                                type="text"
                                list="CatImg"
                                className="form-control"
                                placeholder="insert category image link"
                                value={newProduct.categoryImg}
                                onChange={(e) => setNewProduct({ ...newProduct, categoryImg: e.target.value })}
                            />
                            <datalist  id="CatImg">
                                <option value="N/A" />
                            </datalist>
                        </div>

                        {/* Subcategory */}
                        <div className="mb-3">
                            <label className="form-label">Subcategory</label>
                            <input
                                list="Subcategory"
                                type="text"
                                className="form-control"
                                placeholder="Category Image paste your link here"
                                value={newProduct.subcategory}
                                onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                            />
                            <datalist id="Subcategory">
                                <option value="Party Speaker" />
                                <option value="Neck band" />
                                <option value="Sound Bar" />
                                <option value="Chargers" />
                                <option value="Wireless Earphones" />
                                <option value="Bluetooth Speaker" />
                                <option value="Earbuds"></option>
                            </datalist>
                        </div>

                        {/* Brand Select/Input */}
                        <div className="mb-3">
                            <label className="form-label">Brand</label>
                            <input
                            list="brandOptions"
                            className="form-control"
                            placeholder="Select or enter brand"
                            value={newProduct.brand}
                            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                            />
                            <datalist  id="brandOptions">
                                <option value="Sony" />
                                <option value="Bose" />
                                <option value="JBL" />
                                <option value="Sennheiser" />
                                <option value="Beats" />
                                <option value="Skullcandy" />
                                <option value="Boat" />
                                <option value="Zebronics" />
                                <option value="Nothing" />
                            </datalist>
                        </div>


                        {/* Tags Multi-Select */}
                        <div className="mb-3">
                            <label className="form-label">Tags</label>
                            <select
                                multiple
                                className="form-select"
                                value={newProduct.tags}
                                onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    tags: Array.from(e.target.selectedOptions, (option) => option.value),
                                })
                                }
                            >
                                <option value="Smart Pick">Smart Pick</option>
                                <option value="Zen-Gy Verified">Zen-Gy Verified</option>
                                <option value="Trending">Trending</option>
                                <option value="Top Sellers">Top Sellers</option>
                            </select>
                        </div>

                        {/* Specifications Input List */}
                        <div className="mb-3 d-flex flex-column">
                            <label className="form-label">Specifications</label>
                            {newProduct.specifications.map((spec, index) => (
                            <div key={index} className="input-group mb-1">
                                <input
                                type="text"
                                className="form-control"
                                value={spec}
                                placeholder={`Specification ${index + 1}`}
                                onChange={(e) => {
                                    const specs = [...newProduct.specifications];
                                    specs[index] = e.target.value;
                                    setNewProduct({ ...newProduct, specifications: specs });
                                }}
                                />
                                <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={() => {
                                    const specs = newProduct.specifications.filter((_, i) => i !== index);
                                    setNewProduct({ ...newProduct, specifications: specs });
                                }}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => setNewProduct({ ...newProduct, specifications: [...newProduct.specifications, ""] })}
                            >
                            Add specifications
                            </button>
                        </div>

                        {/* image collection links recieve */}
                        <div className="mb-3 d-flex flex-column">
                            <label className="form-label">Image Collection</label>
                            {newProduct.imagesCollection.map((spec, index) => (
                            <div key={index} className="input-group mb-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={spec}
                                    placeholder={`Specification ${index + 1}`}
                                    onChange={(e) => {
                                        const specs = [...newProduct.imagesCollection];
                                        specs[index] = e.target.value;
                                        setNewProduct({ ...newProduct, imagesCollection: specs });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                        const specs = newProduct.imagesCollection.filter((_, i) => i !== index);
                                        setNewProduct({ ...newProduct, imagesCollection: specs });
                                    }}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                                <small  class="form-text text-muted">paste link here</small>
                            </div>
                            ))}
                            <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => setNewProduct({ ...newProduct, imagesCollection: [...newProduct.imagesCollection, ""] })}
                            >
                            Add images
                            </button>
                        </div>

                        <button type="submit" className="btn btn-success w-100">
                            Add Product 
                        </button>
                    </form>
                </div> 
                <div className="col-12 col-lg-3 col-xl-3">
                    <img src={""} className="img-fluid" />
                </div>
            </div>
        </div>

        
    </div>
  );
};

export default AdminProductList;