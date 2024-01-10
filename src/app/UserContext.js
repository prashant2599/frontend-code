"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchUserDataById = async (userId) => {
    if (userId) {
      try {
        const response = await axios.get(
          `https://dev.medflick.com/api/patient/id/${userId}`
        );
        const data = response.data.data.patient_data;

        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    const patientId = localStorage.getItem("userId");
    fetchUserDataById(patientId || userId);
  }, [userId]);

  return (
    <UserContext.Provider
      value={{ userName, setUserName, userData, setUserId, userId }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
