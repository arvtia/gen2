import { useEffect, useState } from "react";

const FilterProducts = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3002/products')
        .then(response => response.json())
        .then(data => {
            if (!data || !Array.isArray(data)) {
                console.error("Data is missing or incorrectly formatted!");
                return;
            }
            const allBrands = data.flatMap(category => category.brands);
            const brandProducts = allBrands.find(brand => brand.brandName === "Earlocal")?.products || [];
            setFilteredProducts(brandProducts); // 🔥 Stores products properly
        });
}, []);
    

    return (
        <div className="py-4 mt-5">
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col-12 col-lg-11 col-xl-10">
                        <div className="py-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <div key={product.productId} className="card mb-3 p-3">
                                        <h5>{product.productName}</h5>
                                        <p>Price: ${product.price}</p>
                                        <img src={product.imagesCollection[0]} alt={product.productName} style={{ width: "100px" }} />
                                        <p>{product.price}</p>
                                        <p>{product.inStock === "y" ? <p>in stock  ✅</p> : <p>Product doesn't exist</p>}</p>
                                        <p>
                                            Offer Price: {product.price - (product.price * parseInt(product.discount) / 100)}
                                        </p>
                                        <div className="text-dark">
                                            {
                                                product.specifications.map((item, index)=>(
                                                    <p key={index}>{item}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="py-1">
                                            {product?.tags?.map((item, index) => (
                                                <span key={index} className="badge bg-dark">{item}</span>
                                            ))}
                                        </div>
                                        <div className="row">
                                            <div className="col-10 overflow-x-scroll d-flex" style={{ whiteSpace: "nowrap", scrollSnapType: "x mandatory" }}>
                                                {product?.imagesCollection?.map((item, index) => (
                                                    <img src={item} alt="image data" key={index} 
                                                        style={{ width: "120px", height: "120px", objectFit: "cover", scrollSnapAlign: "start" }} 
                                                        className="mx-3" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products found for EarWave.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterProducts;