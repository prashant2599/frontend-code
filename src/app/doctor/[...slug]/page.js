import AppointmentForm from "@/app/Home/doctorForm/AppointmentForm";
import DoctorReview from "./DoctorReview";
import DoctorTotalReview from "./DoctorTotalReview";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { notFound } from "next/navigation";
import RelatedDoctor from "./RelatedDoctor";
import "@/app/Home/NewUIHomepage/newsection.css";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import DoctorShare from "./DoctorShare";
import DoctorHeader from "./DoctorHeader";
import Link from "next/link";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return "Invalid input";
  }
}

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
    const speciality = datas.data.speciality;

    const totalRating = rating.reduce(
      (total, rating) => total + parseInt(rating.rating),
      0
    );
    const overallRating = rating.length > 0 ? totalRating / rating.length : 0;

    const numStars = Math.floor(overallRating);

    const hasHalfStar = overallRating % 1 !== 0;

    const url = `doctor/${combinedSlug}`;
    return (
      <>
        <NewHeader />
        <section id="doctorprofile-section">
          <div className="midbox-inner  wiki-mk">
            <div className="doctorprofile">
              <div className="doctorprofile-left">
                <div className="doctorprofile-img">
                  <img
                    src={`https://dev.medflick.com/doctor/${docotorDetails.image}`}
                    alt="e.name"
                  />
                </div>
                <div className="doctorprofile-head">
                  <h1>
                    {docotorDetails.prefix} {docotorDetails.first_name}{" "}
                    {docotorDetails.last_name}
                  </h1>
                  <div className="department" style={{ color: "#ff6800" }}>
                    {docotorDetails.dept}
                  </div>
                  <div className="department">{docotorDetails.designation}</div>
                  <div className="location">
                    {hospitals[0].name}, {formatText(docotorDetails.location)}
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
                  <DoctorShare slug={docotorDetails.slug} />

                  {/*  Appoinment form */}
                  <AppointmentForm
                    doctorId={docotorDetails.id}
                    first={docotorDetails.prefix}
                    middle={docotorDetails.first_name}
                    last={docotorDetails.last_name}
                    specialityId={docotorDetails.speciality_id}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <DoctorHeader docotorDetails={docotorDetails} treament={treament} />
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
                    url={url}
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
                  {/* <a href="#/" className="read-mor-reviews">
                    Read More Reviews
                  </a> */}
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
                  {docotorDetails.specialization &&
                    docotorDetails.specialization
                      .split(",")
                      .map((amenity, index) => (
                        <a key={index}>{amenity.trim()}</a>
                      ))}
                </div>
              </div>
            )}
            {treament.length > 0 && (
              <div id="services" className="profile-data-section">
                <h2>Services</h2>
                <div className="medical-box">
                  {treament.map((e) => (
                    <Link href={`/treatment/${e.slug}`} key={e.id}>
                      {e.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <DoctorTotalReview doctorId={docotorDetails.id} />
          </div>
        </section>
        {/* {speciality && speciality.length > 0 && (
          <RelatedDoctor
            category={speciality[0].slug}
            doctorId={docotorDetails.id}
          />
        )} */}

        <NewFooter />
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
  const hospitalName = hospitalIndex && hospitalIndex.name;

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
