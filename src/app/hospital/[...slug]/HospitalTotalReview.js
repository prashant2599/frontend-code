import { AiTwotoneStar } from "react-icons/ai";

const HospitalTotalReview = async ({ hospitalId }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/showreview/hospital/${hospitalId}`,
    { cache: "no-store" }
  );

  const datas = await res.json();
  const reviews = datas.showreview;

  if (reviews.length === 0) {
    return null; // Don't render anything if there are no reviews
  }

  const formatDate = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = currentDate - createdDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    if (secondsDifference < 60) {
      return `${secondsDifference} second${
        secondsDifference !== 1 ? "s" : ""
      } ago`;
    }
    const minutesDifference = Math.floor(secondsDifference / 60);
    if (minutesDifference < 60) {
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? "s" : ""
      } ago`;
    }
    const hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
    }
    const daysDifference = Math.floor(hoursDifference / 24);
    if (daysDifference < 30) {
      return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
    }
    const monthsDifference = Math.floor(daysDifference / 30);
    if (monthsDifference < 12) {
      return `${monthsDifference} month${
        monthsDifference !== 1 ? "s" : ""
      } ago`;
    }
    const yearsDifference = Math.floor(monthsDifference / 12);
    return `${yearsDifference} year${yearsDifference !== 1 ? "s" : ""} ago`;
  };
  return (
    <>
      <div id="reviews" className="profile-data-section">
        <h2>Reviews</h2>
        <div className="most-reviews">
          <select className="reviews-dropdown" aria-label="Sort dropdown">
            <option value="select-language">Most Relevant</option>
            <option value="">Oncology</option>
            <option value="">Medical Oncology</option>
          </select>
        </div>

        {reviews.map((review) => (
          <div key={review.id} className="reviews-top-box">
            <div className="star-rating-box">
              {[...Array(5)].map((_, index) => (
                <i key={index}>
                  <AiTwotoneStar
                    style={{
                      fontSize: "24px",
                      color: index < review.rating ? "gold" : "gray",
                    }}
                  />
                </i>
              ))}
            </div>
            <p>{review.rating_description}</p>
            <div className="name-month-box">
              {review.name}
              <div className="month-box">
                <span></span>
                {formatDate(review.created_at)}
              </div>
            </div>
          </div>
        ))}

       

        <a href="#" className="read-mor-reviews">
          Read More Reviews
        </a>
      </div>
    </>
  );
};

export default HospitalTotalReview;
