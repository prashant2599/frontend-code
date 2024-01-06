"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import { useRouter } from "next/navigation";

const AccountDetails = () => {
  const router = useRouter();
  const [activeContent, setActiveContent] = useState("packages1");

  const handleContentClick = (contentNumber) => {
    setActiveContent(contentNumber);
  };

  const [patientId, setPatientId] = useState("");
  const [user, setUser] = useState([]);
  const [uname, setUname] = useState("");
  const [uphone, setUphone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

  // Check if 'userName' exists in localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setPatientId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      const apiUrl = `https://dev.medflick.com/api/patient/id/${patientId}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setUser(response.data.data.patient_data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [patientId]);

  const [readonly, setReadonly] = useState(true);

  const toggleReadonly = () => {
    setReadonly(!readonly);
  };

  const handleSave = () => {
    const name = user.name;
    const phone = user.phone;
    const data = {
      role: "patient",
      patient_id: patientId,
      name: uname ? uname : name,
      phone: uphone ? uphone : phone,
    };
    // Make a POST request to update the user's data
    axios
      .post("https://dev.medflick.com/api/patient_update", data)
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("User data updated:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error updating user data:", error);
      });

    // Toggle back to readonly mode after saving
    setReadonly(true);
  };

  const handleLogout = () => {
    // Remove 'userName' from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");

    // Clear the user name in the component state

    window.location.reload();
  };

  return (
    <>
      <section id="your-account">
        <div className="midbox-inner  wiki-mk">
          <h1>Your Account</h1>

          <div className="your-accountbox">
            <div className="your-accountbox-left">
              <div className="account">
                <button
                  className={`conditions ${
                    activeContent === "packages1" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages1")}
                  id="defaultOpen"
                >
                  {" "}
                  Profile{" "}
                </button>
                <button
                  className={`conditions ${
                    activeContent === "packages2" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages2")}
                >
                  {" "}
                  Password
                </button>
                <button
                  className={`conditions ${
                    activeContent === "packages3" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages3")}
                >
                  {" "}
                  Account Security{" "}
                </button>
                <button
                  className={`conditions ${
                    activeContent === "packages4" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages4")}
                >
                  {" "}
                  Notifications
                </button>
                <button
                  className={`conditions ${
                    activeContent === "packages5" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages5")}
                >
                  {" "}
                  Billing Info
                </button>
                <button
                  className={`conditions ${
                    activeContent === "packages6" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages6")}
                >
                  {" "}
                  Cancel Appointment
                </button>
                <button
                  className={`conditions ${
                    activeContent === "packages7" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages7")}
                >
                  {" "}
                  Last Login
                </button>
                <button
                  className={`conditions ${
                    activeContent === "packages8" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages8")}
                >
                  {" "}
                  Delete Account
                </button>
              </div>
            </div>

            <div className="your-accountbox-right">
              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages1" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages1")}
                  id="defaultOpen"
                >
                  {" "}
                  Profile{" "}
                </button>
              </div>
              <div
                id="packages1"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages1" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Profile</h2>
                  <a
                    id="savebutton"
                    onClick={readonly ? toggleReadonly : handleSave}
                  >
                    {" "}
                    {readonly ? "Edit" : "Save"}
                  </a>
                </div>

                <div className="profile-details">
                  <div className="profile-img">
                    <img src="/images/2023/01/frame.png" alt="frame-icon" />
                  </div>
                  <div className="details-box">
                    <div className="profile-dd">
                      <img src="/images/2023/01/vector-1.png" alt="icon" />
                      <div className="inputs">
                        {readonly ? (
                          <span>
                            {loading ? (
                              <span className="skeleton">Loading...</span>
                            ) : user ? (
                              user.name
                            ) : null}
                          </span>
                        ) : (
                          <input
                            type="text"
                            readOnly={readonly}
                            onChange={(e) => setUname(e.target.value)}
                            value={uname}
                            placeholder={user.name}
                          />
                        )}
                      </div>
                    </div>
                    <div className="profile-dd">
                      <img src="/images/2023/01/vector-2.png" alt="icon" />{" "}
                      {loading ? (
                        <span className="skeleton">Loading...</span> // Skeleton loading for email content
                      ) : (
                        <span>{user && user.email}</span>
                      )}{" "}
                      <MdVerified color="blue" />
                    </div>
                    <div className="profile-dd">
                      <img src="/images/2023/01/vector-3.png" alt="icon" />
                      <div className="inputs">
                        {readonly ? (
                          <span>
                            {loading ? (
                              <span className="skeleton">Loading...</span>
                            ) : user && user.phone ? (
                              user && user.phone
                            ) : (
                              "null"
                            )}
                          </span>
                        ) : (
                          <input
                            type="phone"
                            readOnly={readonly}
                            value={uphone}
                            onChange={(e) => {
                              const phoneNumber = e.target.value.replace(
                                /\D/g,
                                ""
                              ); // Remove non-numeric characters
                              setUphone(phoneNumber);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                      Log Out
                    </a>
                  </div>
                </div>
              </div>

              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages2" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages2")}
                >
                  {" "}
                  Password
                </button>
              </div>
              <div
                id="packages2"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages2" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Profile</h2>
                  <a href="#/">Edit</a>
                </div>

                <ChangePassword />
              </div>

              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages3" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages3")}
                >
                  {" "}
                  Account Security{" "}
                </button>
              </div>
              <div
                id="packages3"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages3" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Account Security</h2>
                </div>

                <div className="authentication">
                  <h3>Two-factor authentication</h3>
                  <p>
                    To keep your account secure, set up two-factor
                    authentication. Enter your phone number to receive the
                    security code and activate two-factor authentication.
                  </p>
                  <a href="#/">Activate</a>
                </div>
              </div>

              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages4" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages4")}
                >
                  {" "}
                  Notifications
                </button>
              </div>
              <div
                id="packages4"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages4" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Notifications</h2>
                </div>

                <table cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Follow-ups</strong>
                      </td>
                      <td>
                        <strong>Email</strong>
                      </td>
                      <td>
                        <strong>SMS</strong>
                      </td>
                      <td>
                        <strong>Push Notifications</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Task Updates</td>
                      <td>
                        <label className="container">
                          <input type="checkbox" checked="checked" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>
                        <label className="container">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>
                        <label className="container">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Promotional Emails and
                        <br /> Notifications
                      </td>
                      <td>
                        <label className="container">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>
                        <label className="container">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>
                        <label className="container">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="changes-button">
                  <a href="#/" className="cancel">
                    Cancel
                  </a>
                  <a href="#/" className="save-changes">
                    Save Changes
                  </a>
                </div>
              </div>

              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages5" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages5")}
                >
                  {" "}
                  Billing Info
                </button>
              </div>
              <div
                id="packages5"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages5" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Edit Billing Info</h2>
                </div>

                <div className="cardnumber-box">
                  <input
                    type="text"
                    placeholder="Card Number"
                    name="name"
                    required=""
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="m-box"
                    name="name"
                    required=""
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="m-box"
                    name="name"
                    required=""
                  />
                </div>

                <div className="changes-button">
                  <a href="#/" className="cancel">
                    Cancel
                  </a>
                  <a href="#/" className="save-changes">
                    Save Changes
                  </a>
                </div>

                <p>Payment method will update for all the appointments </p>
              </div>

              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages6" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages6")}
                >
                  {" "}
                  Cancel Appointment
                </button>
              </div>
              <div
                id="packages6"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages6" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Cancel Appointment</h2>
                </div>

                <div className="cancel-appointment">
                  <p>
                    To cancel an appointment, go to your appointments and select
                    the circle with three dots in the upper right corner of the
                    appointmnt card. This will reveal the &apos;Cancel
                    Appointment&apos; button. Select &apos;Cancel
                    Appointment&apos; to cancel that appointment.
                  </p>
                  <a href="#/">Go to My Appointments</a>
                </div>
              </div>

              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages7" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages7")}
                >
                  {" "}
                  Last Login
                </button>
              </div>
              <div
                id="packages7"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages7" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Last Login</h2>
                </div>

                <ul>
                  <li>
                    <img src="image/2023/01/loc.png" alt="" />
                    <div className="login-name"> Mysore, Karnataka </div>
                    <div className="login-active">
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        20 hrs Ago
                      </div>
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        Samsung ST123N{" "}
                      </div>
                    </div>
                  </li>

                  <li>
                    <img src="images/2023/01/loc.png" alt="" />
                    <div className="login-name"> Mysore, Karnataka </div>
                    <div className="login-active">
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        20 hrs Ago
                      </div>
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        Samsung ST123N{" "}
                      </div>
                    </div>
                  </li>

                  <li>
                    <img src="images/2023/01/loc.png" alt="" />
                    <div className="login-name"> Mysore, Karnataka </div>
                    <div className="login-active">
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        20 hrs Ago
                      </div>
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        Samsung ST123N{" "}
                      </div>
                    </div>
                  </li>

                  <li>
                    <img src="images/2023/01/loc.png" alt="" />
                    <div className="login-name"> Mysore, Karnataka </div>
                    <div className="login-active">
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        20 hrs Ago
                      </div>
                      <div className="default-device">
                        <img src="/images/2023/01/g-dotted.png" alt="icons" />
                        Samsung ST123N{" "}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="account1">
                <button
                  className={`conditions ${
                    activeContent === "packages8" ? "active" : ""
                  }`}
                  onClick={() => handleContentClick("packages8")}
                >
                  {" "}
                  Delete Account
                </button>
              </div>
              <div
                id="packages8"
                className="conditionsbox"
                style={{
                  display: activeContent === "packages8" ? "block" : "none",
                }}
              >
                <div className="edit-profile">
                  <h2>Delete Account</h2>
                </div>

                <div className="cancel-appointment">
                  <p>
                    Once you&apos;ve deleted your account, you will no longer be
                    able to log in to the Medflick site or apps. This action
                    cannot be undone.
                  </p>
                  <a href="#/">Delete Account</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pay-section">
        <div className="midbox-inner  wiki-mk">
          <div className="pay-box">
            <div className="medflick-payleft">
              <h2>Need Assistance?</h2>
              <p>Can’t find what you’re looking for? Let up help</p>
            </div>
            <div className="medflick-payright">
              <a href="#/" className="consultation">
                {" "}
                Lorem ipsum dolor sit amet{" "}
                <img src="images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountDetails;
