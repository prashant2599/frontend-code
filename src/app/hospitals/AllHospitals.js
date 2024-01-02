import getAllHospitals from "../lib/getAllHospitals";
import HospitalShare from "../Home/hospitalForm/HospitalShare";
import HospitalForm from "../Home/hospitalForm/HospitalForm";
import Link from "next/link";
import { AiTwotoneStar } from "react-icons/ai";
import HospitalListPopUpForm from "../Home/hospitalForm/HospitalListPopUpForm";
import HospitalSearch from "./[...slug]/HospitalSearch";
import AllHospitalPagination from "./AllHospitalPagination";
import AllHospitalsFilteration from "./AllHospitalsFilteration";

const AllHospitals = async () => {
  const data = await getAllHospitals();
  const hospital = data.data.hospital;
  const pageNumber = data.data.page;
  const count = data.data.count;

  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <HospitalSearch hospital={hospital} />
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
                      <HospitalListPopUpForm
                        name={hospital.name}
                        hospitalId={hospital.id}
                        specialityId={hospital.speciality_id}
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
            <HospitalForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default AllHospitals;
