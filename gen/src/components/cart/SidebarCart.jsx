import { useDispatch, useSelector } from "react-redux";
import Cart from "./cartData";
import { useEffect } from "react";

// SidebarCart.js

const SidebarCart = () => {

     const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="cartSidebar"
      aria-labelledby="cartSidebarLabel"
    >
      <div className="offcanvas-header">
        <h5 id="cartSidebarLabel">
            <i className="bi bi-bag me-2"></i> Your Order
        </h5>
        <div className="ms-auto d-flex align-items-center">
            
            <button
            type="button"
            className="btn "
            data-bs-dismiss="offcanvas"
            >Close
            </button>
        </div>
      </div>
      <div className="offcanvas-body">
        {/* Cart contents go here */}
            <Cart/>
            <div className="mt-4">
                <h6 className="fw-bold d-flex justify-content-between">
                <span>Total:</span>
                <span>
                    {calculateTotal().toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    })}
                </span>
                </h6>
                <button className="btn btn-dark w-100 mt-2">Proceed to Checkout</button>
            </div>
      </div>
    </div>
  );
};

export default SidebarCart;
