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
        <>
        </>
    )
}

export default ProductListing;