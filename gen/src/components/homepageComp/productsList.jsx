import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import CategoryMenu from "./categorymenu";
import ShopNow from "../../pages/shop";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";


const WrapperProducts =() =>{
    return(
        <div className="py-4  mb-3">
            <div className="container-fluid">
                <div className="row mt-2 wrapper-section">
                    {/* space for the other sub div */}
                    <ProductsList/>
                </div>
            </div>
        </div>
    )
}

const FirstSection = () =>{
    return(
            <div className="mb-3 py-3 d-flex px-4 flex-wrap  top-section-with-search">
                <div className="col-12 col-md-6 col-lg-6 col-xl-6 px-4">
                    <div className="ms-auto align-items-center">
                        <p className="fw-bolder text-dark fs-4">Give All You Need</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-6 px-2">
                    <div className="me-auto">
                        <form action={""}>
                            <BtnInside/>
                        </form>
                    </div>
                </div>
            </div>
    )
}

const BtnInside = () =>{
    return(
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control box-shd"
                    placeholder="Recipient's Email"
                    aria-label="Recipient's username"
                    style={{borderRadius:"25px"}}
                   />
                <div className="input-group-append">
                    <button className="btn custom-btn text-white fs-6 fw-bold" type="button" style={{ height: 34, marginTop: 2 }}>
                        Submit
                    </button>
                </div>
            </div>
    )
}
const SecondSection =() =>{
    return(
        <>
            {/* <div className="col-12 col-lg-3 col-xl-3">
               if needed this can act as a side bar ------ Left side 
            </div> */}
            <div className="col-12 col-lg-12 col-xl-12">
                {/* products details and cols */}
                <ProductSection />
            </div>
        </>
    )
}
// const CategoryMenu = () => {

//     const [Category, setCategory] = useState([]);

//     useEffect(()=>{
//         fetch('http://localhost:5000/NavList')
//         .then((res) => res.json())
//         .then((data)=> setCategory(data))
//         .catch((err) => {
//         console.error('Failed to fetch products:', err);
//       });
        
//     }, []);

//     return (
//         <div className="col-12 col-xl-12 col-lg-12  px-2">
//             <div className="col-auto">
//                 <p className="fs-4 fw-bolder text-dark">Category</p>
//                 <div className="d-flex flex-column align-items-start px-3 pt-2 text-white">
//                     <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
//                         {Category.map((item, index) => (
//                             <li key={index} className="nav-item">
//                                 <Link
//                                     to="#"
//                                     data-bs-toggle={item.subItems.length > 0 ? "collapse" : ""}
//                                     data-bs-target={`#${item.id}`}
//                                     className="nav-link px-0 text-dark fs-5"
//                                 >
//                                     {item.name}
//                                 </Link>
//                                 {item.subItems.length > 0 && (
//                                     <ul className="collapse nav flex-column ms-1 custom-dropdown" id={item.id}>
//                                         {item.subItems.map((subItem, subIndex) => (
//                                             <li key={subIndex} className="custom-dropdown-item">
//                                                 <Link to="#" className="nav-link ps-2 text-dark">
//                                                     {subItem}
//                                                 </Link>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>

//                 </div>
//             </div>
//         </div>
//     );
// };


const ProductsList =() =>{
    return(
        <div className="col-12 col-lg-11 col-11 mx-auto px-2 pt-3" 
        style={{
            zIndex: 4,
            position: "relative",
            marginTop: "-153px",
            backgroundColor: "white",
            borderRadius: 20
        }}>
            <div className="row">
                <FirstSection />
                <div className="p-2">
                    <ShopNow/>
                </div>
                <SecondSection />
            </div>
        </div>
    )
}



const cardsPerPage = 12;

const ProductSection = () => {
    const { id , category} = useParams();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
  
  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(productList.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentProducts = productList.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="py-2">
      <div className="row d-flex flex-wrap">
        {currentProducts.map((item, index) => (
          <div
            key={index}
            className="col-6 col-md-3 col-lg-3 col-xl-3 position-relative justify-content-center text-center px-2"
          >
            <img
              src={item.imagesCollection[0]}
              alt="Product"
              className="img-fluid bg-secondary phone-view-product rounded"
              style={{
                objectFit: 'cover',
                width: '290px',
                height: '290px',
              }}
            />
            <div className="py-1">
                <Link to={`${category}/${id}`} className="text-decoration-none" ><div className="text-dark fw-bold text-start">{item.productName}</div></Link>                
            </div>
            <div className="col-11 mx-auto">
              <div className="justify-content-between d-flex mx-auto align-items-center">
                <p className="text-secondary font-1">
                  <i className="bi bi-star-fill text-warning"></i> 2.1k reviews
                </p>
                <div className="d-flex">
                    <p className="font-1 fw-bold">₹<del>{item.price}</del></p>
                    <p className="fs-5 fw-bold font-monospace">
                        ₹{Math.floor(item.price * (1 - item.discount / 100))}
                    </p>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 mx-auto">
                <div className="d-flex justify-content-between mx-auto">

                    <div className=" w-100 ">
                        <button onClick={() => dispatch(addToCart(item))} className="btn bg-dark text-white font-monospace btn-outline-dark w-100 gx-2">
                            <span>
                                <i className="bi bi-bag me-2"></i>
                            </span>
                                 Add to Cart
                        </button>
                    </div>
                    {/* <div className="align-items-center">
                        <button className="btn px-2 py-0 bg-body-tertiary soft-box" style={{ borderRadius: '30px' }}>
                            <p className="font-2 my-auto py-2 px-1"><i className="bi bi-bag"></i></p>
                        </button>
                    </div>
                    <div className="align-items-center">
                        <button className="btn bg-dark text-white px-2 py-0" style={{ borderRadius: '30px' }}>
                            <p className="font-2 my-auto py-2 px-1">Buy Now</p>
                        </button>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="row mt-3 w-100 mx-auto">
        <div className="col-4">
          <button
            className="btn"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        </div>
        <div className="col-4 text-center">
          <p className="fw-bold m-0">
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <div className="col-4 text-end">
          <button
            className="btn"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};




export {WrapperProducts, ProductsList, FirstSection , BtnInside, SecondSection, CategoryMenu, ProductSection}