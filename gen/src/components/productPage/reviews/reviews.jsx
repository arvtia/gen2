import ReviewForm from "./insertReview"
import ShowReview from "./showReview";



const Reviews =() =>{



    return(
        <div className="py-2">
            <div className="mb-3 px-3">
                <div className="row">
                    <div className="col-12 col-lg-3 col-xl-3 ms-auto">
                        <ReviewForm/>
                    </div>
                    <div className="col-12 col-lg-9 col-xl-9 me-auto">
                        <ShowReview />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Reviews;