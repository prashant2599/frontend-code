"use client";
import React, { useState } from "react";

const HomeForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAgeChange = (e) => {
    // Get the input value from the event
    const inputValue = e.target.value;

    // If the input value is empty or is a number with up to 3 digits, update the state
    if (inputValue === "" || /^\d{0,2}$/.test(inputValue)) {
      setAge(inputValue);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create the data object to be sent in the API request
    const data = {
      name: name,
      age: age,
      gender: gender,
      askq: query,
    };

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `https://dev.medflick.com/api/askPost`;

    setIsLoading(true);

    // Make the API call
    axios
      .post(apiEndpoint, data)
      .then((response) => {
        // Handle the API response here if needed
        console.log(response);
        alert("questions is susscefull submitted");
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error("Error:", error);
      })
      .finally(() => {
        // Set loading back to false after the API call is complete
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="questions-form">
        <div className="homeform-left">
          <form onSubmit={handleFormSubmit}>
            <div className="home-form">
              <div className="inputbox">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="home-form">
              <div className="inputbox1">
                <label>Age</label>
                <input
                  type="text"
                  placeholder=""
                  name="age"
                  value={age}
                  onChange={handleAgeChange}
                  required
                />
              </div>

              <div className="inputbox1">
                <label>Gender</label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="home-form">
              <div className="homequery">
                <label>Your Query</label>
                <textarea
                  className="magbox"
                  type="textarea"
                  name="query"
                  placeholder=""
                  rows="2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="home-form">
              <button type="submit" name="en" className="home-button">
                {isLoading ? "Submitting..." : "Submit Now"}{" "}
                <img src="/images/2023/01/arrow-c.png" alt="icon" />
              </button>
            </div>
          </form>
        </div>
        <div className="homeform-right">
          <img src="/images/2023/01/home-q.jpg" alt="form-img" />

          <div className="home-drbox">
            <h4>We value your Privacy</h4>

            <ul>
              <li>
                <img src="/images/2023/compliance helpline.png" alt="icon1" />
                <h5>Confidentiality</h5>
              </li>
              <li>
                <img src="/images/2023/confidentiality.png" alt="icon2" />
                <h5>Transparent Policies</h5>
              </li>
              <li>
                <img src="/images/2023/transparent policie.png" alt="icon3" />
                <h5>Compliance Helpline</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeForm;
