import getAllDoctors from "../lib/getALLDoctors";
import ShareProfile from "../Home/doctorForm/ShareProfile";
import Link from "next/link";
import DoctorForm from "../Home/doctorForm/DoctorForm";
import DoctorsSearch from "./[...slug]/DoctorsSearch";
import AllDoctorPagination from "./AllDoctorPagination";
import AllDoctorsFilteration from "./AllDoctorsFilteration";
import AppointmentForm from "../Home/doctorForm/AppointmentForm";

const AllDoctors = async () => {
  const data = await getAllDoctors();
  const doctor = data.data.doctors;
  const pageNumber = data.data.page;
  const count = data.data.count;

  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <DoctorsSearch doctors={doctor} />
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
              {doctor &&
                doctor.map((e) => {
                  // const matchedHospital = hospitalIcon?.find(
                  //   (hospital) => String(hospital.id) === String(e.hospital_id)
                  // );

                 
                  return (
                    <div className="doctor-item-list" key={e.id}>
                      <div className="doctor-item-img">
                        <Link href={`/doctor/${e.slug}`}>
                          <img
                            src={`https://dev.medflick.com/doctor/${e.image}`}
                            alt={e.slug}
                          />
                        </Link>
                      </div>
                      <div className="doctor-item-doc">
                        <Link href={`/doctor/${e.slug}`}>
                          <h3>
                            {e.prefix} {e.first_name} {e.last_name}
                          </h3>
                        </Link>
                        <div className="department-sub">
                          {" "}
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
                          specialityId={e.speciality_id}
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
                          {e.location.charAt(0).toUpperCase() +
                            e.location.slice(1)}
                           <img
                              src={`https://dev.medflick.com/hospital/${e.hospitalicon}`}
                              alt="icon"
                            />
                        
                        </div>
                      </div>
                    </div>
                  );
                })}
              <AllDoctorPagination pageNumber={pageNumber} count={count} />
            </div>
            {/* form */}

            <DoctorForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default AllDoctors;
