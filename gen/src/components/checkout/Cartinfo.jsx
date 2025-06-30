import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './style.css';
import TotalAmount from "./TotalAmount";


function Cartinfo() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    

//    console.log(cartItems);

   const totalPrice = cartItems.map((item)=> item.price);
//    console.log((totalPrice));

   const asNumbers = totalPrice.map(Number);
//    console.log(asNumbers);
    const gstRate = 0.18;

    const TotalPrice = asNumbers.reduce((acc, item) => acc + item , 0 )
    console.log(TotalPrice);

    const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0);
  };

//   GST Amount = (Base Price × GST Rate) / 100
  const GstAmount = calculateTotal() * gstRate;

    const Subtotal = calculateTotal() + GstAmount;
    
    return (
        <>
            <div className="p-3 rounded-4 bg-light mt-3">
                <div className="col-12">
                    <div className="d-flex py-3 justify-content-between align-items-center">
                        <p className="fs-4">Order Summery</p><div data-bs-toggle="offcanvas" data-bs-target="#cartSidebar" aria-controls="cartSidebar" className="text-decoration-none text-success fs-6" style={{cursor:"pointer"}}>Edit Cart <span><i className="bi bi-pencil-square"></i></span></div>
                    </div>
                    {
                        cartItems.map((item, index) => (
                            <div 
                                key={index} 
                                className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
                                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.70rem" }}
                            >
                                <img src={item.imagesCollection[0]} alt="pd-img" style={{width:"50px", height:"50xp", objectFit:"contain"}}/>

                                <span className="flex-grow-1 text-muted fw-light mx-2">
                                {item.productName}
                                    <div className="d-block">
                                        <p className="text-muted" style={{ minWidth: "30px" }}>
                                        Qty: <span className="fw-bold">{item.quantity}</span>
                                        </p> 
                                    </div>
                                </span>
                               <div className="bg-light">
                                 <p className="fw-bold text-muted ms-2 ">
                                    ₹{item.price}
                                </p>
                               </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-12">
                    <div className="py-2 ">
                        <TotalAmount name={calculateTotal()}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cartinfo;