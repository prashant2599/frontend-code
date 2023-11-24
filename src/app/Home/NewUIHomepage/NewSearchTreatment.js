"use client";

import React from "react";
import HomeFilterDandH from "./FilterCountryHome/HomeFilterDandH";
import { useDoctorData } from "@/app/contex/DoctorDataContext";
import { HospitalData } from "@/app/contex/HospitalDataContext";

const NewSearchTreatment = () => {
  const { doctorsData } = useDoctorData();
  const {hospitalsData} = HospitalData()
  const Doctors = doctorsData?.slice(0, 4) ?? [];
  const Hospitals = hospitalsData?.slice(0, 4) ?? [];

  return (
    <>
      <section id="hometop-find-treatments">
        <div class="midbox-inner wiki-mk">
          <h2>
            Find Best Hospittals, Doctors and Treatments{" "}
            <span>Around the World</span>
          </h2>

          <HomeFilterDandH />

          <div class="new-beginnings">
            <div class="new-beginnings-left">
              <h3>Lorem Ipsum Doctors in India</h3>
            </div>
            <div class="new-beginnings-right">
              <a class="view-all" href="#">
                View All <img src="/new-images/2023/01/treatments-arrow.png" />
              </a>
            </div>
          </div>

          <div class="home-doctors">
            {Doctors.map((e) => (
              <div class="item" key={e.id}>
                <div class="item-home-expert">
                  <img src={`https://dev.medflick.com/doctor/${e.image}`} />
                </div>
                <div class="home-expert-text">
                  <h3>
                    {e.prefix} {e.first_name} {e.last_name}
                  </h3>
                  <p>Senior Neurosurgeon</p>
                </div>
                <div class="expert-button">
                  <a class="view-profile" href="#">
                    View Profile
                  </a>
                  <a class="book-appointment" href="#">
                    Book Appointment
                  </a>
                </div>
              </div>
            ))}

            {/* <div class="item">
              <div class="item-home-expert">
                <img src="/new-images/2023/01/02/2.jpg" />
              </div>
              <div class="home-expert-text">
                <h3>Dr. Sachin Shah</h3>
                <p>Senior Neurosurgeon</p>
              </div>
              <div class="expert-button">
                <a class="view-profile" href="#">
                  View Profile
                </a>
                <a class="book-appointment" href="#">
                  Book Appointment
                </a>
              </div>
            </div>

            <div class="item">
              <div class="item-home-expert">
                <img src="/new-images/2023/01/02/3.jpg" />
              </div>
              <div class="home-expert-text">
                <h3>Dr. Santosh Joshi</h3>
                <p>Senior Neurosurgeon</p>
              </div>
              <div class="expert-button">
                <a class="view-profile" href="#">
                  View Profile
                </a>
                <a class="book-appointment" href="#">
                  Book Appointment
                </a>
              </div>
            </div>

            <div class="item">
              <div class="item-home-expert">
                <img src="/new-images/2023/01/02/4.jpg" />
              </div>
              <div class="home-expert-text">
                <h3>Dr. Shreya Dasgupta</h3>
                <p>Senior Neurosurgeon</p>
              </div>
              <div class="expert-button">
                <a class="view-profile" href="#">
                  View Profile
                </a>
                <a class="book-appointment" href="#">
                  Book Appointment
                </a>
              </div>
            </div> */}
          </div>

          <div class="new-beginnings">
            <div class="new-beginnings-left">
              <h3>Lorem Ipsum Hospitals in India</h3>
            </div>
            <div class="new-beginnings-right">
              <a class="view-all" href="#">
                View All <img src="/new-images/2023/01/treatments-arrow.png" />
              </a>
            </div>
          </div>

          <div class="home-hospitals">
            {Hospitals.map((e)=>(
            <div class="item" key={e.id}>
              <div class="item-home-expert">
                <img src={`https://dev.medflick.com/hospital/${e.image}`} />
              </div>
              <div class="home-expert-text">
                <h3>{e.name}</h3>
                <p>Hospitals in India</p>
              </div>
              <div class="expert-button">
                <a class="view-profile" href="#">
                  View Profile
                </a>
                <a class="book-appointment" href="#">
                  Book Appointment
                </a>
              </div>
            </div>
            ))}

           
          </div>
        </div>
      </section>
    </>
  );
};

export default NewSearchTreatment;
