import getAllHospitals from "../lib/getAllHospitals";
import HospitalShare from "../Home/hospitalForm/HospitalShare";
import HospitalForm from "../Home/hospitalForm/HospitalForm";
import Link from "next/link";
import { AiTwotoneStar } from "react-icons/ai";
import HospitalListPopUpForm from "../Home/hospitalForm/HospitalListPopUpForm";

const AllHospitals = async () => {
  const data = await getAllHospitals();
  const hospital = data.data.hospital;

  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <div className="find-doctor-box">
            <h2>Find Hospitals</h2>

            <div className="find-box">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search Hospital"
                  name="name"
                  //   value={searchQuery}
                  //   onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* {filteredHospital.length > 0 ? (
                    <ul className="search-box">
                      {searchQuery &&
                        filteredHospital.map((doctor) => (
                          <Link
                            href={`/hospital/${doctor.slug}/${doctor.country}`}
                            key={doctor.id}
                          >
                            <li>
                              <h6
                                style={{ color: "black" }}
                              >{`${doctor.name}`}</h6>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  ) : (
                    showNotFoundMessage && (
                      <>
                        <h6> OOPS! No doctors found </h6>
                      </>
                    )
                  )} */}
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
      <section id="find-hospital-list">
        <div className="midbox-inner  wiki-mk">
          <h1>
            Medflick Assured Hospitals In India{" "}
            <span>({hospital.length} Results)</span>
          </h1>
          {/* <div className="hospital-list-find">
              <div className="ding">
                <select
                  id="wiki-select"
                  onChange={handleSpecialtyChange}
                  value={selectedSpecialtyId}
                >
                  {speciality &&
                    speciality.map((e) => (
                      <option value={e.slug} key={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="ding">
                <select
                  id="wiki-select"
                  onChange={handleSelectCity}
                  value={selectedCity}
                >
                  <option>Location</option>
                  {hospital &&
                    hospital.map((e) => (
                      <option value={e.location} key={e.id}>
                        {e.location.charAt(0).toUpperCase() +
                          e.location.slice(1)}
                      </option>
                    ))}
                </select>
              </div>
           
              <div className="ding">
                <select
                  id="wiki-select"
                  onChange={handleTreatmentChange}
                  value={selectedTreatment}
                >
                  <option>Treatments</option>
                  {treatments &&
                    treatments.map((e) => (
                      <option value={e.slug} key={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
          

              <div className="ding">
                <Select
                  id="wiki"
              
                  isSearchable={true} 
                  placeholder="Rating"
                  maxMenuHeight={150}
                />
              </div>

              <div className="refresh-box-hospital">
                <span onClick={handleClearSelection}>
                  <img
                    src={loadingImg}
                    alt="changes"
                    style={{ height: "auto", width: "100%" }}
                  />
                </span>
              </div>
            </div> */}

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
                            <Link
                              href={`/hospital/${hospital.slug}/${hospital.country}`}
                            >
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
                      <Link
                        href={`/hospital/${hospital.slug}/${hospital.country}`}
                      >
                        <h3>{hospital.name}</h3>
                      </Link>
                      {/* <div className="department-sub">
                          Oncologist, Medical Oncologist
                        </div> */}
                      <div className="rating-star">
                        5{" "}
                        <i>
                          <AiTwotoneStar />
                        </i>{" "}
                        (523)
                      </div>

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
                        hospital.short_description.length > 200
                          ? `${hospital.short_description.slice(0, 200)}...`
                          : hospital.short_description}
                      </div>
                    </div>
                    <div className="hospital-item-button">
                      <HospitalListPopUpForm
                        name={hospital.name}
                        hospitalId={hospital.id}
                      />

                      <Link
                        href={`/hospital/${hospital.slug}/${hospital.country}`}
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
                        {hospital.address}
                        <img src="/images/2023/05/loc.png" alt="icon" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <HospitalForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default AllHospitals;
