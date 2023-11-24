"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

  // Check if 'userName' exists in localStorage on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");

    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedUserId) {
      setPatientId(storedUserId);
    }
  }, []);

  const [query, setQuery] = useState([]);

  useEffect(() => {
    const apiUrl = `https://dev.medflick.com/api/dashboard/questionans/patientid/${patientId}`;
    console.log(apiUrl);
    axios
      .get(apiUrl)
      .then((response) => {
        setQuery(response.data.qaPatient.qaPatient);
        // console.log("manisjh", response.data.qaPatient.qaPatient);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [patientId]);

  const queryLatest = query?.slice(0, 4) ?? [];

  return (
    <>
      {/* <PHeader /> */}
      <section id="hometop-section">
        <div className="midbox-inner wiki-mk">
          <div className="home-topbox">
            <div className="topbox-left">
              <h1>Hi {userName}</h1>
              <h2>lorem ipsum dolor sit amet quies</h2>
            </div>

            <div className="topbox-right">
              <div className="find-box">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search for doctor, hospital or treatments"
                    name="name"
                    required=""
                  />
                </div>
                <div className="city-box">
                  <input
                    type="text"
                    placeholder="City"
                    name="name"
                    required=""
                  />
                </div>
                <button type="submit" name="en" className="find-button">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="home-searchbox">
            <div className="searchbox-left">
              <h2>Lorem ipsum dolor</h2>
              <ul>
                <li>
                  <img src="/images/2023/01/1.png" alt="icon-img" />
                  <Link href="/patient-quote">
                    <h3>Request Quote</h3>
                  </Link>
                  <p>Lorem ipsum dolor sit amer is dumm</p>
                </li>
                <li>
                  <img src="/images/2023/01/2.png" alt="icon-img" />
                  <h3>Search Treatments</h3>
                  <p>Lorem ipsum dolor sit amer is dumm</p>
                </li>
                <li>
                  <img src="/images/2023/01/3.png" alt="icon-img" />
                  <h3>Need Help?</h3>
                  <p>Lorem ipsum dolor sit amer is dumm</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="section-queries">
        <div className="midbox-inner  wiki-mk">
          <div className="active-queries">
            <div className="history-box">
              <h2>Active Queries</h2>
              <Link href="/patient-query" className="view-history">
                {" "}
                View History
              </Link>
            </div>
            <ul>
              {queryLatest.map((e) => (
                <li key={e.id}>
                  <h4>{e.short_description}</h4>
                  <p>{e.long_description}</p>
                  <div className="queries-button">
                    <div className="hospital-doctor">
                      <img src="/images/2023/01/icon1.png" alt="icon" />{" "}
                      <a href="#/">Hospital Name</a> /{" "}
                      <a href="#/">Doctor Name</a>
                    </div>
                    <div className="queries-pdf">
                      <img src="/images/2023/01/icon2.png" alt="icon" />{" "}
                      <a href="#/">report.pdf</a> , <a href="#/">report.pdf</a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="pay-section">
        <div className="midbox-inner  wiki-mk">
          <div className="pay-box">
            <div className="medflick-payleft">
              <h2>Need Assistance?</h2>
              <p>Can’t find what you’re looking for? Let up help</p>
            </div>
            <div className="medflick-payright">
              <a href="#/" className="consultation">
                {" "}
                Lorem ipsum dolor sit amet{" "}
                <img src="/images/2023/01/arrow-c.png" alt="arrow-icons" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
