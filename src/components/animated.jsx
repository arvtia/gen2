import CircularText from './circularText';

const BrandNavbar =() =>{
    return(
        <CircularText
        text="GEN*GY*NEW*ERA*OF*SHOPPIN"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
        />
    )
}

export default BrandNavbar;