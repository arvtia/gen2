import { useEffect, useState } from "react";
import ImageTrail from "./imageTrail";

const ReactbitsImageT = () => {
    const [images, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:3002/products")
            .then((res) => res.json())
            .then((data) => {
                // Extract images from all products & limit to 8
                const fetchedImages = data.flatMap(product => product.categoryImg || []).slice(0, 8);
                
                setFilteredProducts(fetchedImages);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching images from API:", err);
                setLoading(false);
            });
    }, []); // No need for `[name]` dependency
    
    return (
        <div style={{ height: "500px", position: "relative", overflow: "hidden" }}>
            {loading ? (
                <p>Loading images...</p>
            ) : (
                <ImageTrail items={images} variant={1} />
            )}
        </div>
    );
};

export default ReactbitsImageT;