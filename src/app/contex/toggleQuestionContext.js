"use client";
import React, { createContext, useContext, useState } from "react";

const ToggleQuestionContext = createContext();

export const ToggleQuestionProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <ToggleQuestionContext.Provider
      value={{ isPopupOpen, togglePopup, setIsPopupOpen }}
    >
      {children}
    </ToggleQuestionContext.Provider>
  );
};

export const useToggleQuestion = () => {
  return useContext(ToggleQuestionContext);
};
