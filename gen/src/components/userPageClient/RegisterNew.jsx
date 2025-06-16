



const RegisterNew = () =>{


    const [ email, setEmail] = useState("");
    const [ phone, setPhone] = useState("");
    const [ password, setPassword ] = useState("")
    const [ emailError , setEmailerror] = useState("")
    const [phoneError ,setPhoneError] = useState("")
    const [ passwordError, setPasswordError] = useState("")
    

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$%#@&*^!]).{8,}$/;
    const phoneRegex = /[0-9]{10}/;


    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value)
        if(!emailRegex.test(value)){
            setEmailerror("invalid format")
        } else {
            setEmailerror("")
        }
    }
    const handlePhoneChange =(e) =>{
        const value = e.target.value;
        setPhone(value)

        if(!phoneRegex.test(phone)){
            setPhoneError("invalid number")
        } else {
            setPhoneError("");
        }
    }

    const handlePasswordChange = (e) =>{
        const value = e.target.value;
        setPassword(value);

        if(!passwordRegex.test(value)){
            setPasswordError("invalid format")
        } else {
            setPasswordError("");
        }
    }

    return(
        <div className="py-4 my-xl-5">
            <div className="row gy-3">
                <div className="col-11 col-md-6 col-lg-6 col-xl-6 mx-auto px-5">
                    <form>
                    
                       <p className="text-center fs-4">Registration</p>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter you email"
                                onChange={handleEmailChange}
                                value={email}
                            />
                            <label htmlFor="">Email address</label>
                            {emailError && <p className="text-danger">{emailError}</p>}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder=""
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                            <label >Enter your Phone number</label>
                            {phoneError && <p className="text-danger">{phoneError}</p>}
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                placeholder=""
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <label >Password</label>
                            {passwordError && <p className="text-danger">{passwordError}</p>}
                        </div>
                        <div className="btn form-control mt-4 blueish-btn text-white shadow-soft" type="submit">Login</div>
                    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterNew;