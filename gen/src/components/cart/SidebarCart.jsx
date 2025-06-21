import Cart from "./cartData";

// SidebarCart.js
const SidebarCart = () => {
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
      </div>
    </div>
  );
};

export default SidebarCart;
