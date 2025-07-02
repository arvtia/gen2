import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductImageSlider from "./SliderProdImages";
import ProductCard from "./productsSec";

const MainProducts2 = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/products/${id}`)
      .then((res) => {
        if (res.data.visible) {
          setProduct(res.data);
          setIsHidden(false);
        } else {
          setProduct(null);
          setIsHidden(true);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setIsHidden(true);
      });
  }, [id]);

  if (isHidden) {
    return (
      <div className="py-5 text-center">
        <h4>This product is currently not available in the store, come back later</h4>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-5 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }

    return (
        <div className="py-2">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="p-3">
                        <ProductImageSlider images={product.imagesCollection} />
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="mt-4">
                        <div className="py-4 px-3">
                        <ProductCard product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProducts2;