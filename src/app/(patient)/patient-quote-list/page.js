"use client";
import { useEffect } from "react";
import PatientHeader from "../Inc/PatientHeader";
import DashboardTop from "../patient-dashboard/DashboardTop";
import QuoteList from "./QuoteList";

const page = () => {
  return (
    <>
      <PatientHeader />
      <section id="hometop-section-quote">
        <div className="midbox-inner wiki-mk">
          <DashboardTop />

          <QuoteList />
        </div>
      </section>
    </>
  );
};

export default page;
