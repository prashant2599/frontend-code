import Link from "next/link";
import ShareProfile from "@/app/Home/doctorForm/ShareProfile";
import AppointmentForm from "@/app/Home/doctorForm/AppointmentForm";
import Image from "next/image";
import DoctorReview from "./DoctorReview";
import DoctorTotalReview from "./DoctorTotalReview";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  try {
    const combinedSlug = String(params.slug);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${combinedSlug}`,
      { cache: "no-store" }
    );
    const datas = await res.json();
    const docotorDetails = datas.data.doctor_info;
    const treament = datas.data.treatments;
    const hospitals = datas.data.hospital;
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
        <section id="doctorprofile-section">
          <div className="midbox-inner  wiki-mk">
            <div className="doctorprofile">
              <div className="doctorprofile-left">
                <div className="doctorprofile-img">
                  <Image
                    src={`https://dev.medflick.com/doctor/${docotorDetails.image}`}
                    alt={docotorDetails.slug}
                    width="150"
                    height="183"
                    className="doctorprofile-img-next"
                  />
                </div>
                <div className="doctorprofile-head">
                  <h1>
                    {docotorDetails.prefix} {docotorDetails.first_name}{" "}
                    {docotorDetails.last_name}
                  </h1>
                  <div className="department">{docotorDetails.designation}</div>
                  <div className="location">
                    {" "}
                    {docotorDetails.location.charAt(0).toUpperCase() +
                      docotorDetails.location.slice(1)}
                  </div>
                </div>
              </div>
              <div className="doctorprofile-right">
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
                    <img src="/images/2023/05/experience.png" alt="icon" />{" "}
                    Total experience
                  </div>
                  <div className="experience-years">
                    {docotorDetails.experience_year}+ Years
                  </div>
                </div>
                <div className="doctor-book-an">
                  <span className="save-profile">
                    {" "}
                    <ShareProfile slug={docotorDetails.slug} />
                  </span>

                  {/* <span
                  className="save-profile"
                    onClick={() => shareDoctorProfile(docotorDetails.slug)}
                  style={{ cursor: "pointer" }}
                >
                  Share Profile{" "}
                  <img src="/images/2023/05/share-profile.png" alt="icon" />
                </span> */}
                  {/* {isPopupOpen1 && (
                  <div
                    className="popup"
                    data-popup="popup-3"
                    style={popupStyle1}
                  >
                    <div className="popup-inner3">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="popup-close"
                            data-popup-close="popup-3"
                            data-dismiss="modal"
                            onClick={togglePopup1}
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <h2>Share Link</h2>
                        <p>Share this hospital with others via...</p>
                        <ul>
                          <li>
                            <FacebookShareButton
                              url={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
                            >
                              <FacebookIcon size={50} round />
                            </FacebookShareButton>
                          </li>
                          <li>
                            <TwitterShareButton
                              url={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
                            >
                              <TwitterIcon size={50} round />
                            </TwitterShareButton>
                          </li>
                          <li>
                            <WhatsappShareButton
                              url={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
                            >
                              <WhatsappIcon size={50} round />
                            </WhatsappShareButton>
                          </li>
                        </ul>

                        <div className="share-link">
                          <input
                            type="text"
                            placeholder="www.medflick.com/share/hospital"
                            name="name"
                            required=""
                            value={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
                            ref={inputRef}
                          />
                          <button
                            type="submit"
                            name="en"
                            className="copy-link"
                            onClick={copyToClipboard}
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

                  {/*  Appoinment form */}
                  <AppointmentForm doctorId={docotorDetails.id} />
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
                <a href="#about" target="_self">
                  About
                </a>
              </li>
              <li>
                <a href="#specializations" target="_self">
                  Specializations
                </a>
              </li>
              <li>
                <a href="#services" target="_self">
                  Services
                </a>
              </li>
            </ul>

            <div className="expert-profilebox">
              <div className="dr-boxright">
                <div className="doc-profile">
                  <img
                    src={`https://dev.medflick.com/doctor/${docotorDetails.image}`}
                    alt={docotorDetails.slug}
                  />{" "}
                  {docotorDetails.prefix} {docotorDetails.first_name}{" "}
                  {docotorDetails.last_name}
                </div>
                <a href="#" className="book-appointment">
                  Book Appointment{" "}
                  <img src="/images/2023/05/book.png" alt="icon" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="profile-data-section">
          <div className="midbox-inner  wiki-mk">
            <div id="overview" className="reviews-section">
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
                            <BsStarHalf /> {/* Use a half-star icon here */}
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

                  <DoctorReview
                    first={docotorDetails.prefix}
                    middle={docotorDetails.first_name}
                    last={docotorDetails.last_name}
                    doctorId={docotorDetails.id}
                    specialityId={docotorDetails.speciality_id}
                    hospitalId={docotorDetails.hospital_id}
                  />
                </div>

                <div className="overall-rating-right">
                  <h3>Recent Reviews</h3>

                  <div className="reviews-top-box">
                    <p className="more">
                      I cant thank Medflick enough for leading me to an
                      exceptional doctor who understood my health concerns.
                      Through their platform, I found not just a doctor, but a
                      compassionate guide who helped me through my recovery
                      journey.
                    </p>
                    {/* <div className="name-month-box">
                      Name
                      <div className="month-box">
                        <span></span>1 Month Ago
                      </div>
                    </div> */}
                  </div>

                  <div className="reviews-top-box">
                    <p className="more">
                      Finding my doctor on Medflick was a great experience. The
                      platform not only connected me to an expert but also
                      empowered me with knowledge about my condition. Medflick
                      truly bridges the gap between patients and expert care.
                    </p>
                    {/* <div className="name-month-box">
                      Name
                      <div className="month-box">
                        <span></span>1 Month Ago
                      </div>
                    </div> */}
                  </div>
                  <a href="#/" className="read-mor-reviews">
                    Read More Reviews
                  </a>
                </div>
              </div>
            </div>

            <div id="about" className="profile-data-section">
              <h2>About</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: docotorDetails && docotorDetails.long_description,
                }}
              />
            </div>

            <div className="doctor-education">
              <div className="education-box">
                <h2>
                  <img src="/images/2023/05/01/1.png" alt="icon" />
                  Education
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: docotorDetails && docotorDetails.qualification,
                  }}
                />
              </div>

              <div className="education-box">
                <h2>
                  <img src="/images/2023/05/01/2.png" alt="icon" />
                  Titles and Positions
                </h2>
                <ul>
                  <li>{docotorDetails.designation}</li>
                </ul>
              </div>

              <div className="education-box">
                <h2>
                  <img src="/images/2023/05/01/3.png" alt="icon" />
                  Hospital Affiliations
                </h2>
                <ul>
                  {hospitals.map((e, index) => (
                    <li key={index}>{e.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Doctor video section */}
            {/* <DoctorVideo /> */}

            {/* End */}
            {docotorDetails.specialization && (
              <div id="specializations" className="profile-data-section">
                <h2>Specialization</h2>
                <div className="medical-box">
                  {/* {docotorDetails.specialization &&
                  docotorDetails.specialization
                    .split(",")
                    .map((amenity, index) => (
                      <Link key={index}>{amenity.trim()}</Link>
                    ))} */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: docotorDetails && docotorDetails.specialization,
                    }}
                  />
                </div>
              </div>
            )}

            <div id="services" className="profile-data-section">
              <h2>Services</h2>
              <div className="medical-box">
                {treament.map((e) => (
                  <a href="#" target="_self" key={e.id}>
                    {e.name}
                  </a>
                ))}
              </div>
            </div>
            <DoctorTotalReview doctorId={docotorDetails.id} />
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
    `https://dev.medflick.com/api/doctor/${combinedSlug}`
  );
  const datas = await res.json();
  const docotorDetails = datas.data.doctor_info;
  const hospitalIndex = datas.data.hospital[0];
  const hospitalName = hospitalIndex.name;

  if (!(docotorDetails.title && docotorDetails.description))
    return {
      title:
        docotorDetails.prefix +
        " " +
        docotorDetails.first_name +
        " " +
        docotorDetails.last_name +
        " | Best " +
        docotorDetails.seo_keyword +
        " Doctor in " +
        docotorDetails.location +
        ", India | Medflick",
      description:
        "Book an Appointment with " +
        docotorDetails.prefix +
        docotorDetails.first_name +
        " " +
        docotorDetails.last_name +
        " " +
        docotorDetails.seo_keyword +
        " " +
        "in " +
        docotorDetails.location +
        " " +
        "with " +
        docotorDetails.experience_year +
        "+ years of exceptional clinical expertise, associated with " +
        hospitalName,
      alternates: {
        canonical: `https://medflick.com/doctor/${combinedSlug}`,
      },
      openGraph: {
        images: `https://dev.medflick.com/doctor/${docotorDetails.image}`,
      },
    };

  return {
    title: docotorDetails.title,
    description: docotorDetails.description,
    openGraph: {
      title: docotorDetails.title,
      description: docotorDetails.description,
    },
    alternates: {
      canonical: `https://medflick.com/doctor/${combinedSlug}`,
    },
  };
}
