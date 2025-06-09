const cardsContent = [
    { id: 1, title: "Trending Products", description: "Most trending products in the market", subcards: [
        { img: "https://tinyurl.com/mt4ve3pt", prodTitle: "Smartphone", prodPrice: "899" },
        { img: "https://tinyurl.com/2c5yp8dz", prodTitle: "Wireless Charger", prodPrice: "59" },
        { img: "https://tinyurl.com/2rb4a7da", prodTitle: "Bluetooth Speaker", prodPrice: "129" },
        { img: "https://tinyurl.com/5334dxvs", prodTitle: "Fitness Band", prodPrice: "79" }
    ]},
    { id: 2, title: "Top Seller", description: "Most bought items by customers", subcards: [
        { img: "https://tinyurl.com/bdezve7j", prodTitle: "TWS", prodPrice: "1199" },
        { img: "https://via.placeholder.com/150", prodTitle: "Gaming Console", prodPrice: "499" },
        { img: "https://via.placeholder.com/150", prodTitle: "Noise-Canceling Headphones", prodPrice: "199" },
        { img: "https://via.placeholder.com/150", prodTitle: "Portable SSD", prodPrice: "149" }
    ]},
    { id: 3, title: "Gen-Gy Verified", description: "verified high-quality products", subcards: [
        { img: "https://via.placeholder.com/150", prodTitle: "Smart TV", prodPrice: "799" },
        { img: "https://via.placeholder.com/150", prodTitle: "Streaming Stick", prodPrice: "49" },
        { img: "https://via.placeholder.com/150", prodTitle: "Wireless Keyboard", prodPrice: "89" },
        { img: "https://via.placeholder.com/150", prodTitle: "Stylus Pen", prodPrice: "39" }
    ]},
    { id: 4, title: "Smart Pick", description: "Carefully chosen items to begin with", subcards: [
        { img: "https://via.placeholder.com/150", prodTitle: "Mechanical Keyboard", prodPrice: "129" },
        { img: "https://via.placeholder.com/150", prodTitle: "Gaming Mouse", prodPrice: "49" },
        { img: "https://via.placeholder.com/150", prodTitle: "RGB Mouse Pad", prodPrice: "29" },
        { img: "https://via.placeholder.com/150", prodTitle: "Webcam", prodPrice: "89" }
    ]}
];
const Cards1 = () => {
    return (
        <div className="py-3 py-lg-3 py-xl-1">
            <div className="container-fluid">
                <div 
                    className=" mx-auto iphone-view soft-blur py-2 justify-content-evenly" 
                        style={{
                            marginTop: "-176px",
                            position: "relative",
                            zIndex: 2,
                            display: "flex",
                            flexDirection: "row",
                            scrollBehavior: "smooth",
                            overflowX: "scroll"
                        }}>
                    {cardsContent.map((card) => (
                        <div className="card bg-light mx-2 p-3" key={card.id} style={{ maxWidth: "300px", minWidth:"299px" }}>
                            <div className="m-0 p-0">
                                <p className="fs-4 m-0 p-0 fw-bold">{card.title}</p>
                            </div>
                            <p className="text-muted p-0 m-0">{card.description}</p>
                            <div className="row d-flex flex-wrap">
                                {card.subcards.map((product, index) => (
                                    <div className="card p-2 my-2 mx-auto" key={index} style={{ width: "45%" }}>
                                        <img src={product.img} alt={product.prodTitle} className="img-fluid" style={{height:"110px", width:"120px", objectFit:"cover"}} />
                                        <p className="font-1 p-0 m-0">{product.prodTitle}</p>
                                        <p className="fw-bold p-0 m-0">₹{product.prodPrice}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Cards1;
