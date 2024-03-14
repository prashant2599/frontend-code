import HelpYou from "@/app/Home/helpyou/HelpYou";
import DontPay from "@/app/Home/dontPay/DontPay";
import Community from "@/app/Home/community/Community";
import Doctors from "./Doctors";
import Hospitralspe from "./Hospitralspe";
import CostEstimateForm from "./CostEstimateForm";
import SpecialityBlog from "./SpecialityBlog";
import SpecialityFilteration from "./SpecialityFilteration";
import TreatmentList from "./TreatmentList";
import { notFound } from "next/navigation";
import NewQuestionAns from "@/app/Home/NewUIHomepage/NewQuestionAns";
import NewTestomonials from "@/app/Home/NewUIHomepage/NewTestomonials";
import "../../Home/NewUIHomepage/newsection.css";
import NewVideoSection from "@/app/Home/NewUIHomepage/NewVideoSection";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import Marquee from "@/app/Home/marquee/Marquee";

const page = async ({ params }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/speciality/${combinedSlug}`,
      { cache: "no-store" }
    );

    const datas = await res.json();
    const speciality = datas.data.treatment_list;
    const info = datas.data.speciality_info;
    const doctor = datas.data.doctor;
    const hospital = datas.data.hospitals;
    const blog = datas.data.blogs;

    // country slugs

    const parts = combinedSlug.split("/");
    const countrySlug = parts[1];

    return (
      <>
        <NewHeader />
        <section id="category-slider">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/speciality/${info?.image}`}
            alt={info.slug}
            loading="lazy"
          ></img>
          {/* <img
            src={`https://dev.medflick.com/speciality/${
              info && info.home_image
            }`}
            className="category-m"
            alt="Category"
          ></img> */}
          <div className="category-slidertext">
            <h1>{info && info.name}</h1>
            <div
              className="doctors-bio"
              dangerouslySetInnerHTML={{
                __html: info && info.short_description,
              }}
            />
          </div>
        </section>

        <section
          className="treatment-marquee"
          id="category-marquee"
          style={{ marginTop: "20px" }}
        >
          <Marquee />
        </section>

        <section id="category-mid">
          <div className="midbox-inner  wiki-mk">
            {countrySlug === undefined ? (
              <h2 style={{ marginBottom: "3rem" }}>{info && info.name}</h2>
            ) : (
              <h2 style={{ marginBottom: "3rem" }}>
                {info && info.name} in{" "}
                <span style={{ color: "#ff6800" }}>
                  {countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)}
                </span>
              </h2>
            )}
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo
              orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo
              orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo
              orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
              nostrud exercitation
            </p> */}

            {/* cost form */}
            <CostEstimateForm specialityId={info.id} />
          </div>
        </section>

        <section id="treatments-section">
          <div className="midbox-inner wiki-mk">
            {/* <h2>
            {info && info.name} treatments in {info && info.country}
          </h2> */}

            <div
              dangerouslySetInnerHTML={{
                __html: info.long_description ? info.long_description : "",
              }}
            />
            <SpecialityFilteration
              countryResponse={info.country}
              slug={info.slug}
              slugs={combinedSlug}
            />
            {/* Treatment List */}
            <TreatmentList speciality={speciality} slugs={combinedSlug} />
          </div>
        </section>
        {/* doctor experts videos */}

        {/* <DoctorExpert /> */}
        <NewVideoSection />

        {/* end */}

        {/* Help you section */}
        <HelpYou />

        {/* end */}

        {/* dont pay */}

        <DontPay />

        {/* end */}

        {/* doctors */}

        <Doctors
          doctor={doctor}
          category={info.slug}
          categoryName={info.name}
          slugs={combinedSlug}
        />
        {/* end */}

        {/* Hospitals */}
        <Hospitralspe
          hospital={hospital}
          category={info.slug}
          categoryName={info.name}
          slugs={combinedSlug}
        />

        {/* end */}

        {/* query */}

        <NewQuestionAns />
        {/* <HealthQuerys /> */}

        <NewTestomonials />
        {/* <Testimonials /> */}

        {/* community */}
        <Community />

        <SpecialityBlog blog={blog} category={info.slug} />
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
    `https://dev.medflick.com/api/speciality/${combinedSlug}`
  );
  const datas = await res.json();
  const info = datas.data.speciality_info;

  return {
    title: info.title,
    description: info.description,
    openGraph: {
      title: info.title,
      description: info.description,
      images: `https://dev.medflick.com/speciality/${info && info.image}`,
    },
    alternates: {
      canonical: `https://medflick.com/speciality/${combinedSlug}`,
    },
  };
}
