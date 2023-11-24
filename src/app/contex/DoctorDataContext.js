"use client"

import React, { createContext, useContext, useState } from "react";

const DoctorDataContext = createContext();

export const DoctorDataProvider = ({ children }) => {
  const [doctorsData, setDoctorsData] = useState([]);   

  return (
    <DoctorDataContext.Provider value={{ doctorsData, setDoctorsData }}>
      {children}
    </DoctorDataContext.Provider>
  );
};

export const useDoctorData = () => {
  return useContext(DoctorDataContext);
};
