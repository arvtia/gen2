
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import axios from "axios";
import ProductImageSlider from "./SliderProdImages";
import ProductCard from "./productsSec";

const MainProducts2 = () =>{

     const { id } = useParams();
        const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
        // const product = products.find(i => i.id.toString() === id);

    useEffect(() => {
    axios.get(`http://localhost:3002/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.log("error", err));
    }, [id]);

    return(
        <div className="py-2">
            <div className="mt-1">
                <div className="row">
                    {/* slider- products */}
                    <div className="col-12  col-lg-6 col-xl-6">
                        <div className="p-3">
                            {product ? (
                                <ProductImageSlider images={product.imagesCollection} />
                                ) : (
                                <p>loading</p>
                                )
                            }
                        </div>
                    </div>

                    {/* product description */}
                    <div className="col-12  col-lg-6 col-xl-6">
                        <div className="mt-4">
                            <div className="py-4 px-3">
                                {
                                    product ? (
                                        <ProductCard product={product} />
                                    ) : (
                                        <p>loading</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainProducts2