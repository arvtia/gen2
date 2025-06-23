import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/cartSlice";


const ProductCard =({ product }) =>{
    const dispatch = useDispatch();
    return(
        <div className="p-3">
            <div className="justify-content-start d-flex flex-column">
                <p className="fs-6 text-secondary py-3 mb-2 underline-expand"> <span><i className="bi bi-stars px-1 text-dark"></i></span>{product.brand} </p>
                <h3 className="text-secondary fw-bold">{product.productName}</h3>
                <div className="mb-2">
                    <span className="badge p-1 px-2 bg-secondary">{product.color}</span>
                </div>
                <div className="btn  rounded bg-dark text-white" onClick={ () => dispatch(addToCart(product))}>Add to Cart</div>
            </div>
        </div>
    )
}

export default ProductCard