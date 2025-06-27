import { WrapperProducts } from "../components/homepageComp/productsList";
import Slider from "../components/slider";
import CarouselLast from "../components/homepageComp/carousel";
import FindMore from "../components/homepageComp/findMore";

const Home = () =>{
    return (
        <>
        <Slider />
        <WrapperProducts />
        
        {/* <Carousel/> */}
        <CarouselLast />
        <FindMore />
        </>
    )
}

export default Home;