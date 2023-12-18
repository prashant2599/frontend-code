import NavForm1 from "@/app/Home/treatmentForm/NavForm1";
import NavForm2 from "@/app/Home/treatmentForm/NavForm2";
import TreatmentForm1 from "@/app/Home/treatmentForm/TreatmentForm1";
import Link from "next/link";
import NavDoctors from "./NavDoctors";
import CostCityWise from "./CostCityWise";
import NavHospitals from "./NavHospitals";
import Qa from "./Qa";
import Community from "@/app/Home/community/Community";
import TreatmentFaq from "./TreatmentFaq";
import TreatmentBlog from "./TreatmentBlog";
import "@/app/Home/NewUIHomepage/newsection.css";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/treatment/${combinedSlug}`,
      { cache: "no-store" }
    );
    const datas = await res.json();
    const info = datas.treateDetailsbyCountry.treateDetailsbyCountry;
    const doctor = datas.treateDetailsbyCountry.doctors;
    const hospital = datas.treateDetailsbyCountry.hospitals;
    const cost = datas.treateDetailsbyCountry.treatment_cost_comparison;
    const qa = datas.treateDetailsbyCountry.qa;
    const faq = datas.treateDetailsbyCountry.faqs;
    const blog = datas.treateDetailsbyCountry.blogs;
    const speciality = datas.treateDetailsbyCountry.speciality;

    return (
      <>
        <section id="treatment-section">
          <div className="midbox-inner wiki-mk">
            <div className="treatment-top">
              <div className="treatment-headtext">
                <h1>{info.name}</h1>
                <p>Avg Price: {info.special_price}</p>
              </div>
              <div className="treatment-subtext">{info.quote}</div>
            </div>
          </div>
        </section>
        <section id="treatment-banner">
          <div className="treatment-bannerimg">
            <img
              src={`https://dev.medflick.com/treatments/${info.image}`}
              alt={info.slug}
              className="treatment-banner-img1"
            />
            <img
              src={`https://dev.medflick.com/treatments/${info.image}`}
              alt={info.slug}
              className="treatment-banner-img2"
            />
          </div>
          <div className="midbox-inner  wiki-mk">
            <div className="treatment-headbox">
              <div className="treatment-left">
                <ul>
                  <li>
                    <h2>{info.treatment_time}</h2> <p>Treatment Time</p>
                  </li>
                  <li>
                    <h2>{info.recovery_time}</h2> <p>Recovery Time</p>
                  </li>
                  <li>
                    <h2>{info.hospitalization_days}</h2> <p>Hospitalization Days</p>
                  </li>
                  <li>
                    <h2>{info.success_rate}</h2> <p>Success Rate</p>
                  </li>
                </ul>
              </div>
              {/* form */}
              <TreatmentForm1
                treatmentId={info.id}
                specialityId={info.speciality_id}
              />
              {/* end */}
            </div>
          </div>
        </section>

        {/* cost comprision */}
        <CostCityWise cost={cost} info={info.menu_name} />
        <section className="treatment-marquee" id="category-marquee">
          <div className="marquee-wrapper">
            <div className="marquee" style={{ animationDuration: "21s" }}>
              <div className="Marquee-tag"> 100+ Surgeries </div>
              <div className="Marquee-tag"> 95% Success Rate </div>
              <div className="Marquee-tag"> 4000+ Top Doctors </div>
              <div className="Marquee-tag"> 1000+ Top Hospital </div>
              <div className="Marquee-tag"> 100+ Surgeries </div>
              <div className="Marquee-tag"> 95% Success Rate </div>
              <div className="Marquee-tag"> 4000+ Top Doctors </div>
              <div className="Marquee-tag"> 1000+ Top Hospital </div>
            </div>
          </div>
        </section>

        <section id="treatment-mid">
          <div className="midbox-inner  wiki-mk">
            <div className="treatment-findox">
              <div className="treatment-leftbox">
                <ul>
                  <li>
                    <a
                      target="_self"
                      href="#transplant-nav1"
                      className="active"
                    >
                      Overview
                    </a>
                  </li>
                  {info.head_brief && (
                    <li>
                      <a href="#transplant-nav2">{info.head_brief}</a>
                    </li>
                  )}
                  {info.head_needed && (
                    <li>
                      <a href="#transplant-nav3">{info.head_needed}</a>
                    </li>
                  )}
                  {info.head_types && (
                    <li>
                      <a href="#transplant-nav4" target="_self">
                        {info.head_types}
                      </a>
                    </li>
                  )}
                  {info.head_complications && (
                    <li>
                      <a href="#transplant-nav7" target="_self">
                        {info.head_complications}
                      </a>
                    </li>
                  )}
                  {info.head_post_procedure && (
                    <li>
                      <a href="#transplant-nav8" target="_self">
                        {info.head_post_procedure}
                      </a>
                    </li>
                  )}
                  {info.head_life_after && (
                    <li>
                      <a href="#transplant-nav9" target="_self">
                        {info.head_life_after}
                      </a>
                    </li>
                  )}
                  {info.head_success_ate && (
                    <li>
                      <a href="#transplant-nav10" target="_self">
                        {info.head_success_ate}
                      </a>
                    </li>
                  )}
                  {info.head_analysis_and_comparision && (
                    <li>
                      <a href="#transplant-nav11" target="_self">
                        {info.head_analysis_and_comparision}
                      </a>
                    </li>
                  )}
                  {info.head_domestic && (
                    <li>
                      <a href="#transplant-nav12" target="_self">
                        {info.head_domestic}
                      </a>
                    </li>
                  )}
                  {info.head_pre_evalution && (
                    <li>
                      <a href="#transplant-nav21" target="_self">
                        {info.head_pre_evalution}
                      </a>
                    </li>
                  )}
                  {info.head_international && (
                    <li>
                      <a href="#transplant-nav13" target="_self">
                        {info.head_international}
                      </a>
                    </li>
                  )}
                  {info.head_how_treatment && (
                    <li>
                      <a href="#transplant-nav31" target="_self">
                        {info.head_how_treatment}
                      </a>
                    </li>
                  )}
                  {info.head_cost_influencing && (
                    <li>
                      <a href="#transplant-nav14" target="_self">
                        {info.head_cost_influencing}
                      </a>
                    </li>
                  )}
                  {info.head_cost_of_diagnostics && (
                    <li>
                      <a href="#transplant-nav44" target="_self">
                        {info.head_cost_of_diagnostics}
                      </a>
                    </li>
                  )}
                  {info.head_our_service && (
                    <li>
                      <a href="#transplant-nav15" target="_self">
                        {info.head_our_service}
                      </a>
                    </li>
                  )}
                  <li>
                    <a href="#transplant-nav16" target="_self">
                      Doctors
                    </a>
                  </li>
                  <li>
                    <a href="#transplant-nav17" target="_self">
                      Hospitals
                    </a>
                  </li>
                </ul>
              </div>

              <div className="treatment-midbox">
                <div className="treatmen-overview" id="transplant-nav1">
                  <h2>Overview</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info && info.long_description,
                    }}
                  />
                </div>
                {info.head_brief && (
                  <div className="treatmen-midnav" id="transplant-nav2">
                    <h2>{info.head_brief}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.brief,
                      }}
                    />

                    <div className="consultation-box">
                      <p>Plan with the best</p>
                      <Link
                        className="consultation-button"
                        href="/free-consultation"
                      >
                        Book a Free Consultation{" "}
                        <img src="/images/2023/01/learn-more.png" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* {info.head_needed && (
                <div className="treatmen-midnav" id="transplant-nav3">
                  <h2>{info.head_needed}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: info && info.brief,
                    }}
                  />
                </div>
              )} */}

                {/* fORM */}
                <NavForm1
                  treatmentId={info.id}
                  specialityId={info.speciality_id}
                />
                {info.head_types && (
                  <div
                    className="treatmen-midnav box-need"
                    id="transplant-nav4"
                  >
                    <h2>{info.head_types}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.treatment_types,
                      }}
                    />

                    <div className="consultation-box1">
                      <Link className="free-quote" href="/query">
                        Get a free quote{" "}
                        <img src="/images/2023/01/arrow-c.png" />
                      </Link>

                      <a className="view-hospitals" href="#transplant-nav17">
                        View Hospitals
                      </a>

                      <a className="view-doctors" href="#transplant-nav16">
                        View Doctors
                      </a>
                    </div>
                  </div>
                )}
                {info.head_pre_evalution && (
                  <div className="treatmen-midnav" id="transplant-nav21">
                    <h2>{info.head_pre_evalution}</h2>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.evalution,
                      }}
                    />
                    <div className="consultation-box">
                      <p>Plan your wellness journey with confidence</p>
                      <Link
                        className="consultation-button"
                        href="/free-consultation"
                      >
                        Book a Free Consultation{" "}
                        <img src="/images/2023/01/learn-more.png" />
                      </Link>
                    </div>
                  </div>
                )}
                {info.head_how_treatment && (
                  <div className="treatmen-midnav" id="transplant-nav31">
                    <h2>{info.head_how_treatment}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.how_treatment,
                      }}
                    />

                    <div className="consultation-box1">
                      <Link className="free-quote" href="/query">
                        Get a free quote{" "}
                        <img src="/images/2023/01/arrow-c.png" />
                      </Link>
                      <a className="view-hospitals" href="#transplant-nav16">
                        View Hospitals
                      </a>
                      <a className="view-doctors" href="#transplant-nav17">
                        View Doctors
                      </a>
                    </div>
                  </div>
                )}
                {info.head_complications && (
                  <div className="treatmen-midnav" id="transplant-nav7">
                    <h2>{info.head_complications}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.complications,
                      }}
                    />
                  </div>
                )}

                {/*  form 2 */}

                <NavForm2
                  treatmentId={info.id}
                  specialityId={info.speciality_id}
                />
                {/* end */}
                {info.head_post_procedure && (
                  <div className="treatmen-midnav" id="transplant-nav8">
                    <h2>{info.head_post_procedure}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.post_procedure,
                      }}
                    />

                    <div className="consultation-box">
                      <p>
                        The journey doesn&apos;t end here. We&apos;ll stay
                        connected throughout your recovery.
                      </p>
                      <Link
                        className="consultation-button"
                        href="/free-consultation"
                      >
                        Book a Free Consultation{" "}
                        <img src="/images/2023/01/learn-more.png" />
                      </Link>
                    </div>
                  </div>
                )}
                {info.head_life_after && (
                  <div className="treatmen-midnav" id="transplant-nav9">
                    <h2>{info.head_life_after}</h2>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.life_after,
                      }}
                    />
                  </div>
                )}
                {info.head_success_ate && (
                  <div className="treatmen-midnav" id="transplant-nav10">
                    <h2>{info.head_success_ate}</h2>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.success_ate,
                      }}
                    />

                    <div className="consultation-box1">
                      <Link className="free-quote" href="/query">
                        Get a free quote{" "}
                        <img src="/images/2023/01/arrow-c.png" />
                      </Link>
                      <a className="view-hospitals" href="#transplant-nav17">
                        View Hospitals
                      </a>
                      <a className="view-doctors" href="#transplant-nav16">
                        View Doctors
                      </a>
                    </div>
                  </div>
                )}
                {info.head_analysis_and_comparision && (
                  <div className="treatmen-midnav" id="transplant-nav11">
                    <h2>{info.head_analysis_and_comparision}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.analysis_and_comparision,
                      }}
                    />
                  </div>
                )}

                {info.head_cost_influencing && (
                  <div className="treatmen-midnav" id="transplant-nav14">
                    <h2>{info.head_cost_influencing}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.cost_influencing,
                      }}
                    />
                  </div>
                )}
                {info.head_cost_of_diagnostics && (
                  <div className="treatmen-midnav" id="transplant-nav44">
                    <h2>{info.head_cost_of_diagnostics}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.cost_of_diagnostics,
                      }}
                    />
                  </div>
                )}
                {info.head_our_service && (
                  <div className="treatmen-midnav" id="transplant-nav15">
                    <h2>{info.head_our_service}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: info && info.our_service,
                      }}
                    />
                  </div>
                )}

                <div className="treatmen-midnav" id="transplant-nav16">
                  <h2>Doctors</h2>
                  <p>
                    Fostering expertise backed by commitment, resilience and
                    years of experience, we connect you to a wide network of
                    India&pos;s best doctors
                  </p>

                  <NavDoctors doctor={doctor} />

                  <div className="treatment-view">
                    <Link
                      className="viewmore"
                      href={`/doctor-list/${speciality[0].slug}/${info.slug}`}
                    >
                      View more
                    </Link>
                  </div>
                </div>

                <div className="treatmen-midnav" id="transplant-nav17">
                  <h2>Hospitals</h2>
                  <p>
                    Explore the most advanced, reputable and trusted hospitals
                    in India, offering the highest levels of clinical and
                    surgical excellence
                  </p>

                  <NavHospitals hospital={hospital} />

                  <div className="treatment-view">
                    <Link
                      className="viewmore"
                      href={`/hospital-list/${speciality[0].slug}/${info.slug}`}
                    >
                      View more{" "}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="treatment-rightbox">
                <div className="free-consultation">
                  <img src="/images/2023/03/free-consultation.jpg" />
                  <h3>
                    Book a free Consultation with Highly Qualified Doctors
                  </h3>
                  <Link href="/contact-us">
                    {" "}
                    Contact us{" "}
                    <img src="/images/2023/01/arrow-c.png" alt="arrow" />
                  </Link>
                </div>

                <div className="navbox">
                  <img src="/images/2023/03/02/1.png" />
                  <Link
                    href={`/hospital-list/${speciality[0].slug}/${info.slug}`}
                  >
                    <h4>Hospitals</h4>
                  </Link>
                  <p>Medflick Assured Hospitals</p>
                </div>

                <div className="navbox">
                  <img src="/images/2023/03/02/2.png" />
                  <Link
                    href={`/doctor-list/${speciality[0].slug}/${info.slug}`}
                  >
                    <h4>Doctors</h4>
                  </Link>
                  <p>Medflick Assured Doctors </p>
                </div>

                <div className="navbox">
                  <img src="/images/2023/03/02/3.png" />
                  <Link href="/question-answer">
                    <h4> Q&A </h4>
                  </Link>
                  <p>Access MedFlick-verified information</p>
                </div>

                {info.symptoms && (
                  <div className="symptomsbox">
                    <h4>Symptoms</h4>
                    <ul>
                      {info.symptoms &&
                        info.symptoms.split(",").map((amenity, index) => (
                          <li key={index}>
                            <a>{amenity.trim()}</a>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Question and answer */}
        <Qa qa={qa} />

        {/* comuunity */}

        <Community />

        {/* Faq */}

        <TreatmentFaq faq={faq} />

        {/* end */}

        {/* Blog */}

        <TreatmentBlog blog={blog} />
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/treatment/${combinedSlug}`
  );
  const datas = await res.json();
  const info = datas.treateDetailsbyCountry.treateDetailsbyCountry;

  return {
    title: info.title,
    description: info.description,
    openGraph: {
      title: info.title,
      description: info.description,
      images: `https://dev.medflick.com/treatments/${info.image}`,
    },
    alternates: {
      canonical: `https://medflick.com/treatment/${combinedSlug}`,
    },
  };
}
