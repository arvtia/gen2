// import axios from "axios";
// import { useEffect } from "react";
// import { useState } from "react"

import { useEffect, useState } from "react";
import './style.css';
// function CategoryTab() {
//     const [cat, setCat ] = useState([]);

//     useEffect(()=>{
//         axios.get('http://localhost:3002/products')
//         .then((res)=> setCat(res.data))
//         .catch((err)=>{
//             console.log("error while fetcing data", err)
//         })
//     },[])

//     const uniquieCategory = cat.filter(p=> p.category)


//   return (
//     <>
//         <div className="py-4">
//             <div className="row">
//                 <div className="col-12 col-md-10 col-lg-10 mx-auto bg-light">
//                     <table className="table table-responsive">
//                         <thead>
//                             <tr>
//                                 <th>category name</th>
//                                 <th>Category image</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {

//                             }
//                         </tbody>

//                     </table>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default CategoryTab


const CategoryTab = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleToggleCategory = (category) => {
    const updatedProducts = products.map(product =>
      product.category === category
        ? { ...product, visible: !product.visible }
        : product
    );

    // Push updates to the server (you'd iterate here in real use)
    updatedProducts.forEach(p => {
      fetch(`http://localhost:3002/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: p.visible }),
      });
    });

    setProducts(updatedProducts);
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
        <>
            <div className="py-4 px-4  mt-3 bg-light very-soft-shadow">
                <h4 className="text-start fw-bold">Hide / unHide products by category</h4>

                <div className="row">
                    <div className="col-12 col-md-10 col-lg-10 col-xl-9 overflow-auto mx-auto rounded-3 very-soft-shadow bg-white">
                        <table className="table py-3  ">
                            <thead>
                                <tr>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(cat => {
                                const sample = products.find(p => p.category === cat);
                                const allHidden = products
                                    .filter(p => p.category === cat)
                                    .every(p => p.visible === false);

                                return (
                                    <tr key={cat}>
                                    <td>{cat}</td>
                                    <td>
                                        <img
                                        src={sample?.categoryImg}
                                        alt={cat}
                                        height={60}
                                        style={{ objectFit: 'contain' }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                        className={`btn btn-${allHidden ? 'success' : 'danger'}`}
                                        onClick={() => handleToggleCategory(cat)}
                                        >
                                        {allHidden ? 'Show' : 'Hide'}
                                        </button>
                                    </td>
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
  );
};


export default CategoryTab;