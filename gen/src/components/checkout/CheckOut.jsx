import Cartinfo from "./Cartinfo"
import FromCheckout from "./FromCheckout"

function CheckOut() {
  return (
    <div className="mt-5 py-5">
        <div className="container mx-auto">
            <div className="row py-3 px-3 px-lg-2">
                <div className="col-12 col-lg-8 col-xl-8">
                    <FromCheckout />
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                    <Cartinfo />
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckOut