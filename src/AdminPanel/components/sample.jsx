import EditReview from "./editReview";
import NavLinksAdmin from "./navLinks/NavLinksAdmin";
import SliderHome from "./slider/SliderHome";

const Users = () =>{
    return(
        <div className="py-5 my-5">
            <h1 className="text-center display-2">Reviews Section</h1>
            <div className="row py-2">
                <div className="col-12 col-lg-11 col-lx-11 justify-content-center">
                    <EditReview />
                </div>
            </div>
            
        </div>
    )
}

const Settings =() =>{
    return(
        <div className="py-5 mt-5">
            <p className="text-center fw-bold"> Slider Images</p>
            <SliderHome />
        </div>
    )
}

const NavBarLinks =() =>{
    return(
        <div className="py-4">
            <NavLinksAdmin />
        </div>
    )
}

export  { Users, Settings, NavBarLinks};