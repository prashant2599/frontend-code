"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CancelAppointment from "./CancelAppointment";
import { useRouter } from "next/navigation";

const AppointmentDetails = ({ info }) => {
  const router = useRouter();
  const doctorId = info.doctor_id;
  const hospitalId = info.hospital_id;

  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (doctorId) {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/id/${doctorId}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setDoctor(response.data.data.doctor_info);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [doctorId]);

  useEffect(() => {
    if (hospitalId) {
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
    }
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
            <Link href="/patient-appointment-list">
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
              Appointment Request Received! Processing Your Appointment Request
              for Personalized Care
            </h3>
            <p>
              Greetings from Medflick! We have received your appointment
              request. Our team will contact you shortly. We are processing your
              request and look forward to serving you with dedicated medical
              care and expertise. Your patience is greatly appreciated.
            </p>
            {info.fileupload && (
              <div className="appointment-uploaded_report">
                <img src="/images/upload.png" alt="Uploaded Report" />
                <a
                  href={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/reports/${info.uploadfiles}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Your Uploaded Quote
                </a>
              </div>
            )}
          </div>
          <div className="patient-details-box">
            <h3>Patient Details</h3>
            <div className="patient-details">
              <h4>Name</h4> <span>{info.patient_name}</span>
            </div>
            <div className="patient-details">
              <h4>Phone</h4>{" "}
              <span>
                {info.phone_code} {info.patient_phone}
              </span>
            </div>
            <div className="patient-details">
              <h4>Email</h4> <span>{info.patient_email}</span>
            </div>
            {/* <div className="patient-details">
              <h4>Gender</h4> <span>{info.gender}</span>
            </div> */}
          </div>
          <div className="patient-appointment-box" style={{ width: "40%" }}>
            <h3>Appointments Details</h3>
            <div className="hospital-doctors-preview">
              {hospitalId && (
                <div className="hospital-preview-box">
                  <div className="hospital-preview-img">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.image}`}
                      alt={hospital.slug}
                    />
                  </div>

                  <div className="hospital-preview-doc">
                    <Link
                      href={`/hospital/${hospital.slug}/${hospital.country}`}
                    >
                      <h3>{hospital.name}</h3>
                    </Link>
                    <div className="department-sub">{hospital.city}</div>
                    <div className="rating-star">
                      <i className="fa fa-star"></i> 5 (523)
                    </div>
                    <div className="ho-docimg">
                      {hospital.nabl && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.nabl}`}
                          alt={hospital.name}
                        />
                      )}
                      {hospital.nabh && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.nabh}`}
                          alt={hospital.name}
                        />
                      )}
                      {hospital.jci && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.jci}`}
                          alt={hospital.name}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {doctorId && (
                <div className="doctors-preview-box">
                  <div className="doctor-preview-img">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/doctor/${doctor.image}`}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails;
