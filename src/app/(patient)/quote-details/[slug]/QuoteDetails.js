"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CancelAppointment from "./CancelAppointment";

const QuoteDetails = ({ info }) => {
  const doctorId = info.doctor_id;
  const hospitalId = info.hospital_id;

  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    // Check if patientId exists before making the API call

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/id/${doctorId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setDoctor(response.data.data.doctor_info);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [doctorId]);

  useEffect(() => {
    // Check if patientId exists before making the API call

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital_id/id/${hospitalId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setHospital(response.data.data.hospital_info);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [hospitalId]);

  const createdAt = new Date(info.created_at);
  const formattedDate = createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <>
      <div className="home-appointments-section">
        <div className="appointments-section">
          <div className="go-back">
            <Link href="/patient-quote-list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="13"
                viewBox="0 0 7 13"
                fill="none"
              >
                <path d="M6.5 1L1 6.5L6.5 12" stroke="black"></path>
              </svg>
              Go Back
            </Link>
          </div>
        </div>
        <div className="appointments-details-section">
          <div className="cancel-appointment-box">
            <div className="appointment-date-box">{formattedDate}</div>
            <CancelAppointment id={info.id} />
          </div>
          <div className="appointments-details-text">
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </h3>
            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatu Nemo enim ipsam voluptatem
              quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur ma Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo con Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatu Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur ma Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo con
            </p>
            <div className="appointment-uploaded_report">
              <img src="/images/upload.png" alt="Uploaded Report" />
              {info.uploadfiles ? (
                <a
                  href={`https://dev.medflick.com/reports/${info.uploadfiles}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Your Uploaded Quote
                </a>
              ) : (
                <a
                  href={`${info.media_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Your Uploaded Link
                </a>
              )}
            </div>
          </div>
          <div className="patient-details-box">
            <h3>Quote Details</h3>
            <div className="patient-details">
              <h4>Name</h4> <span>{info.name}</span>
            </div>
            <div className="patient-details">
              <h4>Phone</h4>{" "}
              <span>
                {info.phone_code} {info.phone}
              </span>
            </div>
            <div className="patient-details">
              <h4>Email</h4> <span>{info.email}</span>
            </div>
            <div className="patient-details">
              <h4>Gender</h4> <span>{info.gender}</span>
            </div>
          </div>
          <div className="patient-appointment-box">
            <h3>Quote Details</h3>
            <div className="hospital-doctors-preview">
              <div className="hospital-preview-box">
                <div className="hospital-preview-img">
                  <img
                    src={`https://dev.medflick.com/hospital/${hospital.image}`}
                    alt={hospital.slug}
                  />
                </div>

                <div className="hospital-preview-doc">
                  <Link href={`/hospital/${hospital.slug}/${hospital.country}`}>
                    <h3>{hospital.name}</h3>
                  </Link>
                  <div className="department-sub">{hospital.city}</div>
                  <div className="rating-star">
                    <i className="fa fa-star"></i> 5 (523)
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
                </div>
              </div>

              <div className="doctors-preview-box">
                <div className="doctor-preview-img">
                  <img
                    src={`https://dev.medflick.com/doctor/${doctor.image}`}
                    alt={doctor.slug}
                  />
                </div>
                <div className="doctor-preview-doc">
                  <Link href={`/doctor/${doctor.slug}`}>
                    <h3>
                      {" "}
                      {doctor.prefix} {doctor.first_name} {doctor.last_name}
                    </h3>
                  </Link>
                  <div className="department-sub">{doctor.designation}</div>
                  {/* <div className="rating-star">
                    <i className="fa fa-star"></i> 5 (523)
                  </div> */}
                  <div className="doc-experience">
                    {doctor.experience_year && (
                      <div className="years-exper">
                        {doctor.experience_year}+ Years Experience
                      </div>
                    )}
                    {doctor.surgery_treatment && (
                      <div className="successful-plus">
                        {doctor.surgery_treatment}+ Successful Surgeries
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteDetails;