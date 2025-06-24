import { useEffect, useState } from "react";
import './Table.css'
import DynamicProductTable from "./dynamicTable";
import DynamicProductForm from "./productFromShema";
import { productFormSchema } from "./productFromShema";


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
        description:""
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
    }, []); // ✅ fetches only once on component mount // Auto-refresh when product list changes

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
    <div className="py-2">
      
    <DynamicProductTable
        productList={productList}
        onEdit={(product) => setSelectedProduct(product)}
        onDelete={handleDelete}
    />

      {selectedProduct && (
        <div className="mt-4 col-12 col-lg-9 col-xl-10 mx-auto p-4 border rounded bg-light">
            <h4>Edit Product</h4>
            <DynamicProductForm
            product={selectedProduct}
            setProduct={setSelectedProduct}
            onSubmit={handleUpdate}
            schema={productFormSchema}
            submitLabel="Save Changes"
            />
        </div>
        )}


    {/* separation -  add product in the field */}

       <div className="mt-5 col-12 col-lg-9 col-xl-10 mx-auto p-4 border rounded bg-light">
            <h4>Add New Product</h4>
            <DynamicProductForm
                product={newProduct}
                setProduct={setNewProduct}
                onSubmit={handleAdd}
                schema={productFormSchema}
                submitLabel="Add Product"
            />
        </div>
        
    </div>
  );
};

export default AdminProductList;