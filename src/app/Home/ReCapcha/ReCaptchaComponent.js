import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onCaptchaChange }) => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    onCaptchaChange(value);
  };

  return (
    <ReCAPTCHA
      sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo"
      onChange={handleCaptchaChange}
    />
  );
};

export default ReCaptchaComponent;
