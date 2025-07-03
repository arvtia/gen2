import axios from "axios";
import { useEffect, useState } from "react";




function ImageTesting() {
    const [ product , setProducts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3002/products')
        .then((res)=>setProducts(res.data))
        .catch((err)=>{
            console.log("some err", err)
        })
    },[])

    const lastElement = product[product.length -1] || {};


    return (
        <>
            <div className="py-5">
                <div className="col-4">
                    <img src="/assests/images/cable002.jpg" alt="th is fr test" />
                </div>
                <div className="card">
                    <div className="card-title">
                        <h1>{lastElement.productName}</h1>
                        <p>{lastElement.description}</p>
                        <div className="d-flex flex-wrap">
                            {lastElement?.imagesCollection?.map((item, index) => (
                                <img
                                    src={`./assests/images/${item}`} // or /assests/ if that’s what you’re using
                                    key={index}
                                    alt={`product-img-${item}`}
                                    style={{ maxWidth: 150, marginRight: 10 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>    
        </>

    )
}

export default ImageTesting;