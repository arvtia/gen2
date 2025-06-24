import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

import './style.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const FinalPrice = product.price - (product.price * product.discount) / 100;
  
    if (product.inStock !== 0 || product.inStock ==="Yes") {
        product.inStock.style.color="green"
    }
  

  const handleAdd = () => setQuantity(prev => prev + 1);
  const handleRemove = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
        <div className="p-3">
            <div className="justify-content-start d-flex flex-column">
                <p className="fs-6 text-secondary py-2 mb-2 underline-expand">
                <span><i className="bi bi-stars px-1 text-dark"></i></span>{product.brand}
                </p>
                <h3 className="text-secondary fw-bold">{product.productName}</h3>
                <div className="mb-2 py-3">
                    <span className="badge p-1 px-2 bg-secondary">{product.color}</span>
                </div>
                <div className="mb-2 d-inline-flex flex-row align-items-baseline">
                    <p className="fs-6 text-secondary text-decoration-line-through">₹ {product.price}</p>
                    <span className="fs-4 fw-bold text-dark ms-2"><mark>₹ {FinalPrice}</mark></span>
                </div>

                <div className="d-inline-flex align-items-center mb-2">
                    <div className="btn-group btn-group-sm me-2" role="group">
                        <button
                            type="button"
                            className="btn btn-outline-dark px-3"
                            onClick={handleRemove}
                        >
                            <i className="bi bi-dash"></i>
                        </button>

                        <button
                            type="button"
                            className="btn btn-light fw-bold border"
                            disabled
                            style={{ minWidth: '40px' }}
                        >
                            {quantity}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-dark px-3"
                            onClick={handleAdd}
                        >
                            <i className="bi bi-plus"></i>
                        </button>
                    </div>

                    <div className="btn rounded bg-dark text-white w-100" onClick={handleAddToCart}>
                        Add to Cart 
                        <span>
                        <i className="bi bi-bag-check ms-2"></i>
                        </span>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="py-3 d-flex flex-wrap">
                        {
                            product.specifications && product.specifications.map((spec, index) => (
                                <p key={index} className="fs-6 text-secondary badge fw-light bg-light me-2 very-soft-shadow " role="button"> {spec}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <div className="py-3">
                        <p className="fs-6 text-secondary underline-expand ">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ProductCard;