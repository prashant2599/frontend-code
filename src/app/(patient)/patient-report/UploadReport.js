"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadReport = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

  const [specialityId, setSpecialityId] = useState("");
  useEffect(() => {
    const storedUserName = localStorage.getItem("speciality");
    if (storedUserName) {
      setSpecialityId(storedUserName);
    }
  }, []);

  const [selectedtreatmentId, setSelectedtreatmentId] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("treatment");
    if (storedUserName) {
      setSelectedtreatmentId(storedUserName);
    }
  }, []);

  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userId");
    if (storedUserName) {
      setPatientId(storedUserName);
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const clearFormFields = () => {
    setQuery("");
    setSelectedFile("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      // No file is selected, show an error message and prevent form submission
      // alert("Please upload a medical report before submitting the form.");
      toast.error(
        "Please upload a medical report before submitting the form.",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );

      return;
    }

    // Create the data object to be sent in the API request
    const data = {
      uploadfiles: selectedFile,
      patient_id: patientId,
      speciality_id: specialityId,
      treatment_id: selectedtreatmentId,
      message: query,
    };

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `https://dev.medflick.com/api/uploadreport`;
    setIsLoading(true);

    // Make the API call
    axios
      .post(apiEndpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle the API response here if needed
        console.log(response);
        alert("Questions have been successfully submitted");
        clearFormFields();
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <Link href="/patient-quote">
              <img src="/images/2023/01/back-icon.png" alt="icon" /> Back
            </Link>
            <div className="barbox">
              {" "}
              <img src="/images/2023/01/bar-img1.png" alt="bar-icon" />{" "}
            </div>
          </div>

          <div className="request-quote">
            <h1>Upload medical reports</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="upload-medical">
                <img src="/images/2023/01/upload.png" alt="upload-icon" />
                <p>
                  Drag and drop a document here to upload or browse for a
                  document to upload
                </p>
                {selectedFile && (
                  <div>
                    <p>Selected File:</p>
                    <p>{selectedFile.name}</p>
                  </div>
                )}

                <div className="medical-report-all">
                  <button className="medical-report-file">Select File</button>
                  <input type="file" name="file" onChange={handleFileChange} />
                </div>
              </div>

              <div className="medical-reports">
                <textarea
                  className="magbox"
                  type="textarea"
                  name="query"
                  placeholder="Add your message (Optional)"
                  rows="2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></textarea>
              </div>

              <div className="continue-buttonbox">
                <Link
                  href="/patient-hospital"
                  // state={{
                  //   specialityId: specialityId,
                  //   specialityName: selectedspecialityName,
                  // }}
                >
                  <button className="skip-step"> Skip this step</button>
                </Link>
                <button className="continue1" disabled={isLoading}>
                  {" "}
                  {isLoading ? (
                    <ThreeDots
                      height="27"
                      width="70"
                      radius="9"
                      color="#ff6800"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="section-assistance">
        <div className="midbox-inner wiki-mk">
          <ul>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can&apos;t find what you&apos;re looking for? Let up help</p>
              <a className="get-help"> Get Help</a>
            </li>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can&apos;t find what you&apos;re looking for? Let up help</p>
              <a className="get-help"> Get Help</a>
            </li>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can&apos;t find what you&apos;re looking for? Let up help</p>
              <a className="get-help"> Get Help</a>
            </li>
          </ul>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default UploadReport;
