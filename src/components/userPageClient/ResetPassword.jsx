



function ResetPassword() {
  return (
        <>
            <div className="py-5 my-5">
                <div className="row justify-content-center ">
                    <div className="col-12 col-md-6 col-lg-5 col-xl-4 px-2 mx-auto py-1 soft-blur">
                        <div className="m-2 rounded-4 bg-light py-4 px-3 very-soft-shadow">
                            <form className="p-2">
                            <div className="mb-3">
                                <small className="text-secondary">Create New Password</small>
                                <input
                                type="password"
                                className="form-control very-soft-shadow bg-light"
                                placeholder="Enter new password"
                                required
                                />
                            </div>

                            <div className="mb-3">
                                <small className="text-secondary">Confirm Password</small>
                                <input
                                type="password"
                                className="form-control very-soft-shadow bg-light"
                                placeholder="Re-enter password"
                                required
                                />
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-outline-dark w-100 rounded-3 very-soft-shadow">
                                    Confirm Password
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;