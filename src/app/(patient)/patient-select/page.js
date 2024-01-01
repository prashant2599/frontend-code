import React from "react";
import PatientHeader from "../Inc/PatientHeader";
import SelectHospitalDoctors from "./SelectHospitalDoctors";

const page = () => {
  return (
    <>
      <PatientHeader />
      <SelectHospitalDoctors />
    </>
  );
};

export default page;
