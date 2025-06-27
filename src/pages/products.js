import CarouselLast from "../components/homepageComp/carousel";
import Breadcrumbs from "../components/productPage/breadcrumb";
import MainProducts2 from "../components/productPage/mainProduct"
import Reviews from "../components/productPage/reviews/reviews";



const MainProducts =() =>{
    return(
        <>
            <Breadcrumbs />
            <MainProducts2 />
            <Reviews />
            <CarouselLast />
        </>
    )
}
export default MainProducts;