import DashboardTop from "../patient-dashboard/DashboardTop";
import PatientHeader from "../Inc/PatientHeader";
import AppoinmentList from "./AppoinmentList";

const page = () => {
  return (
    <>
      <PatientHeader />
      <section id="hometop-section-quote">
        <div className="midbox-inner wiki-mk">
          <DashboardTop />
          <AppoinmentList />
        </div>
      </section>
    </>
  );
};

export default page;
