"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AppoinmentList = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuoteList, setFilteredQuoteList] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       // Fetch specialities
  //       const specialityData = await getAllSpeciality();
  //       setSpeciality(specialityData.data.Speciality);
  //       setTreatment(specialityData.data.treatmentsforSitemap);
  //     };

  //     fetchData();
  //   }, []);

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

//   const [detailsCache, setDetailsCache] = useState({});

//   const getDoctorDetails = useCallback(
//     async (doctorId) => {
//       if (detailsCache[doctorId]) {
//         return detailsCache[doctorId];
//       }

//       const doctorResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/id/${doctorId}`
//       );
//       const doctorDetails = await doctorResponse.json();

//       const Fname  = doctorDetails.data.doctor_info?.prefix
//       const Mname  = doctorDetails.data.doctor_info?.first_name
//       const Lname  = doctorDetails.data.doctor_info?.last_name

//       const name  = Fname + " " + Mname + " " + Lname

//       const details = `${name}`;
//       setDetailsCache((prevCache) => ({
//         ...prevCache,
//         [doctorId]: details,
//       }));

//       return details;
//     },
//     [detailsCache]
//   );

//   const getHospitalDetails = useCallback(
//     async (hospitalId) => {
//       if (detailsCache[hospitalId]) {
//         return detailsCache[hospitalId];
//       }

//       const hospitalResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital_id/id/${hospitalId}`
//       );
//       const hospitalDetails = await hospitalResponse.json();

//       const details = `${hospitalDetails.data.hospital_info?.name}`;
//       setDetailsCache((prevCache) => ({
//         ...prevCache,
//         [hospitalId]: details,
//       }));

//       return details;
//     },
//     [detailsCache]
//   );

//   useEffect(() => {
//     const updateDetails = async () => {
//       const updatedList = await Promise.all(
//         quoteList.map(async (e) => {
//           let details = "";

//           if (e.doctor_id) {
//             details = await getDoctorDetails(e.doctor_id);
//           }

//           if (e.hospital_id) {
//             details = await getHospitalDetails(e.hospital_id);
//           }

//           return {
//             ...e,
//             details,
//           };
//         })
//       );

//       setQuoteList(updatedList);
//     };

//     updateDetails();
//   }, [quoteList, getDoctorDetails, getHospitalDetails]);
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
            {quoteList.map((e) => {
               const appointmentDate = new Date(e.created_at);
               const formattedDate = `${appointmentDate.getDate()}/${appointmentDate.getMonth() + 1}/${appointmentDate.getFullYear()}`;
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
                      <a
                        className="cancel-appointment1"
                        data-popup-open="popup-3"
                      >
                        Cancel Appointment
                      </a>
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

export default AppoinmentList;
