"use client";
import React, { createContext, useContext, useState } from "react";

const ToggleFormContext = createContext();

export const ToggleFormProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <ToggleFormContext.Provider
      value={{ isPopupOpen, togglePopup, setIsPopupOpen }}
    >
      {children}
    </ToggleFormContext.Provider>
  );
};

export const useToggleForm = () => {
  return useContext(ToggleFormContext);
};
