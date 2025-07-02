import { useEffect, useState } from "react";
import './Table.css';
import DynamicProductTable from "./dynamicTable";
import DynamicProductForm from "./productFromShema";
import { productFormSchema } from "./productFromShema";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, fetchProducts, updateProduct } from "./ReduxAdmin/productSlice";

const AdminProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
        description: "",
        visible: true
        
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(initialProductState);

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addProduct({ ...newProduct }));
        setNewProduct(initialProductState);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ ...selectedProduct }));
        setSelectedProduct(null);
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <div className="py-2">
            <DynamicProductTable
                productList={products}
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