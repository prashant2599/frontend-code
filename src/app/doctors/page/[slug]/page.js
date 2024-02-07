import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import DoctorsSearch from "../../[...slug]/DoctorsSearch";
import Link from "next/link";
import ShareProfile from "@/app/Home/doctorForm/ShareProfile";
import DoctorForm from "@/app/Home/doctorForm/DoctorForm";
import AllDoctorsFilteration from "../../AllDoctorsFilteration";
import AllDoctorPagination from "../../AllDoctorPagination";
import AppointmentForm from "@/app/Home/doctorForm/AppointmentForm";
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
  const combinedSlug = params.slug;
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/page/${combinedSlug}`,
    { cache: "no-store" }
  );
  const apiData = await apiResponse.json();
  const doctors = apiData.data.doctors;
  const pageNumber = apiData.data.page;
  const count = apiData.data.count;
  const pageCount = data.data.countpagination

  return (
    <>
      <NewHeader />
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <DoctorsSearch />
        </div>
      </section>
      <section id="find-doctors-list">
        <div className="midbox-inner  wiki-mk">
          <h1>
            Medflick Assured Doctors <span>({count} Results)</span>
          </h1>
          {/* filters nav section */}

          <AllDoctorsFilteration />
          <div className="doctor-midbox">
            <div className="doctor-midbox-left">
              {doctors.length > 0 ? (
                doctors.map((e) => {
                  return (
                    <div className="doctor-item-list" key={e.id}>
                      <div className="doctor-item-img">
                        <Link href={`/doctor/${e.slug}`}>
                          <img
                            src={`https://dev.medflick.com/doctor/${e.image}`}
                            alt={e.slug}
                            className="doctor-speciality-img"
                          />
                        </Link>
                      </div>
                      <div className="doctor-item-doc">
                        <Link href={`/doctor/${e.slug}`}>
                          <h3>
                            {e.prefix} {e.first_name} {e.last_name}
                          </h3>
                        </Link>
                        <div
                          className="department-sub"
                          style={{ color: "#ff6800" }}
                        >
                          {e.designation.length > 55
                            ? `${e.designation.slice(0, 55)}...`
                            : e.designation}
                        </div>
                        {/* <div className="rating-star">
                          5{" "}
                          <i>
                            <AiTwotoneStar />
                          </i>{" "}
                          (523){" "}
                        </div> */}
                        <div className="department-sub-shotdesc">
                          {e.short_description &&
                          e.short_description.length > 100
                            ? `${e.short_description.slice(0, 100)}...`
                            : e.short_description}
                        </div>

                        <div className="doc-experience">
                          <div className="years-exper">
                            {e.experience_year}+ Years of Experience{" "}
                          </div>
                          {e.surgery_treatment !== null && (
                            <div className="successful-plus">
                              {e.surgery_treatment}+ Successful Surgeries
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="doctor-item-button">
                        <AppointmentForm
                          first={e.prefix}
                          middle={e.first_name}
                          last={e.last_name}
                          doctorId={e.id}
                        />
                        <Link
                          href={`/doctor/${e.slug}`}
                          className="view-profile"
                        >
                          View Profile{" "}
                          <img src="/images/2023/05/profile.png" alt="icon" />
                        </Link>

                        {/* share profile */}

                        <ShareProfile slug={e.slug} />

                        <div className="doc-Hospital">
                          {formatText(e.location)}
                          <img
                            src={`https://dev.medflick.com/hospital/${e.hospitalicon}`}
                            alt="icon"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <p style={{ textAlign: "center", fontSize: "18px" }}>
                    No Doctor Found
                  </p>
                </div>
              )}
              {/* <DoctorPagePagination pageNumber={pageNumber} count={count} /> */}
              <AllDoctorPagination pageNumber={pageNumber} count={count} pageCount={pageCount}  />
            </div>
            {/* form */}
            <DoctorForm />
          </div>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata({ params }) {
  const combinedSlug = params.slug;
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/page/${combinedSlug}`,
    { cache: "no-store" }
  );
  const apiData = await apiResponse.json();
  const doctors = apiData.data.doctors;
  const pageNumber = apiData.data.page;
  const count = apiData.data.count;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return {
    title:
      "Find The Top Doctors List In India, Updated 2023 | Treatments Specialist " +
      currentYear +
      " | page " +
      pageNumber,
    description:
      "On Medflick, get the top doctors in India, updated in 2023 & make an appointment online instantly! View consultation cost & address of specialist in India." +
      " | page " +
      pageNumber,
    openGraph: {
      title:
        "Find The Top Doctors List In India, Updated 2023 | Treatments Specialist " +
        currentYear +
        " | page " +
        pageNumber,
      description:
        "On Medflick, get the top doctors in India, updated in 2023 & make an appointment online instantly! View consultation cost & address of specialist in India." +
        " | page " +
        pageNumber,
      images: "https://medflick.com/images/2023/02/logo.png",
    },
    alternates: {
      canonical: `https://medflick.com/doctors`,
    },
  };
}
