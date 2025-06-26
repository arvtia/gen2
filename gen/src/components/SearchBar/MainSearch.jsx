
import { useState } from "react";

function MainSearch() {

    const [ query , setQuery] = useState('');
    const [ searchResult , setSearchResult ] = useState({ });



   const handleSearch = async (e) =>{
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === '') return setSearchResult({});

        try {
            const resp = await fetch('http://localhost:3002/products')
            const data = await resp.json();

            const filtered = data.filter( p => 
                p.productName.toLowerCase().includes(value.toLowerCase())
            );

            // Group by category
            const grouped = filtered.reduce((acc, product) => {
            const cat = product.category || 'Uncategorized';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(product);
            return acc;
            }, {});

            setSearchResult(grouped);

        } catch (err) {
            console.error(err);
        }
   }


    return (
        <>
            {/* Modal for Search */}
                <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex flex-row align-items-center justify-content-between">

                        <div className="input-group w-100">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Search product"
                            aria-label="Search"
                            onChange={handleSearch}
                            />
                        </div>

                        {/* modal close btn */}
                        <button
                            type="button"
                            className="btn-close ms-auto mb-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    
                        </div>
                        <div className="modal-body py-1">
                        {/* Search results will appear here once integrated */}
                        
                            <div className="mt-4">
                                {Object.entries(searchResult).map(([category, items]) => (
                                    <div key={category} className="mb-3">
                                    <h5>{category}</h5>
                                    <ul className="list-group">
                                        {items.map(product => (
                                        <li key={product.id} className="list-group-item">
                                            {product.productName}
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                ))}
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainSearch;