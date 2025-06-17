import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterNew = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$%#@&*^!]).{8,}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(emailRegex.test(value) ? "" : "Invalid email format");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(phoneRegex.test(value) ? "" : "Phone number must be 10 digits");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(passwordRegex.test(value) ? "" : "Password must be 8+ chars with upper, lower, number, and special char");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError || phoneError || passwordError || !email || !phone || !password) {
      alert("Please fix form errors before submitting.");
      return;
    }

    const newUser = { email, phone, password };

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to register");
        return res.json();
      })
      .then(() => {
        setFormSuccess(true);
        setEmail("");
        setPhone("");
        setPassword("");
        setTimeout(() => setFormSuccess(false), 5000);
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <div className="py-5 my-xl-5 mt-5">
      <div className="row w-100 mx-auto">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 mx-auto px-3">
          <form onSubmit={handleSubmit}>
            <p className="text-center fs-4">Create a new Account</p>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handleEmailChange}
                value={email}
              />
              <label>Email address</label>
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
                onChange={handlePhoneChange}
                value={phone}
              />
              <label>Phone Number</label>
              {phoneError && <p className="text-danger">{phoneError}</p>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
              />
              <label>Password</label>
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>

            <button className="btn form-control mt-4 btn-outline-dark simple-shadow" type="submit">
              Register Now
            </button>
          </form>

          {formSuccess && (
            <div
              className="toast show align-items-center position-fixed bottom-0 end-0 m-3 bg-success text-white"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">
                  Hello, {email}! Welcome, your account has been created.
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  aria-label="Close"
                  onClick={() => setFormSuccess(false)}
                ></button>
              </div>
            </div>
          )}

          <Link to="/login">
            <p className="fs-6 text-center text-info text-underline mt-2">
              Already have an account? Click here to login.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterNew;