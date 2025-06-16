import { useEffect, useState } from "react";


const LoginFrom =() =>{
    
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("")
    const [ emailError, setEmailError] = useState("");
    const [ passwordError, setPasswordError] = useState("");
    const [ formData, setFormData] = useState([])

    const [ user , setUser] = useState([]);

    useEffect(()=>(
        fetch("http://localhost:3001/Clients")
        .then((res)=>res.json())
        .then((data)=>setUser(data))
        .catch((err)=>{console.log("error occured while fetching data",err)})
    ),[])


    console.log(user);


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex= /.{8,}/;
    const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if(!passwordRegex.test(value)){
        setPasswordError("password must be atleast 8 digits long ")
    } else {
        setPasswordError("");
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  
  // Store form data as an object
  const newEntry = { email, password };

  // Properly update state using spread operator
  setFormData([...formData, newEntry]);

  console.log("Updated formData:", formData);
};



    return(
        <div className="py-4 py-xl-4 mt-lx-3">
            <div className="row gy-lg-3 gy-xl-4">
                <div className="col-12  col-md-6 col-lg-6 col-xl-5 mx-auto px-md-4 px-4">
                    <form action=" "> 
                    
                       <p className="text-center fs-4">Login</p>
                        <div className="form-floating mb-3">
                            <input
                            type="email"
                            className="form-control"
                            placeholder="kotak@gmail.com"
                            required
                            value={email}
                            // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            onChange={handleEmailChange}
                            />
                            <label htmlFor="">Email address</label>
                            {emailError && <p className="text-danger">{emailError}</p>}
                        </div>
                        <div className="form-floating">
                            <input
                            type="password"
                            className="form-control"
                            placeholder=""
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            />
                            <label >Password</label>
                            { passwordError && <p className="text-danger">{passwordError}</p>}
                        </div>
                        <button className="btn form-control mt-4 blueish-btn text-white shadow-soft" type="submit" onClick={handleSubmit}>Login</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default LoginFrom;