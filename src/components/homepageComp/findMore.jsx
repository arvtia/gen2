import { BtnInside } from "./productsList"


const FindMore =() =>{
    return(
        <div className="py-3 px-2 px-lg-5 px-xl-5">
            <div className="container-fluid dark-gradient rounded-4 py-4">
                <div className="row d-flex justify-content-between flex-wrap px-4">
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <div className="my-2">
                            <p className="display-3 text-wrap lh-1 text-white">
                                Ready to Get Our New Stuff? 
                            </p>
                        </div>
                        <BtnInside/>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4 align-items-center">
                        <div className="text-white text-wrap">
                            Lorem ipsum dolor sit amet.
                            Dolorem quasi dolore voluptatem ducimus?
                            Molestiae eius natus dolor pariatur!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindMore;
