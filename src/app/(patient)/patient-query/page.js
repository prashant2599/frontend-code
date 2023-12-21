"use client"
import PatientHeader from "../Inc/PatientHeader";
import PatientQuery from "./PatientQuery";

const page = () => {
  return (
    <div>
      <PatientHeader />
      <PatientQuery />
    </div>
  );
};

export default page;
