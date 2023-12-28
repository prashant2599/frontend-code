"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import Image from "next/image";
import { AiTwotoneStar } from "react-icons/ai";
import DoctorHospitalProfile from "@/app/Home/doctorForm/DoctorHospitalProfile";

const HospitalDoctorsFilter = ({ doctor }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDep, setSelecteddep] = useState("");
  const [selectedeExp, setSelectedExp] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    // Filter the doctor list based on the selected location and city
    setFilteredDoctors(
      doctor.filter(
        (doctor) =>
          (!selectedLocation || doctor.gender === selectedLocation.value) &&
          (!selectedDep || doctor.dept === selectedDep.value) &&
          (!selectedeExp || doctor.experience_year === selectedeExp.value)
      )
    );
  }, [selectedLocation, selectedDep, selectedeExp, doctor]);

  const cityOptions = Array.from(
    new Set(filteredDoctors.map((doctor) => doctor.gender))
  ).map((city) => ({ value: city, label: city }));

  const depOptions = Array.from(
    new Set(filteredDoctors.map((doctor) => doctor.dept))
  ).map((city) => ({ value: city, label: city }));

  const ExpOptions = Array.from(
    new Set(filteredDoctors.map((doctor) => doctor.experience_year))
  )
    .map((exp) => ({ value: exp, label: `${exp} years experience` }))
    .sort((a, b) => {
      // Convert the values to numbers before comparison
      const numA = parseInt(a.value);
      const numB = parseInt(b.value);

      // Use numerical comparison
      return numA - numB;
    });

  // Function to handle city selection
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
            {searchDoctors.length > 0 ? (
              <ul
                className="search-results"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  padding: "0",
                  listStyle: "none",
                  marginTop: "5px",
                  marginLeft: "0px",
                  borderRadius: "4px",
                  position: "absolute",
                  background: "#f1f1f1",
                  width: "270px",
                  zIndex: "1",
                }}
              >
                {searchQuery &&
                  searchDoctors.map((doctor) => (
                    <Link href={`/doctor/${doctor.slug}`} key={doctor.id}>
                      <li>
                        <h6
                          style={{ color: "black", padding: "5px" }}
                        >{`${doctor.prefix} ${doctor.first_name} ${doctor.last_name}`}</h6>
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
            )}
          </div>

          <div className="ding">
            <Select
              id="wiki"
              value={selectedLocation}
              onChange={handleSelectCity}
              options={cityOptions}
              isSearchable={true} // Enables search
              placeholder="Gender"
              maxMenuHeight={150}
            />
          </div>
          <div className="ding">
            <Select
              id="wiki"
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
              id="wiki"
              value={selectedeExp}
              onChange={handleSelectExp}
              options={ExpOptions}
              isSearchable={true}
              placeholder="Experience"
              maxMenuHeight={150}
            />
          </div>
          <div className="ding">
            <Select
              id="wiki"
              value={selectedOption}
              onChange={handleSelectChange}
              // options={options}
              isSearchable={true} // Enables search
              placeholder="Rating"
              maxMenuHeight={150}
            />
          </div>

          <div className="refresh-box">
            <span onClick={handleClearSelection}>
              <img src="/images/2023/05/loading.png" alt="loading-Icon" />
            </span>
          </div>
        </div>
        {filteredDoctors.slice(0, doctorsToShow).map((e) => (
          <div className="exparts-item-h" key={e.id}>
            <div className="doctor-item-img">
              <Image
                src={`https://dev.medflick.com/doctor/${e.image}`}
                alt={e.name}
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
              {/* <div className="rating-star">
                <i>
                  <AiTwotoneStar />
                </i>{" "}
                5 (523)
              </div> */}
            </div>
            <div className="doc-experience">
              <div className="years-exper">
                {e.experience_year}+ Years of Experience{" "}
              </div>
              <div className="successful-plus">
                {e.surgery_treatment}+ Successful Surgeries{" "}
              </div>
            </div>
            <div className="day-itembox">
              {/* <div className="day-exper">Mon - Sat </div>
                      <div className="time-exper">8:00 Am - 9:00 AM </div> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: e.opd_time,
                }}
              />
            </div>
            <DoctorHospitalProfile
              slug={e.slug}
              first={e.prefix}
              middle={e.first_name}
              last={e.last_name}
              specialityId={e.speciality_id}
            />
          </div>
        ))}

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
