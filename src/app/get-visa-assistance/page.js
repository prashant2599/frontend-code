import React from "react";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import VisaForm from "./VisaForm";

const page = () => {
  return (
    <>
      <NewHeader />

      <VisaForm />
      <NewFooter />
    </>
  );
};

export default page;
