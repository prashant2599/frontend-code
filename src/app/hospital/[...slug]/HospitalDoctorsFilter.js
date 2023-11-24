"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import { AiTwotoneStar } from "react-icons/ai";

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
    .map((exp) => ({ value: exp, label: exp }))
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

  const [isPopupOpen2, setIsPopupOpen2] = useState(false);

  const togglePopup2 = () => {
    setIsPopupOpen2(!isPopupOpen2);
  };

  const popupStyle2 = {
    display: isPopupOpen2 ? "block" : "none",
  };

  const [name2, setName2] = useState("");
  const [pcode2, setPcode2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email2, setEmail2] = useState("");
  const [query2, setQuery2] = useState("");

  const [isLoading2, setIsLoading2] = useState(false);

  // State variables for error messages
  const [nameError2, setNameError2] = useState("");
  const [phoneError2, setPhoneError2] = useState("");
  const [emailError2, setEmailError2] = useState("");
  const [captchaValue2, setCaptchaValue2] = useState(null);
  const handleCaptchaChange2 = (value) => {
    setCaptchaValue2(value);
  };

  const handleFormSubmit2 = (event) => {
    event.preventDefault();

    setNameError2("");
    setPhoneError2("");
    setEmailError2("");

    // Validation logic
    let isValid = true;

    if (!name2) {
      setNameError2("Name is required");
      isValid = false;
    }
    if (!captchaValue2) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    const phoneRegex = /^\d{10,}$/; // Matches 10 or more digits
    if (!phone2 || !phone2.match(phoneRegex)) {
      setPhoneError2("Phone must have at least 10 digits");
      isValid = false;
    }

    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: name,
        phone_code: pcode2,
        phone: phone2,
        email: email2,
        messages: query2,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/doctor_query`;

      setIsLoading2(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          // Handle the API response here if needed
          console.log(response);
          alert("questions is susscefull submitted");
          clearFormFields2();
          setIsPopupOpen2(false);
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error("Error:", error);
        })
        .finally(() => {
          // Set loading back to false after the API call is complete
          setIsLoading2(false);
        });
    }
  };

  const clearFormFields2 = () => {
    setName2("");
    setPhone2("");
    setEmail2("");
    setQuery2("");
  };

  const Formstyles2 = {
    errorInput: {
      border: "2px solid red",
    },
    errorMessage: {
      color: "red",
      fontSize: "0.85rem",
      marginTop: "0.25rem",
    },
    loadingMessage: {
      fontSize: "1.2rem",
      color: "#333",
      marginTop: "1rem",
    },
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
              isSearchable={true} // Enables search
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
              isSearchable={true} // Enables search
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
              <div className="rating-star">
                <i>
                  <AiTwotoneStar />
                </i>{" "}
                5 (523)
              </div>
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
            <div className="doctor-item-button">
              <span className="book-app" onClick={togglePopup2}>
                Book Appointment{" "}
                <img src="/images/2023/05/book.png" alt="icons" />
              </span>
              <Link href={`/doctor/${e.slug}`} className="view-profile">
                View Profile{" "}
                <img src="/images/2023/05/profile.png" alt="icons" />
              </Link>
            </div>
          </div>
        ))}
        {isPopupOpen2 && (
          <div className="popup" data-popup="popup-1" style={popupStyle2}>
            <div className="popup-inner2">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="popup-close"
                    data-popup-close="popup-1"
                    data-dismiss="modal"
                    onClick={togglePopup2}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <h2> Book Appointment</h2>
                <form onSubmit={handleFormSubmit2}>
                  <div
                    className="treatment-form"
                    style={nameError2 ? Formstyles2.errorInput : {}}
                  >
                    <div className="inputbox">
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder=""
                        name="name"
                        required
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        autoComplete="off"
                        style={nameError2 ? Formstyles2.errorInput : {}}
                      />
                      {nameError2 && (
                        <span style={Formstyles.errorMessage}>
                          {nameError2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="treatment-form">
                    <div className="inputbox">
                      <label>Phone</label>
                      <div className="phone-form">
                        <div className="phone-box1">
                          <select
                            aria-label="Sort dropdown"
                            className="phone-dropdown"
                            value={pcode2}
                            onChange={(e) => setPcode2(e.target.value)}
                          >
                            <option value="">Choose Code</option>
                            <option value="+91">India (+91)</option>
                            <option value="1">UK (+44)</option>
                            <option value="213">Algeria (+213)</option>
                            <option value="376">Andorra (+376)</option>
                            <option value="244">Angola (+244)</option>
                            <option value="1264">Anguilla (+1264)</option>
                            <option value="1268">
                              Antigua &amp; Barbuda (+1268)
                            </option>
                            <option value="54">Argentina (+54)</option>
                            <option value="374">Armenia (+374)</option>
                            <option value="297">Aruba (+297)</option>
                            <option value="61">Australia (+61)</option>
                            <option value="43">Austria (+43)</option>
                            <option value="994">Azerbaijan (+994)</option>
                            <option value="1242">Bahamas (+1242)</option>
                            <option value="973">Bahrain (+973)</option>
                            <option value="880">Bangladesh (+880)</option>
                            <option value="1246">Barbados (+1246)</option>
                            <option value="375">Belarus (+375)</option>
                            <option value="32">Belgium (+32)</option>
                            <option value="501">Belize (+501)</option>
                            <option value="229">Benin (+229)</option>
                            <option value="1441">Bermuda (+1441)</option>
                            <option value="975">Bhutan (+975)</option>
                            <option value="591">Bolivia (+591)</option>
                            <option value="387">
                              Bosnia Herzegovina (+387)
                            </option>
                            <option value="267">Botswana (+267)</option>
                            <option value="55">Brazil (+55)</option>
                            <option value="673">Brunei (+673)</option>
                            <option value="359">Bulgaria (+359)</option>
                            <option value="226">Burkina Faso (+226)</option>
                            <option value="257">Burundi (+257)</option>
                            <option value="855">Cambodia (+855)</option>
                          </select>
                        </div>
                        <div className="phone-box2">
                          <input
                            type="tel"
                            placeholder=""
                            name="name"
                            value={phone2}
                            onChange={(e) => {
                              const phoneNumber = e.target.value.replace(
                                /\D/g,
                                ""
                              ); // Remove non-numeric characters
                              setPhone2(phoneNumber);
                            }}
                            style={phoneError2 ? Formstyles.errorInput : {}}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="treatment-form">
                    <div className="inputbox">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder=""
                        name="name"
                        value={email2}
                        onChange={(e) => setEmail2(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="treatment-form">
                    <div className="inputbox">
                      <label>Your Query</label>
                      <textarea
                        className="querybox"
                        type="textarea"
                        name="query"
                        placeholder=""
                        rows="2"
                        value={query2}
                        onChange={(e) => setQuery2(e.target.value)}
                        autoComplete="off"
                      ></textarea>
                    </div>
                  </div>
                  <ReCAPTCHA
                    sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                    onChange={handleCaptchaChange2}
                  />
                  <button
                    type="submit"
                    name="en"
                    className="home-button"
                    disabled={isLoading2}
                  >
                    {" "}
                    {isLoading2 ? (
                      <ThreeDots
                        height="27"
                        width="80"
                        radius="9"
                        color="#ffffff"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    ) : (
                      "Submit Now"
                    )}
                    <img src="/images/2023/01/arrow-c.png" alt="arrow-Icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
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
