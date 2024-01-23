import HospitalSearch from "../../[...slug]/HospitalSearch";
import Link from "next/link";
import AllHospitalPagination from "../../AllHospitalPagination";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import AllHospitalsFilteration from "../../AllHospitalsFilteration";
import AppointmentForm from "@/app/Home/hospitalForm/AppointmentForm";
import HospitalShare from "@/app/Home/hospitalForm/HospitalShare";

const page = async ({ params }) => {
  const combinedSlug = params.slug;
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospitals/page/${combinedSlug}`,
    { cache: "no-store" }
  );
  const apiData = await apiResponse.json();
  const hospital = apiData.data.hospital;
  const pageNumber = apiData.data.page;
  const count = apiData.data.count;
  return (
    <>
      <NewHeader />
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <HospitalSearch  />
        </div>
      </section>
      <section id="find-hospital-list">
        <div className="midbox-inner  wiki-mk">
          <h1>
            Medflick Assured Hospitals <span>({count} Results)</span>
          </h1>
          <AllHospitalsFilteration />
          <div className="hospital-midbox">
            <div className="hospital-midbox-left">
              {hospital.map((hospital) => {
                // Filter gallery items that match the current hospital's id
                // const galleryImages = images.filter(
                //   (gallery) => gallery.hospital_id === String(hospital.id)
                // );

                return (
                  <div className="hospital-item-list" key={hospital.id}>
                    <div className="hospital-item-img">
                      <div className="tabs_wrapper">
                        <div className="tabs_container">
                          <div data-hash="one" key={hospital.id}>
                            <Link href={`/hospital/${hospital.slug}`}>
                              <img
                                src={`https://dev.medflick.com/hospital/${hospital.image}`}
                                alt={hospital.name}
                                width="100%"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hospital-item-doc">
                      <Link href={`/hospital/${hospital.slug}`}>
                        <h3>{hospital.name}</h3>
                      </Link>
                      {/* <div className="department-sub">
                        Oncologist, Medical Oncologist
                      </div> */}
                      {/* <div className="rating-star">
                        5{" "}
                        <i>
                          <AiTwotoneStar />
                        </i>{" "}
                        (523)
                      </div> */}

                      <div className="ho-docimg">
                        {hospital.nabl && (
                          <img
                            src={`https://dev.medflick.com/hospital/${hospital.nabl}`}
                            alt={hospital.name}
                          />
                        )}
                        {hospital.nabh && (
                          <img
                            src={`https://dev.medflick.com/hospital/${hospital.nabh}`}
                            alt={hospital.name}
                          />
                        )}
                        {hospital.jci && (
                          <img
                            src={`https://dev.medflick.com/hospital/${hospital.jci}`}
                            alt={hospital.name}
                          />
                        )}
                      </div>

                      {hospital.doc !== null && (
                        <div className="hos-no">
                          <strong>Doctors:</strong> {hospital.doc}
                        </div>
                      )}
                      {hospital.bed !== null && (
                        <div className="hos-no">
                          <strong>Beds:</strong> {hospital.bed}
                        </div>
                      )}
                      {hospital.ambulance !== null && (
                        <div className="hos-no">
                          <strong>Ambulances:</strong> {hospital.ambulance}
                        </div>
                      )}
                      <div className="department-sub-shotdesc">
                        {hospital.short_description &&
                        hospital.short_description.length > 100
                          ? `${hospital.short_description.slice(0, 100)}...`
                          : hospital.short_description}
                      </div>
                    </div>
                    <div className="doctor-item-button">
                      <AppointmentForm
                        name={hospital.name}
                        hospitalId={hospital.id}
                        specialityId={hospital.speciality_id}
                      />

                      <Link
                        href={`/hospital/${hospital.slug}`}
                        className="view-profile"
                      >
                        View Profile{" "}
                        <img src="/images/2023/05/profile.png" alt="icon" />
                      </Link>
                      {/* share  */}
                      <HospitalShare
                        slug={hospital.slug}
                        country={hospital.country}
                      />

                      <div className="hospital-location-box">
                        {hospital.city.charAt(0).toUpperCase() +
                          hospital.city.slice(1)}
                        <img src="/images/2023/05/loc.png" alt="icon" />
                      </div>
                    </div>
                  </div>
                );
              })}
              <AllHospitalPagination pageNumber={pageNumber} count={count} />
            </div>

            {/* Form */}
            {/* <HospitalForm /> */}
          </div>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export default page;
