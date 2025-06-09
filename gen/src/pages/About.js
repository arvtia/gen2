
import PartnerMarquee from "../components/AboutUs/clients";
import EmptySpace from "../components/AboutUs/emptySpace";
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
        <EmptySpace />
        <PartnerMarquee />
        <EmptySpace />
        <Testimony />
        <EmptySpace />
        </>
    )
}

export default AboutUs;