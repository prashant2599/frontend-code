"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppointmentForm from "@/app/Home/doctorForm/AppointmentForm";

const HospitalDoctorsFilter = ({ doctor }) => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDep, setSelecteddep] = useState("");
  const [selectedeExp, setSelectedExp] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    setFilteredDoctors(
      doctor.filter((doctor) => {
        const locationCondition =
          !selectedLocation || doctor.gender === selectedLocation.value;
        const departmentCondition =
          !selectedDep || doctor.dept === selectedDep.value;

        // Check if the selected experience falls into the appropriate range
        let experienceCondition = true;
        if (selectedeExp) {
          const numExp = parseInt(selectedeExp.value);
          if (numExp >= 1 && numExp <= 10) {
            experienceCondition =
              doctor.experience_year >= 1 && doctor.experience_year <= 10;
          } else if (numExp >= 20 && numExp <= 30) {
            experienceCondition =
              doctor.experience_year >= 20 && doctor.experience_year <= 30;
          } else {
            experienceCondition = doctor.experience_year >= 30;
          }
        }

        return locationCondition && departmentCondition && experienceCondition;
      })
    );
  }, [selectedLocation, selectedDep, selectedeExp, doctor]);

  const cityOptions = Array.from(
    new Set(doctor.map((doctor) => doctor.gender))
  ).map((city) => ({ value: city, label: city }));

  const depOptions = Array.from(
    new Set(doctor.map((doctor) => doctor.dept))
  ).map((city) => ({ value: city, label: city }));

  //  experience options

  const doctorExperienceSet = new Set(
    doctor.map((doctor) => doctor.experience_year)
  );

  const labelOrder = {
    "1-10 years experience": 1,
    "20-30 years experience": 2,
    "30+ years experience": 3,
  };

  const ExpOptions = Object.keys(labelOrder).reduce((options, label) => {
    const matchingExpValues = Array.from(doctorExperienceSet)
      .map((exp) => parseInt(exp))
      .filter((exp) => label === getLabel(exp));

    matchingExpValues.forEach((expValue) => {
      // Check if the option with the same label already exists in options
      const existingOption = options.find((option) => option.label === label);

      // Add the option only if it doesn't exist in options
      if (!existingOption) {
        options.push({ value: expValue.toString(), label: label });
      }
    });

    return options;
  }, []);

  function getLabel(numExp) {
    if (numExp >= 1 && numExp <= 10) {
      return "1-10 years experience";
    } else if (numExp >= 20 && numExp <= 30) {
      return "20-30 years experience";
    } else {
      return "30+ years experience";
    }
  }

  const handleSelectDep = (selectedOption) => {
    setSelecteddep(selectedOption);
  };

  const handleSelectExp = (selectedOption) => {
    setSelectedExp(selectedOption);
  };

  const handleSelectCity = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleClearSelection = () => {
    setSelectedLocation(null);
    setSelecteddep(null);
    setSelectedExp(null);
  };

  // Filter the 'doctors' based on the 'searchQuery'
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDoctors, setSearchDoctors] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowNotFoundMessage(true);
    }, 2000);
  }, []);

  useEffect(() => {
    // Filter the 'doctors' based on the 'searchQuery'
    const filtered = doctor.filter((doctor) => {
      const fullName = `${doctor.first_name} ${doctor.last_name}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchDoctors(filtered);
  }, [doctor, searchQuery]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [doctorsToShow, setDoctorsToShow] = useState(15); // Initial number of doctors to show

  const showMoreDoctors = () => {
    setDoctorsToShow(doctorsToShow + 10); // Increase the number of doctors to show by 10
  };

  return (
    <>
      <div id="doctor" className="profile-data-section">
        <h2>
          Search Doctor <span>({filteredDoctors.length} Doctors)</span>
        </h2>

        <div className="hospital-list-find">
          <div className="hospital-Searchbox">
            <input
              type="text"
              placeholder="Search"
              name="name"
              required=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            {searchQuery.length >= 2 && (
              <div className="searchbox-medf" style={{ textAlign: "start" }}>
                {searchDoctors.length > 0 ? (
                  searchDoctors.map((doctor) => (
                    <Link
                      key={doctor.id}
                      href={`/doctor/${doctor.slug}`}
                      onClick={() => {
                        setSearchQuery("");
                        if (typeof togglePopup === "function") {
                          togglePopup();
                        }
                        router.push(`/doctor/${doctor.slug}`); // Navigate to the link
                      }}
                    >
                      <div className="searchbox-main" key={doctor.id}>
                        {`${doctor.prefix} ${doctor.first_name} ${doctor.last_name}`
                          .split(new RegExp(`(${searchQuery})`, "gi"))
                          .map((part, index) =>
                            part.toLowerCase() === searchQuery.toLowerCase() ? (
                              <span key={index} style={{ color: "#ff6800" }}>
                                {part}
                              </span>
                            ) : (
                              <span key={index}>{part}</span>
                            )
                          )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "5px" }}>
                    No doctors found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="ding">
            <Select
              id="wiki-location"
              value={selectedLocation}
              onChange={handleSelectCity}
              options={cityOptions}
              isSearchable={true}
              placeholder="Gender"
              maxMenuHeight={150}
            />
          </div>
          <div className="ding">
            <Select
              id="wiki-Department"
              value={selectedDep}
              onChange={handleSelectDep}
              options={depOptions}
              isSearchable={true}
              placeholder="Department"
              maxMenuHeight={150}
            />
          </div>
          <div className="ding">
            <Select
              id="wiki-Experience"
              value={selectedeExp}
              onChange={handleSelectExp}
              options={ExpOptions}
              isSearchable={true}
              placeholder="Experience"
              maxMenuHeight={150}
            />
          </div>
          {/* <div className="ding">
            <Select
              id="wiki-Rating"
              value={selectedOption}
              onChange={handleSelectChange}
              // options={options}
              isSearchable={true} // Enables search
              placeholder="Rating"
              maxMenuHeight={150}
            />
          </div> */}

          <div className="refresh-box">
            <span onClick={handleClearSelection}>
              <img src="/images/2023/05/loading.png" alt="loading-Icon" />
            </span>
          </div>
        </div>
        {filteredDoctors.length === 0 ? (
          <div>
            <p style={{ textAlign: "center", margin: "18px", color: "#000" }}>
              No Doctor Found
            </p>
          </div>
        ) : (
          filteredDoctors.slice(0, doctorsToShow).map((e) => (
            <div className="exparts-item-h" key={e.id}>
              <div className="doctor-item-img">
                <Image
                  src={`https://dev.medflick.com/doctor/${e.image}`}
                  alt={e.slug}
                  width="129"
                  height="157"
                  className="doctor-speciality-img"
                />
              </div>
              <div className="doctor-item-doc">
                <h3>
                  {e.prefix} {e.first_name} {e.last_name}
                </h3>
                <div className="department-sub">{e.designation}</div>
              </div>
              <div className="doc-experience">
                {e.experience_year && (
                  <div className="years-exper">
                    {e.experience_year}+ Years of Experience{" "}
                  </div>
                )}
                {e.surgery_treatment && (
                  <div className="successful-plus">
                    {e.surgery_treatment}+ Successful Surgeries{" "}
                  </div>
                )}
              </div>
              <div className="day-itembox">
                <div
                  dangerouslySetInnerHTML={{
                    __html: e.opd_time,
                  }}
                />
              </div>

              <div className="doctor-item-button">
                <AppointmentForm
                  slug={e.slug}
                  first={e.prefix}
                  middle={e.first_name}
                  last={e.last_name}
                  specialityId={e.speciality_id}
                />
                <Link href={`/doctor/${e.slug}`} className="view-profile">
                  View Profile{" "}
                  <img src="/images/2023/05/profile.png" alt="icons" />
                </Link>
              </div>
            </div>
          ))
        )}

        {doctorsToShow < filteredDoctors.length && (
          <span
            className="more-doctors"
            onClick={showMoreDoctors}
            style={{ cursor: "pointer" }}
          >
            View More Doctors{" "}
            <img src="/images/2023/05/more-d.png" alt="More Doctors" />
          </span>
        )}
      </div>
    </>
  );
};

export default HospitalDoctorsFilter;
