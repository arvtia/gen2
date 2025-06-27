
import { useState } from "react";
import './MainSearch.css';
import { Link } from "react-router-dom";
function MainSearch() {

    const [ query , setQuery] = useState('');
    const [ searchResult , setSearchResult ] = useState({ });
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFirstClick = () => {
        if (!isExpanded) {
        setIsExpanded(true);
        }
    };



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
                    <div className="modal-content ">
                        <div className="modal-header d-flex flex-row align-items-center justify-content-between">
                            <div className="input-group w-100">
                                <input
                                type="text"
                                className="form-control soft-blur"
                                placeholder="Search product"
                                aria-label="Search"
                                onChange={handleSearch}
                                onClick={handleFirstClick}

                                />
                            </div>
                            {/* modal close btn */}
                            <button
                                type="button"
                                className="btn rounded btn-sm ms-2 btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                            </button>
                        </div>
                    <div className= {`modal-body py-1 ${isExpanded ? "expanded" : ""}`}>
                        {/* Search results will appear here once integrated */}
                            <div className="result-container mt-2">
                                <div className="px-1">
                                    {Object.entries(searchResult).map(([category, items]) => (
                                        <div key={category} className="category-card mb-3 very-soft-shadow soft-blur">
                                            <div className="category-header">
                                                <div className="px-2 py-1 soft-blur">
                                                    <h5 className="category-title ">{category}</h5>
                                                </div>
                                            </div>
                                            <div className="product-list">
                                                {items.map((product) => (
                                                    <div key={product.id} className="product-card soft-blur">
                                                        <Link to={`/product/${product.id}`} className="text-decoration-none"><div className="product-content">
                                                            <p className="product-name" data-bs-dismiss="modal" aria-label="Close">{product.productName}</p>
                                                        </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    </div>


                    </div>




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainSearch;