import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, deleteFromCart } from '../../redux/cartSlice';
import './style.css'

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-wrapper">
      {/* <h5 className="fw-bold mb-3">
        <i className="bi bi-bag me-2"></i> Your Cart
      </h5> */}

      {cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="d-flex flex-column gap-3 custom-height">
            {cartItems.map(item => (
                <div key={item.id} className="d-flex align-items-center gap-3 cart-body-bg pb-2 rounded px-2">
                    <img
                        src={item.imagesCollection[0]}
                        alt={item.product_name}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div className="flex-grow-1">
                        <p className="mb-1 fw-semibold">{item.brand_name}</p>
                        <p className="mb-1 text-muted small">{item.product_name}</p>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="btn-group btn-group-sm" role="group">
                                <button
                                className="btn btn-outline-secondary"
                                onClick={() => dispatch(removeFromCart(item))}
                                >
                                -
                                </button>
                                <button className="btn disabled">
                                {item.quantity}
                                </button>
                                <button
                                className="btn btn-outline-secondary"
                                onClick={() => dispatch(addToCart(item))}
                                >
                                +
                                </button>
                            </div>
                            <p className="mb-0 fw-medium">
                                ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </p>
                            <button onClick={()=> dispatch(deleteFromCart(item))} className='btn border-0'>
                                    <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
