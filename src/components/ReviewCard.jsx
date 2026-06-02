import './ReviewCard.css'

export function ReviewCard({review}){
  return(
    <>
      <div className="reviewDiv">
        <p className="reviewerName">{review.reviewerName}</p>
        <p className="reviewerRating">{review.rating}</p>
        <p className="reviewerDate">{review.date}</p>
        <p className="reviewerComment">{review.comment}</p>
      </div>
    </>
  )
}