
import { Link } from 'react-router-dom';
import './Error.css'

const Error =() =>{
    return(
        <section className="py-5 mt-4 metalic-bg">
            <div className="py-5 mt-5">
                <div className="text-center metalic-bg">
                    <p className="display-2">
                        {"Oops! Page not found".split("").map((char, index) => (
                        <span key={index} className="glass-letter">
                            {char}
                        </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className="py-4">
                <div className="col-10 col-md-4 col-xl-3 col-lg-3 mx-auto">
                    <div className="text-dark">
                        <Link to={"/"} className="btn py-3 px-2 d-flex justify-content-evenly align-items-center shadow">
                            <span>
                                <i className="bi bi-house p-2"></i>
                            </span>
                            <div className='lh-1 text-start'>
                                <p className='fs-5'>Home <br />
                                <span className='font-1'>there is no other place like Home</span>
                                </p>
                            </div>
                            <span>
                                <i className="bi bi-arrow-right-short left-shift-hover"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error;