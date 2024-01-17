import React from "react";
import PatientHeader from "../../Inc/PatientHeader";
import DashboardTop from "../../patient-dashboard/DashboardTop";
import QuoteDetails from "./QuoteDetails";

const page = async ({ params }) => {
  const combinedSlug = params.slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointment_details/${combinedSlug}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const info = data.appointment.appointment;

  return (
    <>
      <PatientHeader />
      <section id="hometop-section-quote">
        <div className="midbox-inner wiki-mk">
          <DashboardTop />

          <QuoteDetails info={info} />
        </div>
      </section>
    </>
  );
};

export default page;
