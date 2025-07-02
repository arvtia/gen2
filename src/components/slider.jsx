import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



// Import required Swiper modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


const Slider =()=> {

    const [ picture , setPicture] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3002/sliderImage")
        .then((res) => setPicture(res.data))
        .catch(err => console.log("error while catching document", err))
    }, [])


  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper mt-2"
      > 
        {/* <SwiperSlide><img src="https://tinyurl.com/3jpj2n6k" alt="image" className="img-fluid" style={{objectFit:"cover", height:"80vh", width:"100%"}} /></SwiperSlide> */}
        {
            picture.map((item, index)=>(
                <SwiperSlide><img src={item.img} key={index} alt="image" className="img-fluid" style={{objectFit:"cover", height:"80vh", width:"100%"}} /></SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}

export default Slider;