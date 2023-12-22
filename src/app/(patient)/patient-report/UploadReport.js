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
  const [linkValue, setLinkValue] = useState("");
  const [fileInputDisabled, setFileInputDisabled] = useState(false);
  const [linkInputDisabled, setLinkInputDisabled] = useState(false);
  const [query, setQuery] = useState("");
  const [linkValidationMessage, setLinkValidationMessage] = useState("");
  const [fileValidationMessage, setFileValidationMessage] = useState("");

  const isValidFile = (file) => {
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    const maxFileSize = 2 * 1024 * 1024; // 2MB
  
    if (!file) {
      return 'Please select a file.';
    }
  
    if (!allowedTypes.includes(file.type)) {
      return 'Please select a valid file type (PNG, JPG, PDF).';
    }
  
    if (file.size > maxFileSize) {
      return 'File size must be less than or equal to 2MB.';
    }
  
    return '';
  };
  
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    // Validate file type and size
    const validationMessage = isValidFile(file);
    if (validationMessage) {
      setFileValidationMessage(validationMessage);
      event.target.value = null; // Clear the file input
      return;
    } else {
      setFileValidationMessage('');
    }
  
    setSelectedFile(file);
  
    // Update the disabled state based on whether a file is selected
    setLinkInputDisabled(!!file);
  };

  const isValidLink = (link) => {
    // Regular expression for a simple URL validation
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlPattern.test(link);
  };
  
  const handleLinkChange = (event) => {
    setLinkValue(event.target.value);
    if (event.target.value && !isValidLink(event.target.value)) {
      setLinkValidationMessage("Please enter a valid link.");
    } else {
      setLinkValidationMessage("");
    }
    // Update the disabled state based on whether a link is provided
    setFileInputDisabled(!!event.target.value);
  };

  const clearFormFields = () => {
    setQuery("");
    setSelectedFile("");
    setLinkValue("")
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create the data object to be sent in the API request
    // const data = {
    //   uploadfiles: selectedFile,
    //   patient_id: patientId,
    //   speciality_id: specialityId,
    //   treatment_id: selectedtreatmentId,
    //   message: query,
    // };

    // if (selectedFile && !isValidFile(selectedFile)) {
    //   alert(
    //     "Please select a valid file type (PNG, JPG, PDF) and ensure it is less than 2MB."
    //   );
    //   return;
    // }

    if (linkValue && !isValidLink(linkValue)) {
      setLinkValidationMessage("Please enter a valid link.");
      return;
    } else {
      setLinkValidationMessage("");
    }

    if (!selectedFile && !linkValue) {
      // Display an error message or handle the validation in the way you prefer
      alert("Please upload a file or provide a link before submitting.");
      return;
    }
    const data = new FormData();
    if (selectedFile) {
      data.append("uploadfiles", selectedFile);
    } else {
      data.append("uploadfiles", linkValue);
    }
    data.append("patient_id", patientId);
    data.append("speciality_id", specialityId);
    data.append("treatment_id", selectedtreatmentId);
    data.append("message", query);

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

  const fileDisplay = selectedFile ? (
    <div className="file__value" onClick={() => setSelectedFile(null)}>
      <div className="file__value--text" >
        {selectedFile.name}
      </div>
      <div className="file__value--remove" data-id={selectedFile.name}></div>
    </div>
  ) : null;



  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <Link href="/patient-quote">
              <img src="/images/2023/01/back-icon.png" alt="icon" /> Back
            </Link>
            <div className="barbox">
              <div className="barbox-bar">
                <img src="/images/2023/02/3.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="/images/2023/02/1.png" /> Upload Medical Report
              </div>
              <div className="barbox-bar1">
                <img src="/images/2023/02/2.png" /> Get Quotes
              </div>
            </div>
          </div>

          <div className="request-quote">
            <h1>Upload medical reports</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="upload-medical">
                <img src="/images/2023/01/upload.png" alt="upload-icon" />

                <div className="wrap">
                  <div className="file">
                    <div className="file__input" id="file__input">
                      <input
                        className="file__input--file"
                        id="customFile"
                        type="file"
                        multiple="multiple"
                        name="files[]"
                        onChange={handleFileChange}
                        disabled={fileInputDisabled}
                      />
                      <label
                        className="file__input--label"
                        for="customFile"
                        data-text-btn=" "
                      >
                        {" "}
                        Choose files or drag &amp; drop{" "}
                      </label>
                      {fileValidationMessage && (
                        <p style={{ color: "red" }}>{fileValidationMessage}</p>
                      )}
                    </div>
                    {fileDisplay}
                  </div>
                </div>
                <p>
                  File format supported: .png, .jpg, .pdf and the file size
                  should be less than 2Mb
                </p>
                <div className="or-box">OR</div>
                <div className="upload-link-box">
                  <input
                    type="link"
                    placeholder="Enter link to your report..."
                    name="name"
                    required=""
                    value={linkValue}
                    onChange={handleLinkChange}
                    disabled={linkInputDisabled}
                  />
                  {linkValidationMessage && (
                    <p style={{ color: "red" }}>{linkValidationMessage}</p>
                  )}
                </div>
                {/* <div className="medical-report-all">
                  <button className="medical-report-file">Select File</button>
                  <input type="file" name="file" onChange={handleFileChange} />
                </div> */}
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
                {/* <Link
                  href="/patient-hospital"
                  // state={{
                  //   specialityId: specialityId,
                  //   specialityName: selectedspecialityName,
                  // }}
                >
                  <button className="skip-step"> Skip this step</button>
                </Link> */}
                <button className="continue1" disabled={isLoading}>
                  {" "}
                  {isLoading ? (
                    <ThreeDots
                      height="27"
                      width="70"
                      radius="9"
                      color="#fff"
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
