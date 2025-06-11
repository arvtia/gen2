import { useState } from "react";


const FormInputAdmin =() =>{
    const [newProduct, setNewProduct] = useState({ productName: "", price: 0, color: "", discount: 0, size: "", inStock: "", category: "", categoryImg:"" , subcategory: "", brand:"", specifications:[], tags:[],  imagesCollection:[] });
    const [productList, setProductList] = useState([]);
    const handleAdd = (e) => {
    e.preventDefault(); // Prevent page reload
    fetch("http://localhost:3002/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProduct, id: Date.now() }), // Numeric ID for JSON-server
    })
      .then(() => {
        setProductList((prevList) => [...prevList, newProduct]);
        setNewProduct({ productName: "", price: 0, color: "", discount: "" });
        console.log("Product added successfully");
      })
      .catch((err) => console.error("Failed to add product:", err));
  };

    return(
        <form onSubmit={handleAdd} className="p-4 border rounded bg-light">
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
                className="form-control"
                placeholder="Enter product color"
                value={newProduct.color}
                onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                required
                />
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
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                required
                />
            </div>

            {/* Category */}
            <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
            </div>

            {/* Subcategory */}
            <div className="mb-3">
                <label className="form-label">Subcategory</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter subcategory"
                value={newProduct.subcategory}
                onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                />
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
                <datalist id="brandOptions">
                <option value="Sony" />
                <option value="Bose" />
                <option value="JBL" />
                <option value="Sennheiser" />
                <option value="Beats" />
                <option value="Skullcandy" />
                <option value="Boat" />
                </datalist>
            </div>

            {/* Tags Multi-Select */}
            <div className="mb-3">
                <label className="form-label">Tags</label>
                <select
                multiple
                className="form-control"
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
            <div className="mb-3">
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
                    className="btn btn-outline-danger"
                    onClick={() => {
                        const specs = newProduct.specifications.filter((_, i) => i !== index);
                        setNewProduct({ ...newProduct, specifications: specs });
                    }}
                    >
                    ×
                    </button>
                </div>
                ))}
                <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => setNewProduct({ ...newProduct, specifications: [...newProduct.specifications, ""] })}
                >
                Add Specification
                </button>
            </div>

            {/* Images Upload */}
            <div className="mb-3">
                <label className="form-label">Upload Images</label>
                <input
                type="file"
                className="form-control"
                multiple
                accept="image/*"
                onChange={(e) =>
                    setNewProduct({ ...newProduct, imagesCollection: Array.from(e.target.files) })
                }
                />
                <div className="mt-2">
                {newProduct.imagesCollection.map((img, i) => (
                    <div key={i} className="badge bg-secondary text-wrap me-1">
                    {img.name}
                    <button
                        type="button"
                        className="btn-close btn-close-white btn-sm ms-2"
                        aria-label="Remove"
                        onClick={() => {
                        const imgs = newProduct.imagesCollection.filter((_, idx) => idx !== i);
                        setNewProduct({ ...newProduct, imagesCollection: imgs });
                        }}
                    ></button>
                    </div>
                ))}
                </div>
            </div>

            <button type="submit" className="btn btn-success w-100">
                Add Product
            </button>
        </form>

    )
}

export default FormInputAdmin