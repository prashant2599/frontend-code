"use client";

import React, { createContext, useContext, useState } from "react";

const HospitalDataContext = createContext();

export const HospitalDataProvider = ({ children }) => {
  const [hospitalsData, setHospitalsData] = useState([]);

  return (
    <HospitalDataContext.Provider value={{ hospitalsData, setHospitalsData }}>
      {children}
    </HospitalDataContext.Provider>
  );
};

export const HospitalData = () => {
  return useContext(HospitalDataContext);
};
