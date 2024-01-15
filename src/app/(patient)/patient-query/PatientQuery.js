"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import DashboardTop from "../patient-dashboard/DashboardTop";
import Link from "next/link";

const PatientQuery = () => {
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

  return (
    <>
      <section id="hometop-patient-section">
        <div className="midbox-inner wiki-mk">
          <DashboardTop />

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
                  {query.map((e) => (
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
                          <a href="#/">report.pdf</a> ,{" "}
                          <a href="#/">report.pdf</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default PatientQuery;
