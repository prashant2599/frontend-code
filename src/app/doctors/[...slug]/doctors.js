import { AiTwotoneStar } from "react-icons/ai";
import Link from "next/link";
import SpecialitySelect from "@/app/doctorFilter/SpecialitySelect";
import DoctorForm from "@/app/Home/doctorForm/DoctorForm";
import ShareProfile from "@/app/Home/doctorForm/ShareProfile";
import Image from "next/image";

const doctors = ({ treatment, doctor, hospitalIcon }) => {
  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <div className="find-doctor-box">
            <h1>Find Doctors</h1>

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
          <h2>
            Medflick Assured Doctors <span>({doctor.length} Results)</span>
          </h2>
          {/* filters nav section */}
          <SpecialitySelect
            doctor={doctor}
            treatment={treatment}
            slug={combinedSlug}
          />

          <div className="doctor-midbox">
            <div className="doctor-midbox-left">
              {doctor &&
                doctor.map((e) => {
                  const matchedHospital = hospitalIcon?.find(
                    (hospital) => String(hospital.id) === e.hospital_id
                  );
                  return (
                    <div className="doctor-item-list" key={e.id}>
                      <div className="doctor-item-img">
                        <Image
                          src={`${process.env.BASE_URL}/doctor/${e.image}`}
                          alt={e.slug}
                          width="181"
                          height="221"
                        />
                      </div>
                      <div className="doctor-item-doc">
                        <h3>
                          {e.prefix} {e.first_name} {e.last_name}
                        </h3>
                        <div className="department-sub">{e.designation}</div>
                        <div className="rating-star">
                          5{" "}
                          <i>
                            <AiTwotoneStar />
                          </i>{" "}
                          (523){" "}
                        </div>

                        <div className="doc-experience">
                          <div className="years-exper">
                            {e.experience_year}+ Years of Experience{" "}
                          </div>
                          <div className="successful-plus">
                            {e.surgery_treatment}+ Successful Surgeries{" "}
                          </div>
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
                          {matchedHospital && (
                            <img
                              src={`${process.env.BASE_URL}/hospital/${matchedHospital.icon}`}
                              alt="icon"
                            />
                          )}
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

export default doctors;
