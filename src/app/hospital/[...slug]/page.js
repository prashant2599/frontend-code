import Link from "next/link";
import HospitalDoctorsFilter from "./HospitalDoctorsFilter";
import AppointmentForm from "@/app/Home/hospitalForm/AppointmentForm";
import HospitalShareProfile from "./HospitalShareProfile";
import HospitalGallery from "./HospitalGallery";
import HospitalRating from "./HospitalRating";
import HospitalTotalReview from "./HospitalTotalReview";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital/${combinedSlug}`,
      { cache: "no-store" }
    );
    const datas = await res.json();
    const hospitalDetails = datas.data.hospital_info;
    const speciality = datas.data.speciality;
    const doctor = datas.data.doctors;
    const gallery = datas.data.hospital_gallery;
    const rating = datas.data.rating;

    const totalRating = rating.reduce(
      (total, rating) => total + parseInt(rating.rating),
      0
    );
    const overallRating = rating.length > 0 ? totalRating / rating.length : 0;

    const numStars = Math.floor(overallRating);

    const hasHalfStar = overallRating % 1 !== 0;
    return (
      <>
        <section id="hospitalprofile-section">
          <div className="midbox-inner  wiki-mk">
            <div className="hospitalprofile">
              <div className="hospitalprofile-left">
                <div className="hospitalprofile-img">
                  <img
                    src={`https://dev.medflick.com/hospital/${hospitalDetails.icon}`}
                    alt={hospitalDetails.slug}
                  />
                </div>
                <div className="hospitalprofile-head">
                  <h1>{hospitalDetails.name}</h1>
                  <div className="location">
                    {hospitalDetails.location.charAt(0).toUpperCase() +
                      hospitalDetails.location.slice(1)}
                  </div>
                </div>
              </div>
              <div className="hospitalprofile-right">
                <div className="rating-Overall">
                  <div className="rating-box">
                    <i>
                      <BsStarFill style={{ color: "gold", fontSize: "20px" }} />
                    </i>{" "}
                    Overall rating
                  </div>
                  <div className="rating-no">{overallRating.toFixed(2)}</div>
                  <a href="#/" className="verified-link">
                    {rating.length} verified{" "}
                    {rating.length === 1 ? "review" : "reviews"}
                  </a>
                </div>
                <div className="experience-total">
                  <div className="experience-text">
                    <img src="/images/2023/05/doctors.png" alt="doctor-icon" />{" "}
                    Doctors
                  </div>
                  <div className="experience-years">{hospitalDetails.doc}</div>
                </div>
                <div className="experience-total">
                  <div className="experience-text">
                    <img
                      src="/images/2023/05/established.png"
                      alt="doctor-icon"
                    />{" "}
                    Established
                  </div>
                  <div className="experience-years">
                    {hospitalDetails.established}
                  </div>
                </div>
                <div className="doctor-book-an">
                  <HospitalShareProfile hospitalDetails={hospitalDetails} />

                  <AppointmentForm hospitalId={hospitalDetails.id} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="profile-link">
          <div className="midbox-inner  wiki-mk ">
            <ul>
              <li>
                <a href="#reviews" target="_self" className="active">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#overview" target="_self">
                  Overview
                </a>
              </li>
              <li>
                <a href="#Search-doctor" target="_self">
                  Search Doctor
                </a>
              </li>
              <li>
                <a href="#gallery" target="_self">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#doctor" target="_self">
                  Doctors
                </a>
              </li>
              <li>
                <a href="#amenitie" target="_self">
                  Amenities
                </a>
              </li>
            </ul>

            <div className="expert-profilebox">
              <div className="hospital-boxright">
                <div className="hos-profile">
                  <div className="hosprofile-img">
                    <img
                      src={`https://dev.medflick.com/hospital/${hospitalDetails.icon}`}
                      alt={hospitalDetails.name}
                    />
                  </div>{" "}
                  <span>{hospitalDetails.name}</span>
                </div>
                <a href="#" className="book-appointment">
                  Enquire Now <img src="/images/2023/05/book.png" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="profile-data-section">
          <div className="midbox-inner  wiki-mk">
            <div className="reviews-section">
              <div className="overall-rating">
                <div className="overall-rating-left">
                  <h3>Overall Rating</h3>
                  <div className="star-rating">
                    <div className="rating-nobox">
                      {overallRating.toFixed(2)}
                    </div>
                    {rating.length > 0 ? (
                      <div className="star-rating-box">
                        {[...Array(numStars)].map((_, index) => (
                          <i key={index}>
                            <BsStarFill />
                          </i>
                        ))}
                        {hasHalfStar && (
                          <i>
                            <BsStarHalf />
                          </i>
                        )}
                        <span>
                          Based on{" "}
                          <a href="#/">
                            {rating.length} Review
                            {rating.length !== 1 ? "s" : ""}
                          </a>
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <HospitalRating
                    name={hospitalDetails.name}
                    hospitalId={hospitalDetails.id}
                  />
                </div>

                <div className="overall-rating-right">
                  <h3>Recent Reviews</h3>

                  <div className="reviews-top-box">
                    <p className="more">
                      In every aspect, this hospital exceeded my expectations.
                      The staffs genuine concern and warmth made me feel like
                      more than simply a patient. The doctors took the time to
                      listen and properly explain everything to me, which gave
                      me confidence in my treatment. Its more than a hospital;
                      its a place where healing is supported by compassion, and
                      where everyone genuinely cares about your health.
                    </p>
                    {/* <div className="name-month-box">
                      Name
                      <div className="month-box">
                        <span></span>1 Month Ago
                      </div>
                    </div> */}
                  </div>

                  {/* <div className="reviews-top-box">
                    <p className="more">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore Ut enim ad
                      minim veniam, quis nostrud exercitati.
                    </p>
                    <div className="name-month-box">
                      Name
                      <div className="month-box">
                        <span></span>1 Month Ago
                      </div>
                    </div>
                  </div> */}
                  <a href="#reviews" className="read-mor-reviews">
                    Read More Reviews
                  </a>
                </div>
              </div>
            </div>

            <div id="overview" className="profile-data-section">
              <h2>Overview</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: hospitalDetails.long_description,
                }}
              />
            </div>

            <div id="gallery" className="profile-data-section">
              <h2>Gallery</h2>
              <HospitalGallery gallery={gallery} />
            </div>

            {/* Doctor section */}

            <HospitalDoctorsFilter doctor={doctor} />

            <div id="specialists" className="profile-data-section">
              <h2>Specialists</h2>

              <div className="specialists-item">
                {speciality &&
                  speciality.map((e) => (
                    <div className="specialists-boxitem" key={e.id}>
                      <div className="boxitem">
                        <img
                          src={`https://dev.medflick.com/speciality/${e.icon}`}
                          alt="speciality-icons"
                        />
                        <h4>{e.name}</h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div id="amenitie" className="profile-data-section">
              <h2>Amenities</h2>
              {/* <div className="amenities-name">Treatment</div> */}
              <div className="medical-box">
                {/* {hospitalDetails.amenities &&
                hospitalDetails.amenities
                  .split(",")
                  .map((amenity, index) => (
                    <Link key={index}>{amenity.trim()}</Link>
                  ))} */}

                <div
                  dangerouslySetInnerHTML={{
                    __html: hospitalDetails.amenities,
                  }}
                />
              </div>

              {/* <div className="amenities-name">Speciality</div>
              <div className="medical-box">
                <a href="#" target="_self">
                  Document legalisation
                </a>
                <a href="#" target="_self">
                  Medical records transfer
                </a>
                <a href="#" target="_self">
                  Online doctor consultation{" "}
                </a>
                <a href="#" target="_self">
                  Pharmacy{" "}
                </a>
                <a href="#" target="_self">
                  Post operative followup{" "}
                </a>
                <a href="#" target="_self">
                  Rehabilitation
                </a>
              </div> */}

              <div className="amenities-name">Food</div>
              <div className="medical-box">
                {hospitalDetails.food &&
                  hospitalDetails.food
                    .split(",")
                    .map((amenity, index) => (
                      <Link key={index}>{amenity.trim()}</Link>
                    ))}
              </div>

              <div className="amenities-name">Language</div>
              <div className="medical-box">
                {hospitalDetails.language_spoken &&
                  hospitalDetails.language_spoken
                    .split(",")
                    .map((amenity, index) => (
                      <Link key={index}>{amenity.trim()}</Link>
                    ))}
              </div>
            </div>
            <HospitalTotalReview hospitalId={hospitalDetails.id} />
          </div>
        </section>
      </>
    );
  } catch (error) {
    if (error) {
      notFound();
    }
  }
};

export default page;

export async function generateMetadata({ params }) {
  const combinedSlug = params.slug.join("/");
  const res = await fetch(
    `https://dev.medflick.com/api/hospital/${combinedSlug}`
  );
  const datas = await res.json();
  const hospitalDetails = datas.data.hospital_info;

  if (!hospitalDetails.description)
    return {
      description:
        "Book an appointment at" +
        hospitalDetails.name +
        " " +
        hospitalDetails.city +
        ". Know about Doctors, Specialities, Treatments, Services, Location, Reviews, Cost, Experience and Expertise",
      alternates: {
        canonical: `https://medflick.com/hospital/${combinedSlug}`,
      },
      openGraph: {
        images: `https://dev.medflick.com/hospital/${hospitalDetails.icon}`,
      },
    };

  return {
    title: hospitalDetails.title,
    description: hospitalDetails.description,
    openGraph: {
      title: hospitalDetails.title,
      description: hospitalDetails.description,
    },
    alternates: {
      canonical: `https://medflick.com/hospital/${combinedSlug}`,
    },
    openGraph: {
      images: `https://dev.medflick.com/hospital/${hospitalDetails.icon}`,
    },
  };
}
