import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onCaptchaChange }) => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    onCaptchaChange(value);
  };
  const divStyle = {
    MozTransform: "scale(0.77)",
    msTransform: "scale(0.77)",
    OTransform: "scale(0.77)",
    MozTransformOrigin: "0",
    msTransformOrigin: "0",
    OTransformOrigin: "0",
    WebkitTransform: "scale(0.77)",
    transform: "scale(0.77)",
    WebkitTransformOrigin: "0 0",
    transformOrigin: "0",
    filter:
      "progid:DXImageTransform.Microsoft.Matrix(M11=0.77,M12=0,M21=0,M22=0.77,SizingMethod='auto expand')",
  };

  return (
    <ReCAPTCHA
      sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo"
      onChange={handleCaptchaChange}
      style={divStyle}
    />
  );
};

export default ReCaptchaComponent;
