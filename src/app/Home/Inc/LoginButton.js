"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeaderSearch from "./HeaderSearch";
import { useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";
import HeaderPopup from "../QaForm/HeaderPopup";

const LoginButton = () => {
  const router = useRouter();
  //  for login user

  const [userNames, setUserNames] = useState("");
  const { userName, setUserName } = useUser();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserNames(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // Remove 'userName' from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");

    // Clear the user name in the component state
    setUserNames("");
    setUserName("");
    window.location.reload();
  };
  const [isActive, setIsActive] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="navbar__buttons">
        {/* {userName ? (
          <>
            <Link href="/patient-dashboard" className="navbar__buttons-login">
              {userName}
            </Link>
            <span onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <Link className="navbar__buttons-login" href="/login">
            Log In
          </Link>
        )} */}

        {userName || userNames ? (
          <div className="action">
            <div className="profile" onClick={toggleMenu}>
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/userIcon.png`}
                style={{ width: "46px", marginTop: "10px", cursor: "pointer" }}
              />
            </div>
            <div className={`menu ${isActive ? "active" : ""}`}>
              <ul>
                <li>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/dashboard.png`}
                    alt="dashboad-icon"
                  />
                  <Link
                    href="/patient-dashboard"
                    onClick={() => {
                      toggleMenu(); // Close the offcanvas
                      router.push("/patient-dashboard"); // Navigate to the link
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/profile.png`}
                    alt="profile-icon"
                  />
                  <Link
                    href="/patient-account"
                    onClick={() => {
                      toggleMenu(); // Close the offcanvas
                      router.push("/patient-account"); // Navigate to the link
                    }}
                  >
                    View profile
                  </Link>
                </li>
                <li>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/logout.png`}
                    alt="logout-icon"
                  />

                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link className="navbar__buttons-login" href="/login">
            Log In
          </Link>
        )}

        <HeaderSearch />
        <HeaderPopup />
      </div>
    </>
  );
};

export default LoginButton;
