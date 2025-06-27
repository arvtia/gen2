import { useState } from "react";

const ContactUsFrom = () => {
  const [Catergory, setCategory] = useState("");
  const [errorCategory, setErrorCategory] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  const validateName = (value) => {
    const pattern = /^[A-Za-z]+$/;
    return pattern.test(value);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    setCategory(value);
    setErrorCategory(value === "" ? "Please select a valid category." : "");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Please enter a valid email.");
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(validateName(value) ? "" : "Only alphabets allowed.");
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(validateName(value) ? "" : "Only alphabets allowed.");
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    setCommentError(value.trim() === "" ? "Please enter a comment." : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation
    if (Catergory === "") setErrorCategory("Please select a valid category.");
    if (!validateEmail(email)) setEmailError("Please enter a valid email.");
    if (!validateName(firstName)) setFirstNameError("Only alphabets allowed.");
    if (!validateName(lastName)) setLastNameError("Only alphabets allowed.");
    if (comment.trim() === "") setCommentError("Please enter a comment.");

    if (
      Catergory &&
      validateEmail(email) &&
      validateName(firstName) &&
      validateName(lastName) &&
      comment.trim() !== ""
    ) {
      console.log("Form submitted");
      // Handle form submission (API call or reset)
    }
  };

  return (
    <div className="py-4 my-5">
      <div className="row py-lg-5 gy-4 mx-auto">
        <h4 className="text-center">Contact Us</h4>
        <div className="col-11 col-lg-6 col-xl-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  onChange={handleSelect}
                  value={Catergory}
                >
                  <option value="">Choose Category</option>
                  <option value="1">Customer Support</option>
                  <option value="2">Career</option>
                  <option value="3">Report Complaint</option>
                </select>
                <label htmlFor="floatingSelect">Category</label>
              </div>
              {errorCategory && <p className="text-danger">{errorCategory}</p>}
            </div>

            <div className="mb-3">
              <div className="form-floating">
                <input
                  className="form-control"
                  type="email"
                  placeholder=""
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <label htmlFor="email">Enter your Email</label>
              </div>
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>

            <div className="row gx-3 mb-3">
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="FirstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  <label htmlFor="FirstName">First Name</label>
                </div>
                {firstNameError && <p className="text-danger">{firstNameError}</p>}
              </div>

              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="LastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  <label htmlFor="LastName">Last Name</label>
                </div>
                {lastNameError && <p className="text-danger">{lastNameError}</p>}
              </div>
            </div>

            <div className="mb-3">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  style={{ height: 100 }}
                  value={comment}
                  onChange={handleCommentChange}
                />
                <label>Comments</label>
              </div>
              {commentError && <p className="text-danger">{commentError}</p>}
            </div>

            <button className="btn btn-dark w-100 shadow-soft" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsFrom;
