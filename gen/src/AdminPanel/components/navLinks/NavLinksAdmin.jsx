import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import NavLinksTableRows from './tableNavlinks';
import { addNavLinks, fetchNavlinks } from '../../ReduxAdmin/navSlice';


function NavLinksAdmin() {
  const [newLink, setNewLink] = useState({
    name: '',
    path: '',
    icon: '',
  });

  const dispatch = useDispatch();
  const { items: navLinks, error } = useSelector(state => state.navLinks);

  useEffect(() => {
    dispatch(fetchNavlinks()); // Fetch nav links when the component mounts
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newLink.name && newLink.path) {
      dispatch(addNavLinks(newLink));
      setNewLink({ name: '', path: '', icon: '' }); // Reset form after submit
    }
  };

  const handleChange = (e) => {
    setNewLink({
      ...newLink,
      [e.target.id]: e.target.value,
    });
  };

  return (
        <>
            <div className="py-2">
                {/* Add new link form */}
                <div className="row justify-content-center py-5 bg-white shadow-sm rounded">
                    <div className="col-12 col-md-8 col-lg-6">
                        <form className="p-4" onSubmit={handleSubmit}>
                        <h5 className="text-center mb-4 fw-semibold border-bottom pb-2">Add New Link</h5>

                        <div className="mb-3">
                            <label htmlFor="path" className="form-label visually-hidden">Path</label>
                            <input
                            type="text"
                            id="path"
                            className="form-control border-dark rounded-0 bg-white"
                            placeholder="/"
                            value={newLink.path}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="form-label visually-hidden">Name</label>
                            <input
                            type="text"
                            id="name"
                            className="form-control border-dark rounded-0 bg-white"
                            placeholder="Name"
                            value={newLink.name}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="icon" className="form-label visually-hidden">Icon</label>
                            <input
                            type="text"
                            id="icon"
                            className="form-control border-dark rounded-0 bg-white"
                            placeholder="Icon (e.g., bi bi-house)"
                            value={newLink.icon}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="d-grid">
                            <button className="btn btn-dark rounded-0" type="submit">Submit</button>
                        </div>
                        </form>
                    </div>
                </div>

                {/* NavLinks Table */}
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
  );
}

export default NavLinksAdmin;
