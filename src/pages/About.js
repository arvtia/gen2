
import PartnerMarquee from "../components/AboutUs/clients";
import EmptySpace from "../components/AboutUs/emptySpace";
import Intro from "../components/AboutUs/intro";
import OurStory from "../components/AboutUs/ourStory";
import TeamsCarousel from "../components/AboutUs/team";
import Testimony from "../components/AboutUs/testimony";

import ReactbitsImageT from "../components/reactbit-components/Trialpage";





const AboutUs = () =>{
    return(
        <>
        <Intro/>
        <ReactbitsImageT />
        <EmptySpace />
        <OurStory />
        <TeamsCarousel />
        <PartnerMarquee />
        <Testimony />
        </>
    )
}

export default AboutUs;