

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    
        if (emailSubmitted) {
            navigate('/resetPassword');
        } else {
            setEmailSubmitted(true);
            // optionally: trigger API to send OTP
        }
    };
    
  return (
    <div className="pt-5 pb-5 mb-5 mt-5">
      <div className="row mx-auto">
        <div className="p-2 justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4 px-2 mx-auto py-1 soft-blur">
            <div className="m-2 rounded-4 bg-light py-4 px-3 very-soft-shadow">
              <div className="d-flex justify-content-center align-items-center gap-2 py-3">
                <p className="fs-5 fw-bold mb-0">Enter Your Email</p>
                <span style={{ color: '#0d6efd', fontSize: '1.5rem' }}>
                  <i className="bi bi-envelope-at"></i>
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 input-wrapper mt-3">
                  <label htmlFor="email" className="form-label">Enter Your Email</label>
                  <div className="focus-ring-container">
                    <input
                      type="email"
                      id="email"
                      className="form-control very-soft-shadow text-secondary"
                      required
                      disabled={emailSubmitted}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {emailSubmitted && (
                <>
                    <div className="mb-3">
                        <div className=" d-flex justify-content-between gap-2 px-5">
                            {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="form-control text-center very-soft-shadow"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                            />
                            ))}
                        </div>
                        <small className='text-secondary text-center'>Enter the Code</small>
                    </div>
                </>
                )}

                <div className="mb-3">
                  <button type="submit" className="btn btn-outline-dark w-100 rounded-3 very-soft-shadow">
                    {emailSubmitted ? 'Continue' : 'Send'}
                  </button>
                </div>
              </form>

              <button
                className="btn border-0 btn-outline-none"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-caret-left">Go back</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;