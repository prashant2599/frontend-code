import React from "react";

const CustomSpinner = ({ home }) => {
  return (
    <>
      <div className={`spinner${home === "yes" ? "-home" : ""}`}></div>
    </>
  );
};

export default CustomSpinner;
