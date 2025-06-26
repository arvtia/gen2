import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './style.css';
import NavLinksTableRows from "./tableNavlinks";

function NavLinksAdmin() {

    const [ navLinks, setNavLinks] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3002/navLinks')
        .then((res)=> setNavLinks(res.data))
        .catch((err)=>
            {console.log(err)}
        )
    },[]);

    // "id": "1",
    // "name": "Home",
    // "path": "/",
    // "icon": "bi-house"

    return (
        <>
            <div className="py-2">
                {/* inpt form for edit / add new navlinks */}
                <div className="row justify-content-center py-5 bg-white shadow-sm rounded">
                    <div className="col-12 col-md-8 col-lg-6">
                        <form className="p-4">
                            <h5 className="text-center mb-4 fw-semibold border-bottom pb-2">Add New Link</h5>

                            <div className="mb-3">
                                <label htmlFor="path" className="form-label visually-hidden">Path</label>
                                <input
                                type="text"
                                id="path"
                                className="form-control border-dark rounded-0 bg-white"
                                placeholder="/"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className="form-label visually-hidden">Name</label>
                                <input
                                type="text"
                                id="name"
                                className="form-control border-dark rounded-0 bg-white"
                                placeholder="Name"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="icon" className="form-label visually-hidden">Icon</label>
                                <input
                                type="text"
                                id="icon"
                                className="form-control border-dark rounded-0 bg-white"
                                placeholder="optional"
                                />
                            </div>


                            <div className="d-grid">
                                <button className="btn btn-dark rounded-0" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            
                {/*
                    table for the form - showing teh navlinks
                -----------------------------------------------
                */}
                <div className="px-3 my-3 overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>Name</th>
                                <th>Path</th>
                                <th>Icon</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">         
                            <NavLinksTableRows navLinks={navLinks} />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default NavLinksAdmin