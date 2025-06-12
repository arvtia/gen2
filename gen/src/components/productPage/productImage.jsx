

// this would be left side - image seciton = 
const ProductSlide = () =>{
    return(
        <div className="col-12 col-lg-6 col-xl-6">
            <div className="mb-2">
                <img src={""} alt="prodct-img" className="img-fluid object-fit-cover " />
            </div>
            <div className="py-2">
                <div className="row">
                    <div className="col-3">
                        <img src={""} alt="smaller-images" className="img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductSlide;