import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /.{8,}/;

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(emailRegex.test(value) ? "" : "Invalid email format");
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(passwordRegex.test(value) ? "" : "Password must be at least 8 characters");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || emailError || passwordError) {
        alert("Please fix the form errors before submitting.");
        return;
        }

        fetch("http://localhost:3001/users")
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch users");
            return res.json();
        })
        .then((users) => {
            const matchedUser = users.find(
            (user) => user.email === email && user.password === password
            );

            if (matchedUser) {
            localStorage.setItem("user", JSON.stringify(matchedUser));
            alert("Login successful!");
            navigate("/user");
            } else {
            alert("Invalid email or password.");
            }
        })
        .catch((err) => {
            console.error("Login error:", err);
            alert("Something went wrong. Try again later.");
        });
    };

    return (
        <div className="py-5 mt-5 py-xl-4 mt-lx-5">
            <div className="row w-100 mx-auto mt-4">
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 mx-auto px-md-4 px-4">
                    <form onSubmit={handleSubmit}>
                        <p className="text-center fs-4">Login</p>

                        <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="you@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <label>Email address</label>
                        {emailError && <p className="text-danger">{emailError}</p>}
                        </div>

                        <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <label>Password</label>
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                        </div>

                        <button type="submit" className="btn form-control mt-4 py-2 btn-outline-dark simple-shadow">
                        Login
                        </button>
                    </form>

                    <Link to="/register">
                            <p className="fs-6 text-center text-info text-underline mt-2">
                                Don't have an account? Create a new account.
                            </p>
                    </Link>
                </div>
            </div>
        </div>
  );
};

export default LoginForm;