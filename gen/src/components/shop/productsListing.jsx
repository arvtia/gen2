import { useEffect, useState } from "react";



const ProductListing =() =>{

    const [products , setProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3002/products')
        .then((res)=> res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error('Error fetching data:', err));
    },[])

    let productCount  = 0 


    return(
        
        <div className="py-4 my-2">
            <div className="mb-2 px-2">
                {
                    products.map((item, index) =>(
                        <div key={index} className="card">
                            <img src={item.productimg} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>


    )
}

export default ProductListing;