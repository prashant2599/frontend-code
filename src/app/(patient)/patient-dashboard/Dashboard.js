"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import DashBoardAssistance from "../DashBoardAssistance";
import DashboardTop from "./DashboardTop";

const Dashboard = () => {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

  // Check if 'userName' exists in localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      setPatientId(storedUserId);
    }
  }, []);

  const [query, setQuery] = useState([]);

  useEffect(() => {
    // Check if patientId exists before making the API call
    if (patientId) {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/questionans/patientid/${patientId}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setQuery(response.data.qaPatient.qaPatient);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [patientId]);

  const queryLatest = query?.slice(0, 4) ?? [];

  return (
    <>
      <section id="hometop-patient-section">
        <div className="midbox-inner wiki-mk">
          <DashboardTop />
          <div className="home-searchbox">
            <div className="searchbox-left">
              {/* <h2>Lorem ipsum dolor</h2> */}
              <ul>
                <li>
                  <Link href="/patient-quote-list">
                    <img src="/images/2023/01/1.png" alt="icon-img" />
                    <h3>View Quote</h3>
                    <p>Know the best price for you</p>
                  </Link>
                </li>
                <li>
                  <Link href="/patient-quote">
                    <img src="/images/2023/01/2.png" alt="icon-img" />
                    <h3>Request Quote</h3>

                    <p>Receive cost estimate at earliest</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us">
                    <img src="/images/2023/01/3.png" alt="icon-img" />
                    <h3>Need Help?</h3>
                    <p>We are here to help you</p>
                  </Link>
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
              {/* <Link href="/patient-query" className="view-history">
                {" "}
                View History
              </Link> */}
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

      <DashBoardAssistance />
    </>
  );
};

export default Dashboard;
