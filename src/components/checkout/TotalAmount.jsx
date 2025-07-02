import { useDispatch, useSelector } from "react-redux";


function TotalAmount() {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
      const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0);
  };

  const gstRate = 0.18;
//   GST Amount = (Base Price × GST Rate) / 100
  const GstAmount = calculateTotal() * gstRate;

    const Subtotal = calculateTotal() + GstAmount;
    
    
  return (
    <>
        <div className="table-responsive mt-2">
            <table className="table table-hover  shadow-sm">
                <thead className="table-light">
                    <tr className="">
                        <th scope="col" className="text-start">Description</th>
                        <th scope="col" className="text-end">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-start">
                            <span title="Total price before GST" className="text-start">Total Price</span>
                        </td>
                        <td className="text-end fw-bold">
                            {calculateTotal().toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td className="text-start">
                            <span title="GST included in the total">GST</span>
                        </td>
                        <td className="text-end">
                            ₹{GstAmount.toFixed(2)}
                        </td>
                    </tr>
                    <tr className="table-light">
                        <td className="text-start">
                            <span title="Total - GST">Subtotal</span>
                        </td>
                        <td className="text-end fw-semibold">
                            ₹{Subtotal}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </>
  )
}

export default TotalAmount