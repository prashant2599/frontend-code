import React from "react";

const CustomTwitter = () => {
  return (
    <>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/twitter.png`}
        alt="Twitter Logo"
        style={{ width: 50, borderRadius: "50%" }}
      />
    </>
  );
};

export default CustomTwitter;
