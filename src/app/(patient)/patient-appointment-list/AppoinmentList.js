"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import CancelAppointmentList from "./CancelAppointmentList";

const AppoinmentList = () => {
  const [quoteList, setQuoteList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient_appointment_list/${storedUserId}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const appointments = response.data.appointmentList.appointment_list;

          const filteredAppointments = appointments.filter((appointment) =>
            appointment.patient_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          setQuoteList(filteredAppointments);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [searchQuery]);

  return (
    <>
      <div className="home-appointments-section">
        <div className="appointments-section">
          <h2>Appointments</h2>
          <div className="appointments-find-box">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search the Appointments by Patient Name"
                name="name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" name="en" className="find-button">
              Search
            </button>
          </div>
        </div>

        <div className="appointments-explore">
          <div className="app-headbox">
            <div className="appointment-patient-name">Patient Name </div>
            <div className="appointment-hospital-name">Patient Email </div>
            <div className="appointment-doctor-name">Date</div>
            <div className="action-button-box">Action </div>
          </div>

          <div className="appointment-new-list">
            {quoteList.length === 0 ? (
              <div>
                <p style={{textAlign:"center",paddingTop:"20px",paddingBottom:"20px",color:"#009200"}}>
                No upcoming appointments at the moment. Stay healthy and well!
                </p>
              </div>
            ) : (
              quoteList.map((e) => {
                const appointmentDate = new Date(e.created_at);
                const formattedDate = `${appointmentDate.getDate()}/${
                  appointmentDate.getMonth() + 1
                }/${appointmentDate.getFullYear()}`;
                return (
                  <div className="appointment-new-box" key={e.id}>
                    <div className="appointment-box1">
                      <div className="appointment-new">{e.patient_name}</div>
                      <div className="appointment-title">{e.patient_email}</div>
                      <div className="dr-details">{formattedDate}</div>
                      <div className="action-button">
                        <Link
                          href={`/appointment-details/${e.id}`}
                          className="view-details"
                        >
                          View Details
                        </Link>
                        <CancelAppointmentList id={e.id} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppoinmentList;
