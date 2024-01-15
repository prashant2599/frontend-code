"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import Link from "next/link";
import CancelQuote from "./CancelQuote";

const QuoteList = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuoteList, setFilteredQuoteList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch specialities
      const specialityData = await getAllSpeciality();
      setSpeciality(specialityData.data.Speciality);
      setTreatment(specialityData.data.treatmentsforSitemap);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointment_list/${storedUserId}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const appointments = response.data.appointmentList.appointment_list;

          const filteredAppointments = appointments.filter((appointment) =>
            appointment.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h2>Quotes</h2>
          <div className="appointments-find-box">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search the quote by Patient Name"
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
            <div className="appointment-hospital-name">Speciality Name </div>
            <div className="appointment-doctor-name">Treatment Name </div>
            <div className="action-button-box">Action </div>
          </div>

          <div className="appointment-new-list">
            {quoteList.map((e) => {
              const selectedSpeciality = speciality.find(
                (s) => String(s.id) === String(e.speciality_id)
              );
              const selectedTreatment = treatment.find(
                (t) => String(t.id) === String(e.treatment_id)
              );

              return (
                <div className="appointment-new-box" key={e.id}>
                  <div className="appointment-box1">
                    <div className="appointment-new">{e.name}</div>
                    <div className="appointment-title">
                      {selectedSpeciality
                        ? selectedSpeciality.name
                        : "Unknown Speciality"}
                    </div>
                    <div className="dr-details">
                      {selectedTreatment
                        ? selectedTreatment.name
                        : "Unknown Treatment"}
                    </div>
                    <div className="action-button">
                      <Link
                        href={`/quote-details/${e.id}`}
                        className="view-details"
                      >
                        View Details
                      </Link>
                      <CancelQuote id={e.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteList;
