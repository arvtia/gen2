import { useEffect, useState } from "react";



const ProductListing =() =>{

    const [products , setProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3002/products')
        .then((res)=> res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error('Error fetching data:', err));
    },[])


    return(
        
        <div className="py-4 my-2">
            <div className="mb-2 px-2 d-flex flex-wrap">
                {
                    products.map((item, index) =>(
                        <div key={index} className="card" style={{width:"290px"}}>
                            <img src={item.imagesCollection[0]} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>


    )
}

export default ProductListing;