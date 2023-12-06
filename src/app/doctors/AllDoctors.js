import getAllDoctors from "../lib/getALLDoctors";
import ShareProfile from "../Home/doctorForm/ShareProfile";
import Link from "next/link";
import { AiTwotoneStar } from "react-icons/ai";
import DoctorForm from "../Home/doctorForm/DoctorForm";

const AllDoctors = async () => {
  const data = await getAllDoctors();
  const doctor = data.data.doctors;
  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <div className="find-doctor-box">
            <h2>Find Doctors</h2>

            <div className="find-box">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search Doctor"
                  name="name"
                  required=""
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="location-box">
                <input
                  type="text"
                  placeholder="Any Location"
                  name="name"
                  required=""
                />
              </div>
              <button type="submit" name="en" className="find-doctor">
                Find Doctor
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="find-doctors-list">
        <div className="midbox-inner  wiki-mk">
          <h1>
            Medflick Assured Doctors <span>({doctor.length} Results)</span>
          </h1>
          {/* filters nav section */}
          {/* <SpecialitySelect
            doctor={doctor}
            treatment={treatment}
            slug={combinedSlug}
          /> */}
          <div className="doctor-midbox">
            <div className="doctor-midbox-left">
              {doctor &&
                doctor.map((e) => {
                  //   const matchedHospital = hospitalIcon?.find(
                  //     (hospital) => String(hospital.id) === e.hospital_id
                  //   );
                  return (
                    <div className="doctor-item-list" key={e.id}>
                      <div className="doctor-item-img">
                        <img
                          src={`https://dev.medflick.com/doctor/${e.image}`}
                          alt={e.slug}
                        />
                      </div>
                      <div className="doctor-item-doc">
                        <h3>
                          {e.prefix} {e.first_name} {e.last_name}
                        </h3>
                        <div className="department-sub">{e.designation}</div>
                        {/* <div className="rating-star">
                          5{" "}
                          <i>
                            <AiTwotoneStar />
                          </i>{" "}
                          (523){" "}
                        </div> */}
                        <div className="department-sub-shotdesc">
                          {e.short_description}
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
                        <Link href="/query" className="book-app">
                          Book Appointment{" "}
                          <img src="/images/2023/05/book.png" alt="icon" />
                        </Link>

                        {e.slug ? ( // Check if e.slug has a value
                          <Link
                            href={`/doctor/${e.slug}`}
                            className="view-profile"
                          >
                            View Profile{" "}
                            <img src="/images/2023/05/profile.png" alt="icon" />
                          </Link>
                        ) : (
                          <span>No profile available</span>
                        )}
                        {/* share profile */}

                        <ShareProfile slug={e.slug} />

                        <div className="doc-Hospital">
                          {e.location}
                          {/* {matchedHospital && (
                        <img
                          src={`${process.env.BASE_URL}/hospital/${matchedHospital.icon}`}
                          alt="icon"
                        />
                      )} */}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
