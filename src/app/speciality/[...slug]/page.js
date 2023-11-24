import DoctorExpert from "@/app/Home/DoctorExpert";
import HelpYou from "@/app/Home/helpyou/HelpYou";
import DontPay from "@/app/Home/dontPay/DontPay";
import HealthQuerys from "@/app/Home/HealthQuerys";
import Community from "@/app/Home/community/Community";
import Testimonials from "@/app/Home/Testimonials";
import Doctors from "./Doctors";
import Hospitralspe from "./Hospitralspe";
import Image from "next/image";
import CostEstimateForm from "./CostEstimateForm";
import SpecialityBlog from "./SpecialityBlog";
import SpecialityFilteration from "./SpecialityFilteration";
import TreatmentList from "./TreatmentList";
import { notFound } from "next/navigation";

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

    // const countryData = info.country;
    // const countries = countryData.split(",");

    return (
      <>
        <section id="category-slider">
          <Image
            src={`https://dev.medflick.com/speciality/${info && info.image}`}
            alt={info.name}
            width="1372"
            height="672"
          />
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

        <section id="category-marquee">
          <div className="marquee-wrapper">
            <div
              className="marquee"
              style={{
                animationDuration: "21s",
              }}
            >
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

        <section id="category-mid">
          <div className="midbox-inner  wiki-mk">
            <h2 style={{ marginBottom: "5rem" }}>{info && info.name}</h2>
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
            <SpecialityFilteration
              countryResponse={info.country}
              slug={info.slug}
              slugs={combinedSlug}
            />
            {/* <h2>
            {info && info.name} treatments in {info && info.country}
          </h2> */}

            {/* <div
            dangerouslySetInnerHTML={{
              __html: info && info.long_description,
            }}
          /> */}

            {/* Treatment List */}
            <TreatmentList speciality={speciality} slugs={combinedSlug} />
          </div>
        </section>
        {/* doctor experts videos */}

        <DoctorExpert />

        {/* end */}

        {/* Help you section */}
        <HelpYou />

        {/* end */}

        {/* dont pay */}

        <DontPay />

        {/* end */}

        {/* doctors */}

        <Doctors doctor={doctor} />
        {/* end */}

        {/* Hospitals */}
        <Hospitralspe hospital={hospital} />

        {/* end */}

        {/* query */}

        {/* <HealthQuerys /> */}

        {/* <Testimonials /> */}

        {/* community */}
        <Community />

        <SpecialityBlog blog={blog} />
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
