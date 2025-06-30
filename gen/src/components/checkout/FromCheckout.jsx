

function FromCheckout() {
  return (
    <div>
        <form className="row g-3 needs-validation" noValidate>
            
            
            <div className="mb-3">
                <p className="fs-4 fw-bold">Contact Information</p>
                <p className="fs-6">You are currently checking out as a guest. Please enter your email address below so that we can send you confirmation of your order. If you have already a member, please <span className="fw-bold">Login</span></p>
                <div className="">
                    <input type="email" className="form-control w-100 fs-6 fw-bold very-soft-shadow" placeholder="Email" />
                </div> 
            </div>
            <hr className="hr"></hr>
            
            
            
            
            
            {/* Full Name */}

            

            <div className="col-12 col-md-6 mb-3">
                <input
                type="text"
                className="form-control very-soft-shadow"
                id="fullName"
                placeholder="First name"
                required
                />
                <div className="invalid-feedback">
                Please enter your First Name.
                </div>
            </div>

            {/* Email */}
            <div className=" col-12 col-md-6 mb-3">
                <input
                type="text"
                className="form-control very-soft-shadow"
                id="fullName"
                required
                placeholder="Last name"
                />
                <div className="invalid-feedback">
                Please enter your Last name.
                </div>
            </div>

            
            <div className="col mb-3">
                <input
                type="text"
                className="form-control very-soft-shadow text-seconary"
                id="address"
                placeholder="House no: 342, new street , Okhla face .."
                required
                />
                <div className="invalid-feedback">
                Please enter your shipping address.
                </div>
            </div>

            {/* Shipping Address */}
            <div className="row d-flex justify-content-between mb-3">
                <div className="col">
                    <input 
                        type="text"
                        placeholder="City"
                        className="form-control very-soft-shadow"
                    />
                    <div className="invalid-feedback">
                        please enter the city 
                    </div>
                </div>
                <div className="col">
                    <select name="State" id="Sateid" className="form-select very-soft-shadow">
                        <option value="null">Choose</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Punjab">Punjab</option>
                    </select>
                    <div className="invalid-feedback">
                        please enter the state
                    </div>
                </div>
                <div className="col">
                    <input 
                        type="number"
                        placeholder="PIN Code"
                        className="form-control very-soft-shadow"
                    />
                    <div className="invalid-feedback">
                        please enter the city 
                    </div>
                </div>
            </div>

            <div className="col-md-6 mb-3">
                <input 
                    type="number"
                    className="form-control very-soft-shadow"
                    placeholder="Phone number"
                />
            </div>
            <div className="mb-3">
                <input type="checkbox" name="billingAddress" id="billingAdress" placeholder="can be used as in billing address" />
                <small className="ms-2">to be used as billing address</small>
            </div>
            <div className="col-12">
                <button 
                    className="btn w-100 btn-outline-secondary very-soft-shadow">
                    Go to Payment
                </button>
            </div>
            
        </form>

    </div>
  )
}

export default FromCheckout