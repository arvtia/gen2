
import PartnerMarquee from "../components/AboutUs/clients";
import Intro from "../components/AboutUs/intro";
import OurStory from "../components/AboutUs/ourStory";
import TeamsCarousel from "../components/AboutUs/team";
import Testimony from "../components/AboutUs/testimony";



const AboutUs = () =>{
    return(
        <>
        <Intro/>
        <OurStory />
        <TeamsCarousel />
        <PartnerMarquee />
        <Testimony />
        </>
    )
}

export default AboutUs;